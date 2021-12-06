const welcomeMicroFrontend = {
    pathnameId: 'hello',
    pathname: '/hello',
    name: 'welcome',
    restricted: false
  },
  musicMicroFrontend = {
    pathnameId: 'play',
    pathname: '/play',
    name: 'music',
    restricted: true
  },
  microFrontends = [welcomeMicroFrontend, musicMicroFrontend];

function parsePathnameId(pathname) {
  const pathSegmentsFound = /\/?(\w+)\/?.*/.exec(pathname??'');
  return pathSegmentsFound?pathSegmentsFound[1]:'';
}

// eg, /play -> music
function mapPathnameToMicroFrontend(pathname) {
  const pathnameId = parsePathnameId(pathname);
  return microFrontends.find(mfe => mfe.pathnameId === pathnameId);
}

export {
  welcomeMicroFrontend,
  musicMicroFrontend,
  mapPathnameToMicroFrontend
};
