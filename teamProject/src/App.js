import "./App.css";
import CreateUser from "./components/User/CreateUser";
import ShowUser from "./components/User/ShowUser";
import Playlist from "./components/User/Playlist";
import { Route, Routes } from "react-router-dom";
import EditUser from "./components/User/EditUser";
import User from "./components/User/User";
import Header from "./components/Common/Header";
import Home from "./components/Layout/Home";
import { useState } from "react";

function App() {
  // 플레이리스트 상태를 App에서 관리
  const [playlist, setPlaylist] = useState([]);

  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home playlist={playlist} setPlaylist={setPlaylist} />}
            />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/show-user" element={<ShowUser />} />
            <Route
              path="/playlist"
              element={
                <Playlist playlist={playlist} setPlaylist={setPlaylist} />
              }
            />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
