
function getToken() {
  if (!window.boostrap) {
    console.log('boostrap is not available');
    return;
  }

  return window.boostrap.auth.getToken();
}

function signOut() {
  if (!window.boostrap) {
    console.log('boostrap is not available');
    return;
  }

  window.boostrap.auth.setToken();
  return window.boostrap.router.restartApp();
}

function getEventNames() {
  if (!window.boostrap) {
    console.log('boostrap is not available');
    return {};
  }

  return window.boostrap.eventNames;
}

export {
  getToken,
  signOut,
  getEventNames
}
