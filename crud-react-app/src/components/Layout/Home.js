import React, { useState } from "react";
import axios from "axios";

const API_KEY = "3cc05287d33f3ae115254cc89be3f0b3";
const API_URL = "https://ws.audioscrobbler.com/2.0/";

const Home = ({ playlist, setPlaylist }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 검색 함수
  const searchTracks = async (term) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL, {
        params: {
          method: "track.search",
          track: term,
          api_key: API_KEY,
          format: "json",
        },
      });

      const results = response.data.results.trackmatches.track;
      setTracks(results);
    } catch (err) {
      setError("음악 데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 검색 실행
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      searchTracks(searchTerm);
    }
  };

  // 플레이리스트에 추가
  const addToPlaylist = (track) => {
    if (!playlist.find((item) => item.name === track.name)) {
      setPlaylist([...playlist, track]);
    }
  };

  return (
    <div className="container">
      <h1>음악 검색</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="음악 제목 입력..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="search-button">
          검색
        </button>
      </form>

      {loading && <p>로딩 중...</p>}
      {error && <p className="error-text">{error}</p>}

      <div>
        <h2>검색 결과</h2>
        {tracks.length > 0 ? (
          <ul className="track-list">
            {tracks.map((track, index) => (
              <li key={index} className="track-item">
                <div>
                  <strong>{track.name}</strong> by {track.artist}
                </div>
                <button
                  onClick={() => addToPlaylist(track)}
                  className="add-button"
                >
                  플레이리스트에 추가
                </button>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
