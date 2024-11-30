import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // React Router 사용
import App from "./App";
import "./App.css"; // 전체 CSS 파일 가져오기

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root") // index.html의 <div id="root"></div>에 렌더링
);
