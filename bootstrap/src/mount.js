import events, { dispatchEvent } from './event';

/**
 * Migrating nodes from one document to another can be achieved using the
 * <code>Document.adoptNode()</code> method.
 * For our purposes, this works for almost all the types of nodes except
 * for the <script> nodes. The <script> nodes are evaluated immediately
 * after they’re added the first time to a document, and an internal flag
 * is added to that element to remember that. When the <script> nodes are
 * adopted by a different document, that flag’s value persists so the browser
 * doesn’t reevaluate it. The only way around the problem is to copy the
 * content of the <script> into a brand-new element.
 */
const mfeNodeClassName = 'MFE';
const mfeNodeClassSelector = '.' + mfeNodeClassName;

function loadNode(node, parent, document) {
  if ('SCRIPT' === node.tagName) {
    const clonedNode = document.createElement(node.tagName);

    [...node.attributes].forEach(
      attribute => clonedNode.setAttribute(attribute.name, attribute.value)
    );
    clonedNode.innerHTML = node.innerHTML;
    markNode(clonedNode);

    parent.appendChild(clonedNode);
    return;
  }

  const adoptedNode = document.adoptNode(node);
  markNode(adoptedNode);

  parent.appendChild(adoptedNode);
}

function markNode(node) {
  node.classList.add(mfeNodeClassName);
}

function addBaseTag(microFrontendName) {
  const baseElement = document.createElement('base');
  baseElement.setAttribute('href', `/mfe/${microFrontendName}/`);
  document.head.appendChild(baseElement);
}

function loadNodes(nodes, parent, document) {
  nodes.forEach(node => loadNode(node, parent, document));
}

function mountMicroFrontendToCurrentDocument(microFrontendName, microFrontend) {
  dispatchEvent(events.MICRO_FRONTEND_WILL_MOUNT, microFrontendName);

  addBaseTag(microFrontendName);
  loadNodes(microFrontend.querySelectorAll('head > *'), document.head, document);
  loadNodes(microFrontend.querySelectorAll('body > *'), document.body, document);

  dispatchEvent(events.MICRO_FRONTEND_DID_MOUNT, microFrontendName);
}

function unmountMicroFrontendFromDocument(currentMicroFrontendName) {
  dispatchEvent(events.MICRO_FRONTEND_WILL_UNMOUNT, currentMicroFrontendName);

  // include header's base element with other marked elements
  document.querySelectorAll(mfeNodeClassSelector + ', base').forEach(node => {
    if (node.parentElement) {
      node.parentElement.removeChild(node);
    }
  });

  dispatchEvent(events.MICRO_FRONTEND_DID_UNMOUNT, currentMicroFrontendName);
}

export {
  mountMicroFrontendToCurrentDocument,
  unmountMicroFrontendFromDocument
};
