import { mountMicroFrontendToCurrentDocument, unmountMicroFrontendFromDocument } from './mount';
import { mapPathnameToMicroFrontend, welcomeMicroFrontend, musicMicroFrontend } from './config';
import { isUserAuthenticated }  from './auth';
import download from './download';

const navigationHistory = []; // keep track of mfe mounted

function determineMicroFrontendToGoNext(pathname) {
  if (isUserAuthenticated) {  // ignore requested pathname
    console.log('user is authenticated, go to music frontend');
    return musicMicroFrontend;
  }

  const microFrontend = mapPathnameToMicroFrontend(pathname);
  if (!microFrontend) {
    console.log('unknown frontend at path (' + pathname + '), go to welcome frontend');
    return welcomeMicroFrontend;
  }

  if (microFrontend.restricted) {
    console.log(microFrontend.name + ' is restricted and user is un-authenticated, go to welcome frontend');
    return welcomeMicroFrontend;
  }

  console.log('user is un-authenticated, go to ' + microFrontend.name + ' frontend');
  return microFrontend;
}

function loadMicroFrontend(microFrontendName) {
  download(microFrontendName)
    .then(microFrontend => mountMicroFrontendToCurrentDocument(microFrontendName, microFrontend))
    .catch(error => new Error('Cannot mount frontend: ' + error));
}

function navigateTo(pathname) {
  const microFrontend = determineMicroFrontendToGoNext(pathname);

  if (!microFrontend.name) {
    throw new Error('Frontend not found for path: ' + microFrontend.pathname);
  }

  // if not the first mfe, unmount the nodes
  if (navigationHistory.length > 0) {
    const currentMicroFrontend = mapPathnameToMicroFrontend(navigationHistory[navigationHistory.length - 1]);
    if (microFrontend.pathname === currentMicroFrontend.pathname) {
      // changing urls between the same frontends, reset browser url and then do nothing
      window.history.pushState({}, '', currentMicroFrontend.pathname);
      return;
    }

    unmountMicroFrontendFromDocument(currentMicroFrontend.name);
  }

  navigationHistory.push(microFrontend.pathname);
  // update browser url
  window.history.pushState({}, '', microFrontend.pathname);

  loadMicroFrontend(microFrontend.name);
}

function restartApp() {
  navigateTo(welcomeMicroFrontend.pathname);
}

export {
  navigateTo,
  restartApp
}
