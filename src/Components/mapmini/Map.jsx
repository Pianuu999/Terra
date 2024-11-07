import React, { useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2diNDg1NCIsImEiOiJjbTJ3djA1aWwwM2E3MnFwaG01ZHdjdnY4In0.bAzZr4Rw_6EVo0auRt7ubQ'; // 여기에 Mapbox 토큰을 입력하세요

// MapComponent 함수형 컴포넌트 정의
const MapComponent = () => {
    // mapContainer는 지도 DOM 요소를 참조하기 위한 Ref
    const mapContainer = useRef(null);
    // Mapbox 스타일을 관리하기 위한 상태, 초기값으로 지정한 스타일 사용
    const [mapStyle] = useState('mapbox://styles/kgb4854/cm2xeuvps002q01oj8wpfham3');
  
    useEffect(() => {
      // Mapbox GL JS로 새로운 지도 인스턴스 생성
      const map = new mapboxgl.Map({
        container: mapContainer.current, // 지도가 렌더링될 DOM 요소
        style: mapStyle, // 기본 지도 스타일
        center: [126.978, 37.5665], // 서울의 위도, 경도
        zoom: 10, // 초기 확대 비율 (3D 지형이 잘 보이도록 설정)
        pitch: 45, // 지도 기울기 설정 (3D 효과를 위해)
        bearing: -17.6, // 지도 방향 설정
        language: 'ko' // 지도 언어를 한국어로 설정
      });
  
      // 스타일이 로드될 때의 이벤트 핸들러
      map.on('style.load', () => {
        map.setStyle(mapStyle); // 지정된 스타일을 지도에 적용
      });
  
      // 지도가 로드된 후의 이벤트 핸들러
      map.on('load', () => {
        // 3D 지형을 추가하기 위한 데이터 소스 추가
        map.addSource('mapbox-dem', {
          type: 'raster-dem', // DEM(디지털 표고 모델) 데이터 타입
          tileSize: 512, // 타일 크기 설정
          maxzoom: 14 // 최대 확대 레벨 설정
        });
        // 지형 설정 (소스와 강조 정도 지정)
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 }); // 지형의 높이를 1.5배 강조
  
        // 3D 건물 레이어 추가
        map.addLayer({
          'id': '3d-buildings', // 레이어 ID
          'source': 'composite', // 데이터 소스
          'source-layer': 'building', // 건물 데이터 소스 레이어
          'filter': ['==', 'extrude', 'true'], // 건물 레이어 필터 설정 (extrude 속성이 true인 경우에만 렌더링)
          'type': 'fill-extrusion', // 레이어 타입 설정 (채우기 외부 레이어)
          'minzoom': 15, // 최소 확대 레벨 설정
          'paint': {
            'fill-extrusion-color': '#aaa', // 건물 색상 설정
            'fill-extrusion-height': [ // 건물 높이 설정
              'interpolate', ['linear'], ['zoom'], // 확대 수준에 따른 높이 보간
              15, 0, // 확대 레벨 15에서 높이 0
              15.05, ['get', 'height'] // 확대 레벨 15.05에서 높이를 데이터에서 가져옴
            ],
            'fill-extrusion-base': [ // 건물 바닥 높이 설정
              'interpolate', ['linear'], ['zoom'], // 확대 수준에 따른 바닥 높이 보간
              15, 0, // 확대 레벨 15에서 바닥 높이 0
              15.05, ['get', 'min_height'] // 확대 레벨 15.05에서 최소 높이를 데이터에서 가져옴
            ],
            'fill-extrusion-opacity': 0.6 // 건물 투명도 설정
          }
        });
      });
  
      // 컴포넌트가 해제될 때 지도를 제거
      return () => {
        map.remove(); // 메모리 누수를 방지하기 위해 지도 인스턴스 제거
      };
    }, [mapStyle]); // mapStyle이 변경될 때마다 useEffect 재실행
    
    // 컴포넌트의 렌더링: 전체 화면을 지도 요소로 채움
    return <div ref={mapContainer} style={{ width: '328px', height: '402px', borderRadius: '12px' }} />;
  };
  
  // MapComponent 컴포넌트 내보내기
  export default MapComponent;
  