import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import logo from '/images/logo_01.svg';
import { ResponsiveContainer, LineChart, CartesianGrid, Line, BarChart, Bar, XAxis, LabelList, PieChart, Pie, Legend, Cell, YAxis, Tooltip } from "recharts";
import styles from '../ResultGraph/Design.module.css';

const Design = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [agePieData, setAgePieData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [totalSalesCount, setTotalSalesCount] = useState(0);  // 매출 건수를 관리할 상태 추가
    const [totalStoreCount, setTotalStoreCount] = useState(0);  // 점포 수를 관리할 상태 추가
    const navigate = useNavigate();

    const location = useLocation();
    const { selectedRegions, selectedCategory, selectedSubCategory, recommendations } = location.state || {};

    const handleCardClick = () => setIsExpanded(prev => !prev);

    useEffect(() => {
        if (recommendations && recommendations.length > 0) {
            // 행정동별 추천 데이터 처리
            const formattedBarData = recommendations.map(item => ({
                name: item.administrativeDistrictName,
                uv: item.totalScore,  // 예시로 총점수를 uv로 사용
                pv: item.salesCount    // 예시로 매출건수 등
            }));

            const formattedPieData = recommendations.map(item => ({
                name: item.administrativeDistrictName,
                male: item.maleSalesCount,  // 남성 매출
                female: item.femaleSalesCount,  // 여성 매출
            }));

            const formattedAgePieData = recommendations.map(item => ({
                name: item.administrativeDistrictName,
                ageGroups: item.ageGroupSales  // 연령대별 매출
            }));

            const formattedLineChartData = recommendations.map(item => ({
                name: item.administrativeDistrictName,
                pv: item.annualSales   // 연도별 매출 데이터
            }));

            // 매출 건수와 점포 수 계산 (전체 합산)
            const totalSales = recommendations.reduce((sum, item) => sum + item.salesCount, 0);
            const totalStores = recommendations.reduce((sum, item) => sum + item.storeCount, 0); // 점포수 계산

            setBarData(formattedBarData);
            setPieData(formattedPieData);
            setAgePieData(formattedAgePieData);
            setLineChartData(formattedLineChartData);
            setTotalSalesCount(totalSales);  // 매출 건수 상태 업데이트
            setTotalStoreCount(totalStores);  // 점포 수 상태 업데이트
        }
    }, [recommendations]);

    const RADIAN = Math.PI / 180;
    
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.background}>
                <div className={styles.logo} onClick={() => navigate('/home')}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className={styles.text_container}>
                    <h3 className={styles.text1}>신뢰할 수 있는 데이터들로</h3>
                    <h3 className={styles.text2}>분석해 보았어요.</h3>
                </div>
            </div>

            <div className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}>
                <div className={styles.toggler}>
                    <svg onClick={handleCardClick} width="71" height="8" viewBox="0 0 71 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="71" height="8" rx="4" fill="#D9D9D9" />
                    </svg>
                </div>
                <div className={styles.cardContent}>
                    <h3 className={styles.result_text}>상세 분석 결과</h3>
                    <div className={styles.profile}>
                        <div className={styles.profileTextContainer}>
                            <h3 className={styles.profileText}> 최근 3개월간의 자료를 바탕으로 추출된 결과입니다.</h3>
                        </div>
                    </div>

                    <div className={styles.jungbobogi0}>
                        <h3 className={styles.activityText1}><span>{selectedRegions ? selectedRegions.join(", ") : "강남구"}</span>의 추천 지역 Top 3</h3>
                        <div className={styles.box}>
                            <ResponsiveContainer width="67%" height={270}>
                                <BarChart data={barData} margin={{ top: 30 }}>
                                    <XAxis dataKey="name" tick={{ fontSize: 21, fontFamily: "Pretendard Variable", fontWeight: 500 }} tickLine={false} />
                                    <Bar dataKey="uv" fill="#3182F6">
                                        <LabelList dataKey="pv" position="top" style={{ fontSize: 14, fontWeight: 'bold', fill: 'black' }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className={styles.jungbobogi2}>
                        <div className={styles.bell_Text}>
                            <h3 className={styles.activityText1}>해당 지역 소비집계</h3>
                        </div>
                        <div className={styles.box2}>
                            <div className="genderBox" style={{ width: "100%" }}>
                                <p className="minitext1"> 성별 별 소비 </p>
                                <div className="pieChart" style={{ width: "100%" }}>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <PieChart fontSize={20}>
                                            <Legend layout="vertical" verticalAlign="top" align="top" />
                                            <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={120} fill="#71C1D8" dataKey="male">
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={index === 0 ? "#ffafcc" : "#a2d2ff"} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="ageBox" style={{ width: "100%" }}>
                                <p className="minitext1"> 연령별 소비 </p>
                                <div className="pieChart">
                                    <ResponsiveContainer width="100%" height={400}>
                                        <PieChart fontSize={20}>
                                            <Legend layout="vertical" verticalAlign="top" align="top" />
                                            <Pie data={agePieData} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={120} fill="#8884d8" dataKey="value">
                                                {agePieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.jungbobogi2} style={{ alignItems: 'center' }}>
                        <h3 className={styles.activityText1}>해당 업종 결제 건수</h3>
                        <div className={styles.box3}>
                            <span className={styles.text4}> {totalSalesCount} <span style={{ color: 'black', fontSize: 26, fontWeight: 500 }}>건</span></span>
                        </div>
                    </div>

                    <div className={styles.jungbobogi2} style={{ alignItems: 'center' }}>
                        <h3 className={styles.activityText1}>해당 업종 점포수</h3>
                        <div className={styles.box3}>
                            <span className={styles.text5}> {totalStoreCount} <span style={{ color: 'black', fontSize: 26, fontWeight: 500 }}>개</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Design;
