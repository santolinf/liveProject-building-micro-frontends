import mapPathnameToMicroFrontendName from './config';
import download from './download';
import loadMicroFrontendToCurrentDocument from './load';

const microFrontendName = mapPathnameToMicroFrontendName(window.location.pathname);

if (microFrontendName) {
  download(microFrontendName)
    .then(microFrontend => loadMicroFrontendToCurrentDocument(microFrontendName, microFrontend))
    .catch(error => new Error('Cannot load Micro Frontend: ' + error));

} else {
  throw new Error('Micro Frontend not found for path: ' + window.location.pathname);
}
