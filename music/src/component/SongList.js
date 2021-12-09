import { useEffect, useState } from 'react';
import { getSongList } from '../services';

export default function SongList () {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongList().then(songs => setSongs(songs)).catch(error => console.log(error));
  }, []);

  return (
    <div className="grid-container row">
      { songs.map((song, index) => (
        <div key={index} className="card p-0 mb-4 shadow-sm">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">{song.trackName}</h4>
            <p>{song.artistName}</p>
          </div>
          <div className="card-body">
            <div className="card-title"><h4>{song.collectionName}</h4></div>
            <ul className="card-text list-unstyled mt-3 mb-4">
              <li><img src={song.artworkUrl} alt={song.trackName} width="100" height="100" className="img-fluid rounded float-start" /></li>
              <li className="mt-3">
                <audio controls crossOrigin="anonymous" src={song.previewUrl}>
                  Your browser does not support the <code>audio</code> element.
                </audio>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
