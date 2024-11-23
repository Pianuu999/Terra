import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../AnalysingResult/AnalysingResult.css';
import item3 from '/images/Group24.png';

const AnalysingResult = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // location.state에서 필요한 데이터 추출
    const { selectedRegions, selectedCategory, selectedSubCategory, recommendations } = location.state || {}; 

    // recommendations가 없거나 selectedRegions가 없으면 로딩 화면 표시
    if (!selectedRegions || !recommendations || recommendations.length === 0) {
        return <div>데이터를 불러오는 데 실패했습니다.</div>;
    }

    // 첫 번째 추천 지역 데이터
    const firstRecommendation = recommendations[0];

    // Design 페이지로 이동할 함수
    const goToDesignPage = () => {
        navigate('/Design', {
            state: {
                selectedRegions,
                selectedCategory,  // selectedCategory가 안쪽으로 포함되어야 할 것 같습니다
                selectedSubCategory,
                recommendations, // recommendations를 바로 전달
            }
        });
    };

    return (
        <div className="wrapper_Result">
            <div className="rowText">
                <p className="p1">고객</p> {/*사용자 이름 가져오기 */}
                <p className="p2">님에게 최적화된 상권은</p>
            </div>
            <div className="Result">
                <img src={item3} className="circleResult" alt="result" />
                <p className="p3_01">{firstRecommendation.administrativeDistrictName}</p> {/* 첫 번째 추천 지역 이름 */}
            </div>
            <button className="startBtn" onClick={goToDesignPage} style={{fontSize: 20, color: "white", fontFamily: "Pretendard Variable"}}>
                상세 보고서 보러가기
            </button>
        </div>
    );
}

export default AnalysingResult;
