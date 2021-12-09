import { useEffect, useState } from 'react';
import './App.css';
import { signOut } from './boostrap';
import { getSongList } from './services';
import SongsList from './component/SongsList';

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongList()
      .then(songs => setSongs(songs))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your "Red Records" Music List</h1>
      </header>
      <main role="main" className="container">
        <div>
          <button type="button" className="float-end" onClick={signOut}>Sign out</button>
        </div>
        <SongsList songs={songs} />
      </main>
    </div>
  );
}

export default App;
