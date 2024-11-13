import React from "react";
import { useNavigate } from "react-router-dom";
import '../AnalysingResult/AnalysingResult.css';
import item3 from '../../Assets/Image/Group24.png'

const AnalysingResult = () => {

    const navigate = useNavigate();

    return (
        <div className="wrapper_Result">
            <div className="rowText">
                <p className="p1">고객</p> {/*사용자 이름 가져오기 */}
                <p className="p2">님에게 최적화된 상권은</p>
            </div>
            <div className="Result">
                <img src={item3} className="circleResult"/>
                <p className="p3">연남동</p> {/* 분석결과 데이터 정보가져오기*/}
            </div>
            <button className="startBtn" onClick={() => navigate('/ResultGraph')}>
                <a>상세 보고서 보러가기</a>
            </button>
        </div>
    )
}

export default AnalysingResult;