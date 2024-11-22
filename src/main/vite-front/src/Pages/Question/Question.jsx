import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Question.css';
import regionCoordinates from "../../Data/regionCoordinates";

const Question = () =>{

    const navigate = useNavigate();
    const [region, setRegion] = useState('');
    const [industry, setIndustry] = useState('');

    const regionSelect = () => {
        const [selectedRegions, setSelectedRegions] = useState('')
    };

    //지도 위치 업데이트를 위한

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto'; // 컴포넌트가 언마운트되면 스크롤을 복원
        };
    }, []);

    return(
        <div>
            <div className="wrapper2">
                <h3 className="h3">고객님의 원하는 정보를 알려드려요.</h3>
                <div className="select_container">
                    <select onChange={setRegion} value={region}>
                        <option value="" disabled selected>어떤 지역을 원하시나요?</option>
                        {Object.keys(regionCoordinates).map((regionName, index) => (
                            <option key={index} value={regionName}>{regionName}</option>
                        ))}
                    </select>
                    <select onClick={(e) => setIndustry(e.target.value)}>
                        <option value="" disabled selected>어떤 업종을 원하시나요?
                        </option>
                        <option value="1">요식업</option>
                        <option value="2">유통업</option>
                        <option value="3">여가/오락</option>
                        <option value="4">미용업</option>
                    </select>
                </div>
                <div className="btn_container">
                <button className="startBtn2" onClick={() => navigate('/Analysing')}>
                    상권분석 시작하기
                </button>
                </div>
            </div>
        </div>
    )
}
 
export default Question