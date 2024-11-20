import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import terra_logo from '../Assets/Image/terra_logo.svg';
import '../Components/NavBar.css';

export default function NavBar() {
    return (
        <div className="div_top">
            <div className="img_container">
                <NavLink to="/" >
                    <img src={terra_logo} alt="Logo" className="img_style" />
                </NavLink>
            </div>
            <div className="search_container">
                <div className="search_div">
                    <svg className="search_icon" width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24.5 24.5L19.425 19.425M22.1667 12.8333C22.1667 17.988 17.988 22.1667 12.8333 22.1667C7.67868 22.1667 3.5 17.988 3.5 12.8333C3.5 7.67868 7.67868 3.5 12.8333 3.5C17.988 3.5 22.1667 7.67868 22.1667 12.8333Z"
                            stroke="#B3B3B3"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="원하는 지역을 검색 하세요"
                        className="search_box"
                    />
                </div>
            </div>
            <ul className="ul_container">
                <li>
                    <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
                        유동인구
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Question" className={({ isActive }) => (isActive ? "active" : "")}>
                        상권분석
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/recommend" className={({ isActive }) => (isActive ? "active" : "")}>
                        상권추천
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/trendHome" className={({ isActive }) => (isActive ? "active" : "")}>
                        트랜드
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}