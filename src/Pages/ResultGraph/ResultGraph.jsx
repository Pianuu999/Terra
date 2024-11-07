import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer } from 'recharts'; // Add LabelList import
import sourceData from "../../Data/sourceData.json"; // 데이터 소스
import '../ResultGraph/ResultGraph.css';

const ResultGraph = () => {
  const [data, setData] = useState([]);

  // 데이터가 로드될 때, sourceData.json에서 필요한 데이터를 가져와서 변환
  useEffect(() => {
    // sourceData의 데이터를 적절한 형식으로 변환하여 상태로 설정
    if (sourceData && sourceData.length > 0) {
      const formattedData = sourceData.map(item => ({
        name: item.name,
        uv: item.uv,
        pv: item.pv
      }));
      setData(formattedData);
    }
  }, []);

  return (
    <div className="resultGraph_wrapper">
      <h3 className="result_text">고객님에게 최적화된 정보입니다.</h3>
     
      <div className="graph_stick1_container"> {/* 그래프를 그릴 요소 */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* x축에 name 표시 */}
            <XAxis 
              dataKey="name"
              tick={{ fontSize: 24, fontFamily: "Pretendard Variable", fontWeight: 'normal'}}
              tickLine={false} 
            />
            {/* 막대 위에 표시할 정보 */}
            <Bar dataKey="uv" fill="#3182F6">
              <LabelList 
                dataKey="pv"  
                position="top" 
                style={{ fontSize: 14, fontWeight: 'bold', fill: 'black' }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="jungbobogi1">
      </div>
      <div className="jungbobogi2">
      </div>
    </div>
  );
};

export default ResultGraph;
