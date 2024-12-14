import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

/*
수정하고 싶은 특정 곡의 정보를 props를 통해 받아와서, mock api 에게 전달.
update 버튼과 delete 버튼, 이전 myPlaylist 화면으로 돌아가는 버튼 있음.
*/

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memo, setMemo] = useState("");

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(
          `https://672892b8270bd0b975564904.mockapi.io/api/:groupList/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch song.");
        const data = await response.json();
        setMemo(data.memo || "");
      } catch (error) {
        console.error("곡 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    fetchSong();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await fetch(
        `https://672892b8270bd0b975564904.mockapi.io/api/:groupList/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ memo }),
        }
      );
      alert("메모가 수정되었습니다.");
      navigate(`/myPlaylistInfo/${id}`);
    } catch (error) {
      console.error("메모 수정 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <h2>Edit Memo</h2>
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        rows="5"
        cols="50"
      />
      <button onClick={handleUpdate}>Save</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default Update;
