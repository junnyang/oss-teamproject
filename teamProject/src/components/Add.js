import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FetchSongFromOpenApi from "./FetchSongFromOpenApi";
import AddSongFromMockApi from "./AddSongToMockApi";

/*홈으로 나가기 기능 추가해야 함. */

function Add() {
  /*다른곳에서 받아온 데이터를 api들에게 넘거준다. */
  const location = useLocation();
  const navigate = useNavigate();
  const track = location.state?.trackInfo; //데이터 전달받기

  if (!track) {
    return (
      <div>
        <p>No song data available. Please try searching again.</p>
        <button onClick={() => navigate("/")}>Go Back to Home</button>
      </div>
    );
  }

  const handleAddSong = async () => {
    const songData = {
      artist: track.artist?.name || "Unknown Artist",
      trackName: track.name || "Unknown Track",
      album: track.album?.title || "Unknown Album",
      listeners: track.listeners || "N/A",
      playcount: track.playcount || "N/A",
      image: track.album?.image?.[1]?.["#text"] || "",
      url: track.album?.url || "#",
      published: track.wiki?.published || "N/A",
      summary: track.wiki?.summary || "No summary available.",
    };

    try {
      await AddSongFromMockApi(songData);
      alert("Song is added successfully");
      navigate("/"); //다시 메인 페이지로 이동
    } catch (error) {
      console.error("Failed to save the song:", error);
      alert("Failed to add the song. Please try again.");
    }
  };

  return (
    //곡 정보가 담긴 html tag들을 전달하기. (정보 찾은거를 보여주는 용도. 버튼누르면 추가되는 로직 실행)
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <h2 style={{ textAlign: "center" }}>{track.name || "Unknown Track"}</h2>
      <div style={{ margin: "10px 0" }}>
        <img
          src={
            track.album?.image?.[1]?.["#text"] ||
            "https://via.placeholder.com/150"
          }
          alt="Album Cover"
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <p>Artist: {track.artist?.name || "Unknown Artist"}</p>
      <p>Album: {track.album?.title || "Unknown Album"}</p>
      <p>Listeners: {track.listeners || "N/A"}</p>
      <p>Playcount: {track.playcount || "N/A"}</p>
      <p>Published: {track.wiki?.published || "N/A"}</p>
      <p>About the Song: {track.wiki?.summary || "No summary available."}</p>
      <p>
        More details:{" "}
        <a
          href={track.album?.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.album?.url || "Link not available"}
        </a>
      </p>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleAddSong} style={{ marginRight: "10px" }}>
          Add to My Playlist
        </button>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
}

export default Add;
