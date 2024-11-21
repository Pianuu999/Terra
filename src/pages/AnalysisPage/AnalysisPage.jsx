import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Image_01 from "/images/3d_customer.png"
import styles from "./AnalysisPage.module.css";

export default function AnalysisPage() {
    const navigate = useNavigate();
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const regions = [
        { value: "seoul", label: "서울" },
        { value: "busan", label: "부산" },
        { value: "daegu", label: "대구" },
        { value: "incheon", label: "인천" },
        { value: "gwangju", label: "광주" },
    ];

    const categories = [
        {
            value: "food",
            label: "요식업",
            subcategories: [
                { value: "chinese", label: "중식" },
                { value: "korean", label: "한식" },
                { value: "cafe", label: "카페" },
            ],
        },
        {
            value: "retail",
            label: "유통업",
            subcategories: [
                { value: "clothing", label: "옷가게" },
                { value: "cosmetics", label: "화장품 가게" },
            ],
        },
        {
            value: "entertainment",
            label: "오락업",
            subcategories: [
                { value: "gaming", label: "게임방" },
                { value: "cinema", label: "영화관" },
            ],
        },
    ];

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

    const selectedCategoryData = categories.find((category) => category.value === selectedCategory);


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
                                    <option value="" disabled>
                                        지역을 선택하세요
                                    </option>
                                    {regions.map((region) => (
                                        <option key={region.value} value={region.value}>
                                            {region.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.selected_regions}>
                                {selectedRegions.map((region) => (
                                    <div key={region} className={styles.selected_tag}>
                                        <span>{region}</span>
                                        <button onClick={() => removeRegion(region)} className={styles.remove_btn}>
                                            ×
                                        </button>
                                    </div>
                                ))}
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
                        <button className={styles.button_01} onClick={() => navigate('/Analysing')}>분석 시작하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
