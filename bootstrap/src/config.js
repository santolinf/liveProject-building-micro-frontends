const microFrontends = [
  {
    pathnameId: 'hello',
    name: 'welcome'
  },
  {
    pathnameId: 'play',
    name: 'music'
  }
];

function parsePathnameId(pathname) {
  const pathSegmentsFound = /\/?(\w+)\/?.*/.exec(pathname??'');
  return pathSegmentsFound?pathSegmentsFound[1]:'';
}

// eg, /play -> music
function mapPathnameToMfeName(pathname) {
  const pathnameId = parsePathnameId(pathname);
  const microFrontend = microFrontends.find(mfe => mfe.pathnameId === pathnameId);

  return microFrontend?microFrontend.name:undefined;
}

export default mapPathnameToMfeName;
