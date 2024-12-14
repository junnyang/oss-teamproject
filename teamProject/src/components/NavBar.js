import { Outlet, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="nav-bar">
        <div className="nav-item" onClick={() => navigate(-1)}>
          뒤로가기
        </div>
        <div className="nav-item" onClick={() => navigate("/")}>
          메인화면
        </div>
        <div className="nav-item" onClick={() => navigate("/myPlaylist")}>
          플레이리스트
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
