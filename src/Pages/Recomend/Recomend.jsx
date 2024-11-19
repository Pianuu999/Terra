import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import areaJson from './seoul80_place.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2diNDg1NCIsImEiOiJjbTJ1NDlmZ2YwOWljMmtvaWltZjFlZXdkIn0.aLnwIt7wXc7ir6vjkogdnQ';

const Mapcomponent1 = () => {
  const mapContainer = useRef(null);
  const [selectedAreaData, setSelectedAreaData] = useState(null);
  const [populationData, setPopulationData] = useState({});
  const [commercialData, setCommercialData] = useState({});
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTime, setUpdateTime] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false); // 패널 열림 상태 관리
  const [isFullScreen, setIsFullScreen] = useState(false); // 전체 화면 상태 관리

  const fetchPopulationAndCommercialData = async () => {
    setIsLoading(true);
    const populationDensityData = {};
    const commercialActivityData = {};

    const requests = areaJson.features.map((area) => {
      const url = `http://openapi.seoul.go.kr:8088/71516965496b6f6f3636515a765047/xml/citydata_cmrcl/1/5/${encodeURIComponent(area.properties.AREA_NM)}`;

      return fetch(url)
        .then((response) => response.text())
        .then((data) => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(data, 'application/xml');

          const areaName = xml.getElementsByTagName('AREA_NM')[0]?.textContent;
          const populationMin = xml.getElementsByTagName('AREA_PPLTN_MIN')[0]?.textContent;
          const populationMax = xml.getElementsByTagName('AREA_PPLTN_MAX')[0]?.textContent;
          const congestionLevel = xml.getElementsByTagName('AREA_CONGEST_LVL')[0]?.textContent;

          populationDensityData[areaName] = {
            populationMin: parseInt(populationMin) || 0,
            populationMax: parseInt(populationMax) || 0,
            congestionLevel: congestionLevel || 'N/A',
          };

          const commercialLevel = xml.getElementsByTagName('AREA_CMRCL_LVL')[0]?.textContent;
          const paymentCount = xml.getElementsByTagName('AREA_SH_PAYMENT_CNT')[0]?.textContent;
          const paymentMin = xml.getElementsByTagName('AREA_SH_PAYMENT_AMT_MIN')[0]?.textContent;
          const paymentMax = xml.getElementsByTagName('AREA_SH_PAYMENT_AMT_MAX')[0]?.textContent;

          commercialActivityData[areaName] = {
            commercialLevel: commercialLevel || 'N/A',
            paymentCount: parseInt(paymentCount) || 0,
            paymentMin: parseInt(paymentMin) || 0,
            paymentMax: parseInt(paymentMax) || 0,
          };
        })
        .catch((error) => {
          console.error(`Error fetching data for ${area.properties.AREA_NM}:`, error);
        });
    });

    await Promise.all(requests);

    setPopulationData(populationDensityData);
    setCommercialData(commercialActivityData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!map) {
      const initializeMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/kgb4854/cm2xeuvps002q01oj8wpfham3',
        center: [126.978, 37.5665],
        zoom: 11,
        language: 'ko'
      });

      initializeMap.on('load', () => {
        setMap(initializeMap);
      });

      return () => {
        if (map) map.remove();
      };
    }
  }, [map]);

  useEffect(() => {
    if (!map) return;
    fetchPopulationAndCommercialData();

    const interval = setInterval(fetchPopulationAndCommercialData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [map]);

  useEffect(() => {
    if (!map || Object.keys(populationData).length === 0 || Object.keys(commercialData).length === 0) return;

    const polygonData = {
      type: 'FeatureCollection',
      features: areaJson.features.map((area) => {
        const popData = populationData[area.properties.AREA_NM];
        const commData = commercialData[area.properties.AREA_NM];

        if (!popData || !commData) return null;

        return {
          type: 'Feature',
          geometry: area.geometry,
          properties: {
            ...popData,
            ...commData,
            AREA_NM: area.properties.AREA_NM,
          },
        };
      }).filter(Boolean),
    };

    if (map.getSource('populationDensity')) {
      map.getSource('populationDensity').setData(polygonData);
    } else {
      map.addSource('populationDensity', { type: 'geojson', data: polygonData });

      map.addLayer({
        id: 'population-polygon',
        type: 'fill-extrusion',
        source: 'populationDensity',
        paint: {
          'fill-extrusion-color': [
            'match',
            ['get', 'commercialLevel'],
            '바쁜', 'red',      // '바쁜'은 빨간색
            '분주한', 'orange', // '분주한'은 오렌지색
            '보통', 'yellow',   // '보통'은 노란색
            '한산한', 'green',  // '한산한'은 초록색
            'gray',             // 그 외는 회색
          ],
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['get', 'paymentCount'], 0, 0, 500, 100,
          ],
          'fill-extrusion-opacity': 0.5,
        },
      });
    }

   // 구역 클릭 이벤트
  map.on('click', 'population-polygon', (e) => {
    const properties = e.features[0].properties;

    // 색깔이 칠해진 구역인지 확인 (예: commercialLevel 유무 확인)
    if (properties.commercialLevel) {
      setSelectedAreaData({
        AREA_NM: properties.AREA_NM,
        commercialLevel: properties.commercialLevel,
        paymentCount: properties.paymentCount,
        paymentMin: properties.paymentMin,
        paymentMax: properties.paymentMax,
      });
      setIsPanelOpen(true); // 패널 열기
    } else {
      setSelectedAreaData(null);
      setIsPanelOpen(false); // 패널 닫기
    }
  });

  // 지도 전체 클릭 이벤트 (구역 외부 클릭 처리)
  map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point, { layers: ['population-polygon'] });

    if (features.length === 0) {
      setSelectedAreaData(null);
      setIsPanelOpen(false); // 패널 닫기
    }
  });
}, [map, populationData, commercialData]);

  // 슬라이드 업 패널 스타일
  const panelStyle = {
    position: 'fixed',
    bottom: isFullScreen ? '0' : '0', // 전체 화면 모드에서는 하단 고정
    left: 0,
    right: 0,
    height: isFullScreen ? '95vh' : '30vh', // 전체 화면일 경우 화면을 다 덮게 설정
    backgroundColor: 'white',
    transition: 'height 0.3s ease-in-out',
    zIndex: 1000,
    overflowY: 'auto',
    padding: '20px',
    borderRadius: isFullScreen ? '20px 20px 0 0' : '20px 20px 0 0', // 모서리를 둥글게 설정
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div ref={mapContainer} style={{ height: '100vh' }} />
      {isPanelOpen && (
        <>
          <button
            onClick={toggleFullScreen}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px 20px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              zIndex: 2000,
            }}
          >
            {isFullScreen ? '축소' : '전체 화면'}
          </button>

          <div style={panelStyle}>
            <h3>{selectedAreaData.AREA_NM}</h3>
            <p>상업 활동 수준: {selectedAreaData.commercialLevel}</p>
            <p>결제 건수: {selectedAreaData.paymentCount}</p>
            <p>최소 결제액: {selectedAreaData.paymentMin}</p>
            <p>최대 결제액: {selectedAreaData.paymentMax}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Mapcomponent1;
