import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './Question.css';
import Map from '../../Components/mapmini/Map'

const Question = () =>{

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto'; // 컴포넌트가 언마운트되면 스크롤을 복원
        };
    }, []);

    return(
        <div>
            <div className="wrapper">
                <h3 className="h3">고객님의 원하는 정보를 알려드려요.</h3>
                <div className="select_container">
                    <select>
                        <option value="" disabled selected>어떤 지역을 원하시나요?</option>
                        <option value="1">강남구</option>
                        <option value="2">강동구</option>
                        <option value="3">강북구</option>
                        <option value="4">강서구</option>
                        <option value="5">관악구</option>
                        <option value="6">광진구</option>
                        <option value="7">구로구</option>
                        <option value="8">금천구</option>
                        <option value="9">노원구</option>
                        <option value="11">동대문구</option>
                        <option value="12">동작구</option>
                        <option value="13">마포구</option>
                        <option value="14">서대문구</option>
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
                <button className="startBtn2" onClick={() => navigate('/Analysing')}>
                    <a>상권분석 시작하기</a>
                </button>
            </div>
        </div>
    )
}
 
export default Question