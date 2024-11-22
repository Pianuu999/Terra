import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '/images/logo_01.svg';
import { ResponsiveContainer, LineChart, CartesianGrid, Line, BarChart, Bar, XAxis, LabelList, PieChart, Pie, Legend, Cell, YAxis, Tooltip } from "recharts";
import sourceData from "../../Data/sourceData.json";
import styles from '../ResultGraph/Design.module.css';

const Design = () => {
    const [isExpanded, setIsExpanded] = useState(false); //card
    const [barData, setBarData] = useState([]);
    const navigate = useNavigate();

    const handleCardClick = () => setIsExpanded(prev => !prev);

    useEffect(() => {
        if (sourceData && sourceData.length > 0) {
            const formattedData = sourceData
                .map(item => ({
                    name: item.name,
                    uv: item.uv,
                    pv: item.pv,
                }))
                .sort((a, b) => b.uv - a.uv); // uv 값을 기준으로 내림차순 정렬
            setBarData(formattedData);
        }
    }, [sourceData]);

    const pieData = [
        { name: '여성', value: 5 },
        { name: '남성', value: 5 },
    ];

    const agePieData = [
        { name: '10대 ~ 20대', value: 5, color: '#71C1D8' },
        { name: '20대 ~ 30대', value: 2, color: '#51A2E7' },
        { name: '30대 ~ 40대', value: 3, color: '#A1F0C1' },
        { name: '40대 ~ 50대', value: 2, color: '#99B1A4' },
        { name: '50대 ~ 60대', value: 1, color: '#E0C060' },
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


    {/* 매출액 데이터 가져오는 곳 2021 ~ 2024*/ }
    const lineChartData = [
        { name: "2021", pv: 4000 },
        { name: "2022", pv: 3000 },
        { name: "2023", pv: 2000 },
        { name: "2024", pv: 2780 },
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
                        <h3 className={styles.activityText1}><span>강남구</span>의 추천 지역 Top 3</h3>
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

                    <div className={styles.jungbobogi1}>
                        <div className="bell_Text">
                            <h3 className={styles.activityText1}>해당 업종이 활성화된 곳</h3>
                        </div>
                        <div className={styles.circleResult}>
                            {["연남동", "신사동", "마곡동", "역삼동"].map((area, index) => (
                                <div className={styles.circles} key={index}><p>{area}</p></div>
                            ))}
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

                    {/* LineChart 추가 부분 */}
                    <div className={styles.jungbobogi2} style={{ marginTop: '20px' }}>
                        <h3 className={styles.activityText1}>해당 업종 연도별 매출액</h3>
                        <div className={styles.box1}>
                            <ResponsiveContainer width={330} height={300} style={{ marginTop: '26px', paddingRight: '20px' }}>
                                <LineChart data={lineChartData} fontSize={13}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line dataKey="pv" stroke="rgb(49, 130, 246)" name="매출액" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className={styles.jungbobogi2} style={{ alignItems: 'center' }}>
                        <h3 className={styles.activityText1}>해당 업종 결제 건수</h3>
                        <div className={styles.box3}>
                            <span className={styles.text4}> 67 <span style={{ color: 'black', fontSize: 26, alignContent: 'center', fontWeight: 500 }}>건</span></span>
                        </div>
                    </div>
                    <div className={styles.jungbobogi2} style={{ alignItems: 'center' }}>
                        <h3 className={styles.activityText1}>해당 업종 점포수</h3>
                        <div className={styles.box3}>
                            <span className={styles.text5}> 13 <span style={{ color: 'black', fontSize: 26, alignContent: 'center', fontWeight: 500 }}>개</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Design;
