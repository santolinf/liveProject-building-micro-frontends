import { mountMicroFrontendToCurrentDocument, unmountMicroFrontendFromDocument } from './mount';
import mapPathnameToMicroFrontendName from './config';
import download from './download';

const navigationHistory = []; // keep track of mfe mounted

function loadMicroFrontend(path) {
  const microFrontendName = mapPathnameToMicroFrontendName(path);

  if (microFrontendName) {
    download(microFrontendName)
      .then(microFrontend => mountMicroFrontendToCurrentDocument(microFrontendName, microFrontend))
      .catch(error => new Error('Cannot load Micro Frontend: ' + error));
  } else {
    throw new Error('Micro Frontend not found for path: ' + window.location.pathname);
  }
}

function navigateTo(pathname) {
  // if not the first mfe, unmount the nodes
  if (navigationHistory.length > 0) {
    unmountMicroFrontendFromDocument();
  }

  navigationHistory.push(pathname);
  // update browser url
  window.history.pushState({}, '', pathname);

  loadMicroFrontend(pathname);
}

export default {
  navigateTo
}
