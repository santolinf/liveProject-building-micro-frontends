import { mountMicroFrontendToCurrentDocument, unmountMicroFrontendFromDocument } from './mount';
import mapPathnameToMicroFrontendName from './config';
import download from './download';

const navigationHistory = []; // keep track of mfe mounted

function loadMicroFrontend(microFrontendName) {
  download(microFrontendName)
    .then(microFrontend => mountMicroFrontendToCurrentDocument(microFrontendName, microFrontend))
    .catch(error => new Error('Cannot mount Micro Frontend: ' + error));
}

function navigateTo(pathname) {
  const microFrontendName = mapPathnameToMicroFrontendName(pathname);

  if (!microFrontendName) {
    throw new Error('Micro Frontend not found for path: ' + pathname);
  }

  // if not the first mfe, unmount the nodes
  if (navigationHistory.length > 0) {
    unmountMicroFrontendFromDocument(microFrontendName);
  }

  navigationHistory.push(pathname);
  // update browser url
  window.history.pushState({}, '', pathname);

  loadMicroFrontend(microFrontendName);
}

export default {
  navigateTo
}
