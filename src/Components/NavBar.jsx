import React from "react";
import logo from '../Assets/Image/logo_03.svg';
import './NavBar.css'

export default function NavBar() {

    return (
        <div className="div_top">
            <div className="logo">
                <a href="/"><img src={logo} /></a>
            </div>
            <div className="navbar">
                <ul className="nav_link">
                    <li>유동인구</li>
                    <li>상권분석</li>
                    <li>상권추천</li>
                    <li>트랜드</li>
                </ul>
            </div>
        </div>
    )
}