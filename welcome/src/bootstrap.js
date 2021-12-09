
function goToMusicFrontend() {
  if (!window.boostrap) {
    console.log('boostrap is not available');
    return;
  }

  window.boostrap.router.navigateTo(process.env.VUE_APP_MUSIC_URL);
}

function setToken(token) {
  if (!window.boostrap) {
    console.log('boostrap is not available');
    return;
  }

  window.boostrap.auth.setToken(token);
}

function getEventNames() {
  if (!window.boostrap) {
    console.log('boostrap is not available');
    return {};
  }

  return window.boostrap.eventNames;
}

export {
  goToMusicFrontend,
  setToken,
  getEventNames
}
