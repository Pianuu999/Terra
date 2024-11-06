// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import './App.css';

function Main() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = () => {
    navigate("/home"); // Home 페이지로 이동
  };

  return (
    <div className="container">
      <div className="text-container">
        <p className="p_style">당신이 찾고 있는 정보를</p>
        <p className="p_style">한눈에 알아보세요</p>
      </div>
      <div className="button_style">
        <button className="button_container" onClick={handleClick}>
          <p className="button_text">상권분석 시작</p>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
        <Route path="/home" element={<Home />} /> {/* Home 페이지 */}
      </Routes>
    </Router>
  );
}
