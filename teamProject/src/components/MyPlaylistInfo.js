import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./components.css";
import "../App.css";

const MyPlaylistInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = React.useState(null);

  React.useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(
          `https://674869735801f5153590c409.mockapi.io/playlist/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch song details.");
        const data = await response.json();
        setSong(data);
      } catch (error) {
        console.error("곡 데이터를 가져오는 중 오류 발생:", error);
        alert("곡 정보를 가져오지 못했습니다.");
        navigate("/myPlaylist");
      }
    };
    fetchSong();
  }, [id, navigate]);

  if (!song) return <p>Loading...</p>;

  return (
    <form>
      <div className="songInfo">
        <h2>{song.trackName}</h2>
        <img src={song.image} alt={song.trackName} />
        <p>Artist: {song.artist}</p>
        <p>Album: {song.album}</p>
        <p>Summary: {song.summary}</p>
        <p>My Note: {song.memo}</p>
        <button
          className="Button-on-Info"
          onClick={() => navigate(`/update/${id}`)}
        >
          Edit Memo
        </button>
        <button className="Button-on-Info" id="delete" onClick={handleDelete}>
          Delete Song
        </button>
        <button className="Button-on-Info" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </form>
  );

  async function handleDelete() {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await fetch(
          `https://674869735801f5153590c409.mockapi.io/playlist/${id}`,
          { method: "DELETE" }
        );
        alert("곡이 삭제되었습니다.");
        navigate("/myPlaylist");
      } catch (error) {
        console.error("곡 삭제 중 오류 발생:", error);
      }
    }
  }
};

export default MyPlaylistInfo;
