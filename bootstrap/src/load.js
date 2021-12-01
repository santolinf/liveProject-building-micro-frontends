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
function loadNode(node, parent, document) {
  if ('SCRIPT' === node.tagName) {
    const clonedNode = document.createElement(node.tagName);

    [...node.attributes].forEach(
      attribute => clonedNode.setAttribute(attribute.name, attribute.value)
    );
    clonedNode.innerHTML = node.innerHTML;

    parent.appendChild(clonedNode);
    return;
  }

  const adoptedNode = document.adoptNode(node);
  parent.appendChild(adoptedNode);
}

function addBaseTag(microFrontendName) {
  const baseElement = document.createElement('base');
  baseElement.setAttribute('href', `/mfe/${microFrontendName}/`);
  document.head.appendChild(baseElement);
}

function loadNodes(nodes, parent, document) {
  nodes.forEach(node => loadNode(node, parent, document));
}

function loadMicroFrontendToCurrentDocument(microFrontendName, microFrontend) {
  addBaseTag(microFrontendName);
  loadNodes(microFrontend.querySelectorAll('head > *'), document.head, document);
  loadNodes(microFrontend.querySelectorAll('body > *'), document.body, document);
}

export default loadMicroFrontendToCurrentDocument;
