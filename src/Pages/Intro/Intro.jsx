import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../Intro/Intro.css'
import logo from '../../Assets/Image/6-removebg-preview.png'

const Intro = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 3초 후에 다음 페이지로 이동
        const timer = setTimeout(() => {
            navigate('/Main'); // 이동할 페이지 경로
        }, 3000);

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearTimeout(timer);
    }, [navigate]);


    return (
        <div className="Logo_container">
            <img src={logo} alt="logo"/>
        </div>
    )
}

export default Intro