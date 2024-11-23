import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Image_01 from "/images/3d_customer.png";
import styles from "./AnalysisPage.module.css";

// 영역 자치구.json 파일을 불러오는 부분 (실제 데이터 파일로 경로 수정 필요)
import data from '../../Data/서울시 상권분석서비스(영역-자치구).json';

export default function AnalysisPage() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    // 업종 카테고리 데이터
    const categories = [
        {
            value: "food",
            label: "음식점 / 식음료",
            subcategories: [
                { value: "한식음식점", label: "한식음식점" },
                { value: "일식음식점", label: "일식음식점" },
                { value: "중식음식점", label: "중식음식점" },
                { value: "양식음식점", label: "양식음식점" },
                { value: "치킨전문점", label: "치킨전문점" },
                { value: "패스트푸드점", label: "패스트푸드점" },
                { value: "카페", label: "카페" },
                { value: "분식전문점", label: "분식전문점" },
                { value: "반찬가게", label: "반찬가게" },
                { value: "호프 / 간이주점", label: "호프 / 간이주점" },
                { value: "편의점", label: "편의점" },
            ],
        },
        {
            value: "retail",
            label: "소매업 / 상점",
            subcategories: [
                { value: "슈퍼마켓", label: "슈퍼마켓" },
                { value: "문구", label: "문구" },
                { value: "서적", label: "서적" },
                { value: "일반의류", label: "일반의류" },
                { value: "신발", label: "신발" },
                { value: "시계 및 귀금속", label: "시계 및 귀금속" },
                { value: "가전제품", label: "가전제품" },
                { value: "가구", label: "가구" },
                { value: "수산물판매", label: "수산물판매" },
                { value: "육류판매", label: "육류판매" },
                { value: "가방", label: "가방" },
                { value: "안경", label: "안경" },
            ],
        },
        {
            value: "entertainment",
            label: "오락 / 여가",
            subcategories: [
                { value: "PC방", label: "PC방" },
                { value: "노래방", label: "노래방" },
                { value: "당구장", label: "당구장" },
                { value: "골프연습장", label: "골프연습장" },
            ],
        },
        {
            value: "beauty_health",
            label: "미용 / 건강",
            subcategories: [
                { value: "미용실", label: "미용실" },
                { value: "네일숍", label: "네일숍" },
                { value: "피부관리실", label: "피부관리실" },
            ],
        },
        {
            value: "laundry_service",
            label: "세탁 / 서비스",
            subcategories: [
                { value: "세탁소", label: "세탁소" },
            ],
        },
    ];

    // 지역 데이터를 불러오는 부분
    const [regions, setRegions] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [recommendations, setRecommendations] = useState([]);  // 추천 데이터 상태 추가

    useEffect(() => {
        // data.json에서 지역 정보를 가져와서 상태에 저장
        const regionData = data.DATA.map(item => ({
            value: item.signgu_nm,
            label: item.signgu_nm
        }));
        setRegions(regionData);
    }, []);

    const handleRegionChange = (event) => {
        const selected = event.target.value;
        if (!selectedRegions.includes(selected) && selectedRegions.length < 3) {
            setSelectedRegions([...selectedRegions, selected]);
        }
    };

    const removeRegion = (region) => {
        setSelectedRegions(selectedRegions.filter((r) => r !== region));
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedSubCategory(""); // 대분류 변경시 소분류 초기화
    };

    const handleSubCategoryChange = (event) => {
        setSelectedSubCategory(event.target.value);
    };

    // 선택된 카테고리 데이터를 가져옵니다.
    const selectedCategoryData = categories.find((category) => category.value === selectedCategory);

    // 분석 시작 버튼 클릭시 API 호출
    const handleAnalysisStart = async () => {
        if (selectedRegions.length === 0 || !selectedCategory || !selectedSubCategory) {
            alert("모든 항목을 선택해주세요!");
            return;
        }

        try {
            // regionsParam과 selectedSubCategory를 로그로 찍어봄
            const regionsParam = selectedRegions.join(',');
            console.log('Regions:', regionsParam);
            console.log('SubCategory:', selectedSubCategory);
    
            // 백엔드 API에 GET 요청
            const response = await fetch(`http://localhost:8080/api/terra/recommendations?district=${regionsParam}&serviceIndustryCodeName=${selectedSubCategory}`);
            
            // 응답 상태 확인
            if (response.ok) {
                const data = await response.json();
                console.log('API Response:', data);  // 응답 데이터 로그 찍기
                setRecommendations(data);  // 추천 데이터를 상태에 저장
                navigate('/Analysing', {
                    state: {
                        selectedRegions,
                        selectedCategory,
                        selectedSubCategory,
                        recommendations: data, // 추천 데이터도 전달
                    }
                });
            } else {
                alert("추천 데이터를 불러오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("API 호출 에러:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div style={{ backgroundColor: 'aliceblue', marginTop: '128px' }}>
            <NavBar />
            <div className={styles.scrollContainer}>
                <div className={styles.item_01}>
                    <h3 className={styles.h3_01}>원하는 지역을 분석해 보세요</h3>
                    <img src={Image_01} className={styles.img_01} />
                    <div className={styles.circle_shadow} />
                    <div className={styles.box_shadow}>
                        <div className={styles.h3_02}>
                            <p>원하는 상권을 분석하고</p>
                            <p>성공을 위한 확실한 결정을 내려 보세요!</p>
                        </div>
                        <div className={styles.p_01}>
                            <p>최대 3개의 지역을 선택하고</p>
                            <p>원하는 업종을 고른후 '분석 시작' 버튼을 누르세요.</p>
                            <p>선택한 지역에 가장 적합한 동을 추천해 주고</p>
                            <p>지역 특성, 남녀 소비 비율, 매출 데이터를</p>
                            <p>시각화하여 제공해 드립니다.</p>
                        </div>
                    </div>
                    <svg className={styles.svg_01} width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.5" d="M9.5 14.25L19 23.75L28.5 14.25" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className={styles.item_02}>
                    <div className={styles.item_03}>
                        <div className={styles.item_04}>
                            <p className={styles.p_02}>원하는 지역을 선택 하세요</p>
                            <div className={styles.select_container}>
                                <select onChange={handleRegionChange} className={styles.select_style}>
                                    <option value="">구 선택</option>
                                    {regions.map((region) => (
                                        <option key={region.value} value={region.value}>
                                            {region.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.selected_regions}>
                                {selectedRegions.map((region, index) => {
                                    const regionData = regions.find((r) => r.value === region);
                                    return (
                                        <div key={index} className={styles.selected_tag}>
                                            <span>{regionData?.label}</span>
                                            <button onClick={() => removeRegion(region)} className={styles.remove_btn}>
                                                ×
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.item_04}>
                            <p className={styles.p_03}>원하는 업종을 선택 하세요</p>
                            <div className={styles.select_container}>
                                <select onChange={handleCategoryChange} value={selectedCategory} className={styles.select_style}>
                                    <option value="" disabled>
                                        대분류를 선택하세요
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedCategory && (
                                <div className={styles.select_container}>
                                    <select
                                        onChange={handleSubCategoryChange}
                                        value={selectedSubCategory}
                                        className={styles.select_style}
                                    >
                                        <option value="" disabled>
                                            소분류를 선택하세요
                                        </option>
                                        {selectedCategoryData &&
                                            selectedCategoryData.subcategories.map((subcategory) => (
                                                <option key={subcategory.value} value={subcategory.value}>
                                                    {subcategory.label}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <button className={styles.button_01} onClick={handleAnalysisStart}>분석 시작하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};