import React from "react";
import '../Start/Start.css';

const Start = () => {
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
    )
}

export default Start;