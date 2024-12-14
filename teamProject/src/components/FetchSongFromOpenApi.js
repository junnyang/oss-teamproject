import React from "react";

const fetchSongFromOpenApi = async (artist, track) => {
  const API_KEY = "7412f96cd208a5624791884f2640992e";
  const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

  const url = `${BASE_URL}?method=track.getInfo&api_key=${API_KEY}&artist=${encodeURIComponent(
    artist
  )}&track=${encodeURIComponent(track)}&format=json`; //url 보낼 주소.

  try {
    const response = await fetch(url); //fetch해오기.
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.track;
  } catch (error) {
    console.error("API request failed: ", error);
    throw error;
  }
};

export default fetchSongFromOpenApi;
