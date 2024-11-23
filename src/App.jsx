import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import HomePage from "./pages/HomePage/HomePage";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";
import SuggestPage from "./pages/SuggestPage/SuggestPage";
import TrendPage from "./pages/TrendPage/TrendPage";
import Analysing from "./pages/Analysis_ing/Analysing";
import AnalysingResult from './pages/AnalysingResult/AnalysingResult';
import Design from './pages/ResultGraph/Design';
import Recomend from './pages/Recomend/Recomend';
import Trend from './pages/Trend/Trend';
import TrendHome from './pages/TrendHome/TrendHome';
import { DataProvider } from "./api/ContextAPI";

export default function App() {
    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/analysis" element={<AnalysisPage />} />
                    <Route path="/suggest" element={<SuggestPage />} />
                    <Route path="/Analysing" element={<Analysing />} /> {/* 분석 로딩 페이지 */}
                    <Route path="/AnalysingResult" element={<AnalysingResult />} /> {/* 분석 결과 페이지 */}
                    <Route path="/design" element={<Design />} /> {/* 분석 그래프 결과 페이지2 */}
                    <Route path="/recommend" element={<Recomend />} />
                    <Route path="/trend" element={<Trend />} /> {/* 트렌드 페이지 */}
                    <Route path="/trendHome" element={<TrendHome />} /> {/* 트렌드 홈페이지 */}
                </Routes>
            </Router>
        </DataProvider>
    );
};