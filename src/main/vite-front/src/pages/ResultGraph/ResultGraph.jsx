import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer, PieChart, Pie, Legend, Cell } from 'recharts';
import '../ResultGraph/ResultGraph.css';
import lightIcon from '../../Assets/Image/icon-bulb-2.png';
import bellIcon from '../../Assets/Image/icon-alarm-3.png';

const ResultGraph = () => {
  const [barData, setBarData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // API 호출로 데이터 가져오기 (예시)
    const fetchData = async () => {
      try {
        const response = await fetch('/api/terra/recommendations'); // API 엔드포인트에 맞게 수정
        const data = await response.json();
        // API에서 받은 데이터를 바 차트 데이터 형식으로 변환
        const formattedData = data.map(item => ({
          name: item.administrativeDong, // 행정동 이름
          uv: item.score, // 점수 또는 다른 데이터
          pv: item.thsmon_selng_co // 월 매출
        })).sort((a, b) => b.uv - a.uv); // uv 값을 기준으로 내림차순 정렬
        setBarData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const goHome = () => {
    navigate('/home'); // 홈으로 돌아가기
  };

  // 성별 소비 데이터
  const pieData = [
    { name: '여성', value: 5 },
    { name: '남성', value: 5 },
  ];

  // 연령별 소비 데이터
  const agePieData = [
    { name: '10대 ~ 20대', value: 5, color: '#FFBB28' },
    { name: '20대 ~ 30대', value: 2, color: '#FF8042' },
    { name: '30대 ~ 40대', value: 3, color: '#0088FE' },
    { name: '40대 ~ 50대', value: 2, color: '#00C49F' },
    { name: '50대 ~ 60대', value: 1, color: '#BA4C9D' },
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
  };

  return (
      <div className="resultGraph_container">
        <div className="backIcon" onClick={goHome}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.75 15H6.25M6.25 15L15 23.75M6.25 15L15 6.25" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="resultGraph_wrapper">
          <h3 className="result_text">상세 분석 결과</h3>
          <div className="graph_stick1_container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                <Bar dataKey="uv" fill="#3182F6">
                  <LabelList dataKey="pv" position="top" style={{ fontSize: 14, fontWeight: 'bold', fill: 'black' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="jungbobogi1">
            <div className="bell_Text">
              <img src={bellIcon} style={{ width: 25, height: 25, marginTop: 13 }} alt="bell icon" />
              <h3 className="activityText1">해당 업종이 활성화된 곳</h3>
            </div>
            <div className="circleResult">
              {/* 여기에 활성화된 곳 이름을 동적으로 표시할 수 있습니다 */}
              <div className="circles"><p>연남동</p></div>
              <div className="circles"><p>신사동</p></div>
              <div className="circles"><p>마곡동</p></div>
              <div className="circles"><p>역삼동</p></div>
            </div>
          </div>
          <div className="jungbobogi2">
            <div className="bell_Text">
              <img src={lightIcon} style={{ width: 25, height: 25, marginTop: 13 }} alt="light icon" />
              <h3 className="activityText1">해당 지역 소비집계</h3>
            </div>
            <div className="ageBox">
              <p className="minitext1">&lt; 성별 별 소비 &gt;</p>
              <div className="pieChart">
                <ResponsiveContainer>
                  <PieChart>
                    <Legend layout="vertical" verticalAlign="top" align="top" />
                    <Pie data={pieData} cx="50%" cy="50%" label={renderCustomizedLabel} outerRadius={120} dataKey="value">
                      {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="genderBox">
              <p className="minitext1">&lt; 연령별 소비 &gt;</p>
              <div className="pieChart">
                <ResponsiveContainer>
                  <PieChart>
                    <Legend layout="vertical" verticalAlign="top" align="top" />
                    <Pie data={agePieData} cx="50%" cy="50%" label={renderCustomizedLabel} outerRadius={120} dataKey="value">
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
      </div>
  );
};

export default ResultGraph;
