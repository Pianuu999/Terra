// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import './App.css';
import Question from "./Pages/question/question";
import Analysing from "./Pages/Analysis_ing/Analysing";
import Intro from "./Pages/Intro/Intro";
import AnalysingResult from "./Pages/AnalysingResult/AnalysingResult";
import ResultGraph from "./Pages/resultGraph/resultGraph";
import NavBar from "./Components/NavBar";

function Main() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = () => {
    navigate("/home"); // Home 페이지로 이동
  };

  return (
    <>
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
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} /> {/* 메인 페이지 */}
        <Route path="/Intro" element={<Intro/>} /> {/* 분석 로딩 페이지 */}
        <Route path="/Main" element={<Main />} /> {/* 메인 페이지 */}
        <Route path="/home" element={<Home />} /> {/* Home 페이지 */}
        <Route path="/Question" element={<><NavBar></NavBar><Question /></>} /> {/* 분석에 필요한 정보 기입 페이지 */}
        <Route path="/Analysing" element={<Analysing />} /> {/* 분석 로딩 페이지 */}
        <Route path="/AnalysingResult" element={<AnalysingResult />} /> {/* 분석 결과 페이지 */}
        <Route path="/ResultGraph" element={<ResultGraph />} /> {/* 분석 그래프 결과 페이지 */}
      </Routes>
    </Router>
  );
}
