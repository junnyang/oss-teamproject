import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import Add from "./components/Add";
import NavBar from "./components/NavBar";
import MyPlaylist from "./components/MyPlaylist";
import MyPlaylistInfo from "./components/MyPlaylistInfo";
import Update from "./components/Update";
import FetchSongFromOpenApi from "./components/FetchSongFromOpenApi";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Title />} />
          <Route path="/add" element={<Add />} />
          <Route path="/myPlaylist" element={<MyPlaylist />} />
          <Route path="/myPlaylistInfo/:id" element={<MyPlaylistInfo />} />
          <Route path="/update/:id" element={<Update />} />
        </Route>
      </Routes>
    </>
  );
}

function Title() {
  const [songname, setSongname] = useState("");
  const [artist, setArtist] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const trackInfo = await FetchSongFromOpenApi(artist, songname);
      navigate("/add", { state: { trackInfo } });
    } catch (error) {
      console.error("곡 정보 가져오기 실패:", error);
    }
  };

  return (
    <>
      <h1>Music Searching Website</h1>
      <div>
        <p>
          Enter the song name and artist name, then click the search button.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="songname"
            value={songname}
            onChange={(e) => setSongname(e.target.value)}
            placeholder="Enter Song Name"
          />
          <input
            type="text"
            name="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Enter Artist Name"
          />
          <button type="submit">Search Song Information</button>
        </form>
      </div>
    </>
  );
}

export default App;
