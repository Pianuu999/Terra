import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '/images/logo_01.svg';
import { ResponsiveContainer, LineChart, CartesianGrid, Line, BarChart, Bar, XAxis, LabelList, PieChart, Pie, Legend, Cell, YAxis, Tooltip } from "recharts";
import sourceData from "../../Data/sourceData.json";
import styles from '../ResultGraph/Design.module.css';

const Design = () => {
    const [isExpanded, setIsExpanded] = useState(false); // card
    const navigate = useNavigate();

    const location = useLocation();

    const { selectedRegions, selectedCategory, selectedSubCategory, recommendations } = location.state || {};  // 전달된 state 객체
    console.log(recommendations);

    const [barData, setBarData] = useState([]);

    const useData = recommendations[0];

    useEffect(() => {
        if (recommendations && Array.isArray(recommendations)) {
            // selectedRegions이 배열이라면 각 항목을 매핑하여 필요한 데이터를 추출
            const formattedData = recommendations.map((region, index) => ({
                name: region.administrativeDistrictName,  // 구 이름
                uv: index === 0 ? 200 : index === 1 ? 150 : 100,  // 3개 항목에 대해 각기 다른 uv 값 지정
            }));

            // 바 차트 데이터 상태 업데이트
            setBarData(formattedData);
        }
    }, [recommendations]);  // selectedRegions이 변경될 때마다 useEffect 실행

    const handleCardClick = () => setIsExpanded(prev => !prev);

    const pieData = [
        { name: '여성', value: useData.femaleSalesCount },
        { name: '남성', value: useData.maleSalesCount }
    ];

    const agePieData = [
        { name: '10대', value: useData.salesAge10, color: '#71C1D8' },
        { name: '20대', value: useData.salesAge20, color: '#51A2E7' },
        { name: '30대', value: useData.salesAge30, color: '#A1F0C1' },
        { name: '40대', value: useData.salesAge40, color: '#99B1A4' },
        { name: '50대', value: useData.salesAge50, color: '#E0C060' },
        { name: '60대', value: useData.salesAge60, color: '#E0C060' },
    ];

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

    const lineChartData = [
        { name: "2021", pv: 621000000 },
        { name: "2022", pv: 521780000 },
        { name: "2023", pv: useData.data20232},
        { name: "2024", pv: useData.data20242},
    ];

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

            <div className={`${styles.card} ${isExpanded ? styles.expanded : ""}`} onClick={handleCardClick}>
                <div className={styles.toggler}>
                    <svg width="71" height="8" viewBox="0 0 71 8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            <h3 className={styles.activityText1}><span style={{color: '#fca481', fontWeight: 800}}>{selectedRegions}</span>의 추천 지역 Top 3</h3>
                            <div className={styles.box}>
                                <ResponsiveContainer width="100%" height={270}>
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
                                                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={120} fill="#71C1D8" dataKey="value">
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
                        <div className={styles.jungbobogi2} style={{ marginTop: '20px' }}>
                            <h3 className={styles.activityText1}>해당 업종 연도별 매출액</h3>
                            <div className={styles.box1}>
                                <ResponsiveContainer width="100%" height={300} style={{ marginTop: '26px', paddingRight: '20px' }}>
                                    <LineChart data={lineChartData} fontSize={13}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis fontSize={10} fontWeight={600}/>
                                        <Tooltip />
                                        <Line dataKey="pv" stroke="rgb(49, 130, 246)" name="매출액" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className={styles.jungbobogi2} style={{ alignItems: 'center' }}>
                            <h3 className={styles.activityText1}>해당 업종 결제 건수</h3>
                            <div className={styles.box3}>
                                <span className={styles.text4}> {Math.floor(useData.avgSales)} <span style={{ color: 'black', fontSize: 26, alignContent: 'center', fontWeight: 500 }}>건</span></span>
                            </div>
                        </div>
                        <div className={styles.jungbobogi2} style={{ alignItems: 'center' }}>
                            <h3 className={styles.activityText1}><sapn style={{color: '#fca481'}}>{useData.serviceIndustryCodeName}</sapn> 점포수</h3>
                            <div className={styles.box3}>
                                <span className={styles.text5}> {useData.similarIndustryStoreCount} <span style={{ color: 'black', fontSize: 26, alignContent: 'center', fontWeight: 500 }}>개</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    );
};

export default Design;
