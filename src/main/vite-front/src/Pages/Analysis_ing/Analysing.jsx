import React, { useEffect } from "react";  // useEffect를 추가로 import합니다.
import { useNavigate } from "react-router-dom";
import item from '../../Assets/Image/Group22.png';
import item2 from '../../Assets/Image/Group2.png';
import './Analysing.css';  // CSS 파일 추가

const Analysing = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // 4초 후에 다음 페이지로 이동
        const timer = setTimeout(() => {
            navigate('/AnalysingResult'); // 이동할 페이지 경로
        },4000);

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="wrapper">
            <div className="circle">
                <img src={item} alt="back" className="rotating"/>
                <img src={item2} alt="icon" className="icon"/>
            </div>
            <h3 className="ing">분석중</h3>
        </div>
    );
}

export default Analysing;
