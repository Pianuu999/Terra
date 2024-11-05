import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2diNDg1NCIsImEiOiJjbTJ3djA1aWwwM2E3MnFwaG01ZHdjdnY4In0.bAzZr4Rw_6EVo0auRt7ubQ';

const MapComponent = () => {
    const mapContainer = useRef(null);
    const [mapStyle] = useState('mapbox://styles/kgb4854/cm2xeuvps002q01oj8wpfham3');

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center: [126.978, 37.5665], // 서울의 위도, 경도
            zoom: 12, // 초기 줌 레벨
            pitch: 0, // 기울기
            bearing: 0, // 방향
            language: 'ko'
        });

        // 서울시 경계 설정 (좌표는 서울시의 대략적인 경계값을 사용)
        const bounds = [
            [126.7, 37.4], // 남서쪽 모서리 (경도, 위도)
            [127.2, 37.7]  // 북동쪽 모서리 (경도, 위도)
        ];

        // 초기 로드 시 경계를 설정하여 서울만 보이도록 함
        map.on('style.load', () => {
            map.setMaxBounds(bounds); // 맵의 경계 설정
            map.setStyle(mapStyle); // 스타일 설정
        });

        map.on('load', () => {
            // 3D 지형을 추가하기 위한 데이터 소스 추가
            map.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14
            });
            map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

            // 3D 건물 레이어 추가
            map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',
                    'fill-extrusion-height': [
                        'interpolate', ['linear'], ['zoom'],
                        15, 0,
                        15.05, ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate', ['linear'], ['zoom'],
                        15, 0,
                        15.05, ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            });
        });

        return () => {
            map.remove();
        };
    }, [mapStyle]);

    return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
