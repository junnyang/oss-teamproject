import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./components.css";

const MyPlaylist = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          "https://674869735801f5153590c409.mockapi.io/playlist"
        );
        if (!response.ok) throw new Error("Failed to fetch songs.");
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("곡 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchSongs();
  }, []);

  return (
    <div>
      <h1>My Playlist</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {songs.map((song) => (
          <div
            key={song.id}
            style={{ margin: "10px", cursor: "pointer" }}
            onClick={() => navigate(`/myPlaylistInfo/${song.id}`)}
          >
            <img
              src={song.image}
              alt={song.trackName}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <p>{song.trackName}</p>
            <p>{song.artist}</p>
          </div>
        ))}
      </div>
      <button className="Button-on-Info" onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
};

export default MyPlaylist;
