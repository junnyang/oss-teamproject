import React, { useState } from "react";
import { Link } from "react-router-dom";

const Playlist = ({ playlist, setPlaylist }) => {
  const [editingTrack, setEditingTrack] = useState(null); // 현재 수정 중인 곡
  const [formData, setFormData] = useState({}); // 수정 폼 데이터

  // 곡 삭제 함수
  const handleDelete = (id) => {
    setPlaylist(playlist.filter((track) => track.id !== id));
  };

  // 수정 시작
  const startEditing = (track) => {
    setEditingTrack(track.id);
    setFormData({ ...track });
  };

  // 수정 취소
  const cancelEditing = () => {
    setEditingTrack(null);
    setFormData({});
  };

  // 수정 값 변경
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 수정 저장
  const saveEdit = () => {
    setPlaylist(
      playlist.map((track) =>
        track.id === editingTrack ? { ...track, ...formData } : track
      )
    );
    setEditingTrack(null);
    setFormData({});
  };

  return (
    <div className="playlist-container">
      <h2>나의 플레이리스트</h2>
      {playlist.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>곡 제목</th>
              <th>가수</th>
              <th>앨범 이름</th>
              <th>발매일</th>
              <th>Number of Listeners</th>
              <th>Total Times Played</th>
              <th>Link</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {playlist.map((track, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {editingTrack === track.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="artist"
                        value={formData.artist || ""}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="album"
                        value={formData.album || ""}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="releaseDate"
                        value={formData.releaseDate || ""}
                        onChange={handleInputChange}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{track.name}</td>
                    <td>{track.artist}</td>
                    <td>{track.album || "N/A"}</td>
                    <td>{track.releaseDate || "N/A"}</td>
                  </>
                )}
                <td>{track.listeners || "N/A"}</td>
                <td>{track.playcount || "N/A"}</td>
                <td>
                  {track.url ? (
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  {editingTrack === track.id ? (
                    <>
                      <button onClick={saveEdit} className="btn btn-success">
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="btn btn-warning"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(track)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(track.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>플레이리스트가 비어 있습니다.</p>
      )}
      <Link to="/" className="btn btn-primary">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default Playlist;
