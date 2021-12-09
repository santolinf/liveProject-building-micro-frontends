import './App.css';
import { signOut } from './boostrap';
import SongList from './component/SongList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Your "Red Records" Music List</h1>
      </header>
      <main role="main" className="container">
        <div>
          <button type="button" className="float-end" onClick={signOut}>Sign out</button>
        </div>
        <SongList />
      </main>
    </div>
  );
}

export default App;
