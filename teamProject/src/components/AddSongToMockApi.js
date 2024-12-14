import React from "react";

const AddSongToMockApi = async (songData) => {
  const MY_MOCK_API_URL =
    "https://674869735801f5153590c409.mockapi.io/playlist";

  try {
    const response = await fetch(MY_MOCK_API_URL, {
      //내 mock api로 정보를 fetch해서 post한다.
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(songData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    console.log("Song added successfully!");
  } catch (error) {
    console.error("곡 추가 실패: ", error);
    throw error;
  }
};

export default AddSongToMockApi;
