import React from "react";
import './Question.css';
import Map from '../../Components/mapmini/Map'
import NavBar from "../../Components/NavBar";

const Question = () =>{
    return(
        <div>
            <div className="wrapper">
                <h3 className="h3">고객님의 원하는 정보를 알려드려요.</h3>
                <div className="select_container">
                    <select>
                        <option value="" disabled selected>어떤 지역을 원하시나요?</option>
                        <option value="1">홍대</option>
                        <option value="2">강남구</option>
                        <option value="3">동대문</option>
                        <option value="4">광화문</option>
                    </select>
                    <select>
                        <option value="" disabled selected>어떤 업종을 원하시나요?
                        </option>
                        <option value="1">요식업</option>
                        <option value="2">유통업</option>
                        <option value="3">의료업</option>
                        <option value="4">미용업</option>
                    </select>
                </div>
                <div className="mapMini">
                    <Map/>
                </div>
                <button className="startBtn2" onClick={() => window.location.href = "Analysing"}>
                    <a>상권분석 시작하기</a>
                </button>
            </div>
        </div>
    )
}
 
export default Question