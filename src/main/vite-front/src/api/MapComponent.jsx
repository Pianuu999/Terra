import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import areaJson from './seoul116_place1.json'; // 서울시 구역에 대한 GeoJSON 파일을 불러옵니다.

mapboxgl.accessToken = 'pk.eyJ1Ijoia2diNDg1NCIsImEiOiJjbTJ1NDlmZ2YwOWljMmtvaWltZjFlZXdkIn0.aLnwIt7wXc7ir6vjkogdnQ'; // Mapbox의 accessToken 설정

export default function MapComponent() {
    const mapContainer = useRef(null); // 지도 렌더링을 위한 ref
    const [populationData, setPopulationData] = useState({}); // 인구 밀도 및 혼잡도 데이터 상태 관리
    const [map, setMap] = useState(null); // 지도 객체 상태 관리
    const [popup, setPopup] = useState(null); // 팝업 객체 상태 관리
    const [isLoading, setIsLoading] = useState(true); // 로딩 화면 상태 관리
    const [updateTime, setUpdateTime] = useState(''); // 데이터 업데이트 시간 상태 관리

    // 인구 밀도 데이터를 API에서 가져오는 함수
    const fetchPopulationData = async () => {
        setIsLoading(true); // 데이터 로딩 시작
        console.log("Fetching population data...");

        const populationDensityData = {}; // 인구 밀도 데이터를 담을 객체
        const requests = areaJson.features.map((area) => {
            const url = `http://openapi.seoul.go.kr:8088/4b766c79436b67623632504c436862/xml/citydata_ppltn/1/5/${encodeURIComponent(area.properties.AREA_NM)}`;

            // API 요청을 보내고, XML 데이터를 파싱하여 인구 밀도와 혼잡도 정보를 추출합니다.
            return fetch(url)
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(data, 'application/xml');
                    const areaName = xml.getElementsByTagName('AREA_NM')[0]?.textContent;
                    const populationMin = xml.getElementsByTagName('AREA_PPLTN_MIN')[0]?.textContent;
                    const populationMax = xml.getElementsByTagName('AREA_PPLTN_MAX')[0]?.textContent;
                    const congestionLevel = xml.getElementsByTagName('AREA_CONGEST_LVL')[0]?.textContent;
                    populationDensityData[areaName] = { populationMin, populationMax };

                    // 인구 밀도와 혼잡도 정보를 상태에 저장
                    const ppltnTime = xml.getElementsByTagName('PPLTN_TIME')[0]?.textContent;
                    setUpdateTime(ppltnTime || 'Unknown time'); // 업데이트 시간 설정

                    // 혼잡도 수준 매핑: '붐빔' -> High, '약간 붐빔' -> MediumHigh 등
                    let congestion = '여유'; // 기본값 설정
                    if (congestionLevel === '붐빔') {
                        congestion = '붐빔';
                    } else if (congestionLevel === '약간 붐빔') {
                        congestion = '약간 붐빔';
                    } else if (congestionLevel === '보통') {
                        congestion = '보통';
                    } else if (congestionLevel === '여유') {
                        congestion = '여유';
                    }

                    populationDensityData[area.properties.AREA_NM] = {
                        populationMin: parseInt(populationMin) || 0,
                        populationMax: parseInt(populationMax) || 0,
                        congestionLevel: congestion, // 혼잡도 수준
                    };
                })
                .catch(error => {
                    console.error(`Error fetching data for ${area.properties.AREA_NM}:`, error);
                });
        });

        // 모든 요청이 끝날 때까지 기다림
        await Promise.all(requests);
        console.log("Finished fetching population data:", populationDensityData);
        setPopulationData(populationDensityData); // 데이터 상태 업데이트
        setIsLoading(false); // 로딩 완료
    };

    // 지도 초기화 (Mapbox)
    useEffect(() => {
        if (map) return; // 이미 지도 객체가 있을 경우 중복 초기화 방지

        // Mapbox GL을 사용하여 지도를 초기화
        const initializeMap = new mapboxgl.Map({
            container: mapContainer.current, // 지도 DOM 요소
            style: 'mapbox://styles/kgb4854/cm2xeuvps002q01oj8wpfham3', // 지도 스타일
            center: [126.978, 37.5665], // 초기 지도 중심 좌표 (서울)
            zoom: 11, // 초기 줌 레벨
            language: "ko" // 지도 언어 설정 (한국어)
        });

        // 지도 초기화 후 상태 업데이트
        initializeMap.on('load', () => {
            setMap(initializeMap);
        });

        // 컴포넌트가 unmount될 때 지도 객체를 제거
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [map]);

    useEffect(() => {
        if (!map) return;

        // 컴포넌트가 로드될 때 자동으로 인구 밀도 데이터를 가져옴
        fetchPopulationData();

        // 30분마다 데이터를 새로고침
        const interval = setInterval(fetchPopulationData, 30 * 60 * 1000); // 30분 주기

        // 컴포넌트가 unmount될 때 interval을 클리어
        return () => {
            clearInterval(interval);
        };
    }, [map]);

    // 데이터가 준비되면 지도에 3D 폴리곤 추가
    useEffect(() => {
        if (!map || Object.keys(populationData).length === 0) return; // 지도와 데이터가 없으면 종료

        // GeoJSON 데이터를 사용하여 각 지역의 폴리곤을 그리기 위한 데이터 생성
        const polygonData = {
            type: 'FeatureCollection',
            features: areaJson.features
                .map((area) => {
                    const density = populationData[area.properties.AREA_NM];
                    if (!density) return null; // 데이터가 없는 경우 null 반환

                    return {
                        type: 'Feature',
                        geometry: area.geometry,
                        properties: {
                            congestionLevel: density.congestionLevel, // 혼잡도 수준
                            populationMin: density.populationMin, // 최소 인구수
                            populationMax: density.populationMax, // 최대 인구수
                            AREA_NM: area.properties.AREA_NM, // 지역 이름
                        },
                    };
                })
                .filter(Boolean), // null을 제거하여 유효한 데이터만 반환
        };

        // 지도에 데이터가 없으면 소스를 추가하고, 데이터가 있으면 업데이트
        if (map.getSource('populationDensity')) {
            map.getSource('populationDensity').setData(polygonData);
        } else {
            map.addSource('populationDensity', {
                type: 'geojson',
                data: polygonData,
            });

            // 폴리곤을 3D로 표현하기 위한 레이어 추가
            map.addLayer({
                id: 'population-polygon',
                type: 'fill-extrusion', // 3D 폴리곤
                source: 'populationDensity',
                paint: {
                    'fill-extrusion-color': [
                        'match',
                        ['get', 'congestionLevel'],
                        '여유', 'green', // '여유'는 초록색
                        '보통', 'yellow', // '보통'은 노란색
                        '약간 붐빔', 'orange', // '약간 붐빔'은 주황색
                        '붐빔', 'red', // '붐빔'은 빨간색
                        'gray', // 기본 색상
                    ],
                    'fill-extrusion-height': [
                        'match',
                        ['get', 'congestionLevel'],
                        '여유', 30, // '여유'는 30m
                        '보통', 60, // '보통'은 60m
                        '약간 붐빔', 90, // '약간 붐빔'은 90m
                        '붐빔', 120, // '붐빔'은 120m
                        50, // 기본 높이
                    ],
                    'fill-extrusion-opacity': 0.3, // 폴리곤의 투명도
                },
            });
        }

        // 폴리곤을 클릭했을 때 팝업을 띄움
        map.on('click', 'population-polygon', (e) => {
            const { AREA_NM, populationMin, populationMax, congestionLevel } = e.features[0].properties;
            const coordinates = e.lngLat;
            // 팝업 내용을 설정
            const popupHtml = `
                <strong>${AREA_NM}</strong><br>
                최소 인구수: ${populationMin || 'N/A'}<br>
                최대 인구수: ${populationMax || 'N/A'}<br>
                혼잡도: ${congestionLevel}
            `;
            if (popup) popup.remove();
            const newPopup = new mapboxgl.Popup({ closeButton: true })
                .setLngLat(coordinates)
                .setHTML(popupHtml)
                .addTo(map);
            setPopup(newPopup); // 팝업 상태 업데이트
        });

        // 폴리곤에 마우스를 올렸을 때 커서 변경
        map.on('mouseenter', 'population-polygon', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'population-polygon', () => {
            map.getCanvas().style.cursor = '';
        });

        console.log("3D polygon data added to map");
    }, [map, populationData]);

    // 로딩 화면 스타일 정의
    // const loadingScreenStyle = {
    //     position: 'fixed',
    //     top: 0,
    //     left: 0,
    //     width: '100%',
    //     marginTop: '128px', 
    //     height: 'calc(100vh - 128px)',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#f0f8ff',
    //     fontSize: '1.5rem',
    //     color: '#333',
    //     zIndex: 900,
    // };

    // 범례 스타일 정의
    const legendStyle = {
        position: 'absolute',
        bottom: '40px',
        right: '10px',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    };

    // 범례 아이템 스타일
    const legendItemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    };

    // 범례 색상 박스 스타일
    const colorBoxStyle = (color) => ({
        width: '10px',
        height: '10px',
        backgroundColor: color,
        marginRight: '10px',
    });

    return (
        <div>
            {/* 로딩 화면 */}
            {/* {isLoading && <div style={loadingScreenStyle}>로딩중...</div>} */}

            {/* 지도 컨테이너 */}
            <div ref={mapContainer} style={{ marginTop: '128px', height: 'calc(100vh - 128px)' }} />

            {/* 범례 */}
            <div style={legendStyle}>
                <div style={legendItemStyle}>
                    <div style={colorBoxStyle('green')} />
                    <span>여유</span>
                </div>
                <div style={legendItemStyle}>
                    <div style={colorBoxStyle('yellow')} />
                    <span>보통</span>
                </div>
                <div style={legendItemStyle}>
                    <div style={colorBoxStyle('orange')} />
                    <span>약간 붐빔</span>
                </div>
                <div style={legendItemStyle}>
                    <div style={colorBoxStyle('red')} />
                    <span>붐빔</span>
                </div>
                {/* 업데이트 시간 표시 */}
                <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
                    <strong>업데이트 시간:</strong> {updateTime}
                </div>
            </div>
        </div>
    );
};