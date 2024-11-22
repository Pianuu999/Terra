import React, { useEffect } from "react";  // useEffect를 추가로 import합니다.
import { useLocation, useNavigate } from "react-router-dom";
import item from '/images/Group30.svg';
import icon from '/images/turn.svg';
import './Analysing.css';  // CSS 파일 추가
import logo from '/images/logo_01.svg';

const Analysing = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { selectedRegions, selectedCategory, selectedSubCategory } = location.state || {};

    useEffect(() => {
        // 로딩 화면을 4초 동안 보여준 후, 결과 페이지로 이동
        const timer = setTimeout(() => {
            navigate('/AnalysingResult', {
                state: { selectedRegions, selectedCategory, selectedSubCategory }
            });
        }, 4000); // 4초 후 분석 결과 페이지로 이동

        return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 클리어
    }, [navigate, selectedRegions, selectedCategory, selectedSubCategory]);

    return (
        <div className="backgroundAnalysng">
            <div className="circle">
                <img src={icon} alt="back" className="rotating" />
                <img src={item} alt="icon" className="icon" />
            </div>
            <h3 className="ing">분석중</h3>
            <img src={logo} className="imgLogo" />
        </div>
    );
}

export default Analysing;
