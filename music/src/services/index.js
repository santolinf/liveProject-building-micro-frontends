import { get } from './http';

export function getSongList() {
  return get(process.env.REACT_APP_SONGS_URL)
    .then(json => json.data.songs);
}
