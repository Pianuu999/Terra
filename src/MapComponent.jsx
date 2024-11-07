import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import areaJson from './seoul116_place1.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2diNDg1NCIsImEiOiJjbTJ1NDlmZ2YwOWljMmtvaWltZjFlZXdkIn0.aLnwIt7wXc7ir6vjkogdnQ';

const Mapcomponent1 = () => {
  const mapContainer = useRef(null);
  const [populationData, setPopulationData] = useState({});
  const [map, setMap] = useState(null);

  // API에서 인구 밀도 데이터 가져오기
  const fetchPopulationData = async () => {
    console.log("Fetching population data...");

    const populationDensityData = {};
    const requests = areaJson.features.map((area) => {
      const url = `http://openapi.seoul.go.kr:8088/4b766c79436b67623632504c436862/xml/citydata_ppltn/1/5/${encodeURIComponent(area.properties.AREA_NM)}`;

      return fetch(url)
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(data, 'application/xml');

          const populationMin = xml.getElementsByTagName('AREA_PPLTN_MIN')[0]?.textContent;
          const populationMax = xml.getElementsByTagName('AREA_PPLTN_MAX')[0]?.textContent;
          const congestionLevel = xml.getElementsByTagName('AREA_CONGEST_LVL')[0]?.textContent;

          // 혼잡도 데이터를 "여유", "보통", "약간 붐빔", "붐빔"으로 매핑
          let congestion = 'Low'; // 기본값 설정
          if (congestionLevel === '붐빔') {
            congestion = 'High';  // '붐빔' -> High
          } else if (congestionLevel === '약간 붐빔') {
            congestion = 'MediumHigh'; // '약간 붐빔' -> MediumHigh
          } else if (congestionLevel === '보통') {
            congestion = 'Medium'; // '보통' -> Medium
          } else if (congestionLevel === '여유') {
            congestion = 'Low';   // '여유' -> Low
          }

          populationDensityData[area.properties.AREA_NM] = {
            populationMin: parseInt(populationMin) || 0,
            populationMax: parseInt(populationMax) || 0,
            congestionLevel: congestion, // 혼잡도 수준 저장
          };
        })
        .catch(error => {
          console.error(`Error fetching data for ${area.properties.AREA_NM}:`, error);
        });
    });

    await Promise.all(requests); // 모든 요청이 완료될 때까지 기다림
    console.log("Finished fetching population data:", populationDensityData);
    setPopulationData(populationDensityData);
  };

  // Mapbox 초기화
  useEffect(() => {
    if (map) return;

    const initializeMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/kgb4854/cm2xeuvps002q01oj8wpfham3',
      center: [126.978, 37.5665],
      zoom: 11,
      language: "ko"
    });

    initializeMap.on('load', () => {
      setMap(initializeMap);
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;

    // 자동으로 인구 밀도 데이터 가져오기
    fetchPopulationData();

    // 30분마다 데이터 새로고침
    const interval = setInterval(fetchPopulationData, 30 * 60 * 1000); // 30 minutes interval

    return () => {
      clearInterval(interval); // component unmount 시 interval 클리어
    };
  }, [map]);

  useEffect(() => {
    if (!map || Object.keys(populationData).length === 0) return;

    // populationData에 있는 구역만 필터링하여 폴리곤 레이어 데이터 생성
    const polygonData = {
      type: 'FeatureCollection',
      features: areaJson.features
        .map((area) => {
          const density = populationData[area.properties.AREA_NM];
          if (!density) return null;

          return {
            type: 'Feature',
            geometry: area.geometry,
            properties: {
              congestionLevel: density.congestionLevel, // 혼잡도 수준
            },
          };
        })
        .filter(Boolean), // null 값을 제거하여 유효한 데이터만 남김
    };

    // 기존에 데이터가 없으면 소스를 추가하고, 데이터가 있으면 업데이트
    if (map.getSource('populationDensity')) {
      map.getSource('populationDensity').setData(polygonData);
    } else {
      map.addSource('populationDensity', {
        type: 'geojson',
        data: polygonData,
      });

      map.addLayer({
        id: 'population-polygon',
        type: 'fill-extrusion',  // 3D 표현을 위해 'fill-extrusion' 사용
        source: 'populationDensity',
        paint: {
          'fill-extrusion-color': [
            'match',
            ['get', 'congestionLevel'],
            'Low', 'green',        // 혼잡도 Low - 초록색
            'Medium', 'yellow',    // 혼잡도 Medium - 노란색
            'MediumHigh', 'orange',// 혼잡도 MediumHigh - 주황색
            'High', 'red',         // 혼잡도 High - 빨간색
            'gray',                // 기본 색상 (혼잡도가 없거나 다른 값일 경우)
          ],
          'fill-extrusion-height': [
            'match',
            ['get', 'congestionLevel'],
            'Low', 30,            // 'Low' - 30m
            'Medium', 60,         // 'Medium' - 60m
            'MediumHigh', 90,     // 'MediumHigh' - 90m
            'High', 120,          // 'High' - 120m
            50,                   // 기본 높이 (혼잡도가 없거나 다른 값일 경우)
          ],
          'fill-extrusion-opacity': 0.3,
        },
      });
    }

    console.log("3D polygon data added to map");
  }, [map, populationData]);

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
};

export default Mapcomponent1;
