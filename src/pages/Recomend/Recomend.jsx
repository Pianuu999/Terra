import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import areaJson from '../../Data/seoul80_place.json';
import styles from '../../Pages/Recomend/Recomend.module.css';
import graBar from '/images/gradationBar.svg'
import graBar2 from '/images/graBar2.svg';
import NavBar from '../../components/NavBar/NavBar';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2diNDg1NCIsImEiOiJjbTJ1NDlmZ2YwOWljMmtvaWltZjFlZXdkIn0.aLnwIt7wXc7ir6vjkogdnQ';

const Recomend = () => {
  const mapContainer = useRef(null);
  const [selectedAreaData, setSelectedAreaData] = useState(null);
  const [populationData, setPopulationData] = useState({});
  const [commercialData, setCommercialData] = useState({});
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTime, setUpdateTime] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
        zoom: 12,
        language: 'ko',
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
      features: areaJson.features
        .map((area) => {
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
        })
        .filter(Boolean),
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
            '바쁜',
            'red',
            '분주한',
            'orange',
            '보통',
            'yellow',
            '한산한',
            'green',
            'gray',
          ],
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['get', 'paymentCount'],
            0,
            0,
            500,
            100,
          ],
          'fill-extrusion-opacity': 0.5,
        },
      });
    }

    map.on('click', 'population-polygon', (e) => {
      const properties = e.features[0].properties;

      if (properties.commercialLevel) {
        setSelectedAreaData({
          AREA_NM: properties.AREA_NM,
          commercialLevel: properties.commercialLevel,
          paymentCount: properties.paymentCount,
          paymentMin: properties.paymentMin,
          paymentMax: properties.paymentMax,
        });
        setIsPanelOpen(true);
      } else {
        setSelectedAreaData(null);
        setIsPanelOpen(false);
      }
    });

    map.on('click', (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['population-polygon'] });

      if (features.length === 0) {
        setSelectedAreaData(null);
        setIsPanelOpen(false);
      }
    });
  }, [map, populationData, commercialData]);

  const panelStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: isFullScreen ? '100vh' : '30vh',
    backgroundColor: isFullScreen ? '#ffffff' : 'white',
    transition: 'height 0.3s ease-in-out, background-color 0.3s ease-in-out',
    zIndex: 1000,
    overflowY: 'auto',
    padding: '20px',
    borderRadius: isFullScreen ? '0' : '23px 23px 0 0',
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div>
      <NavBar />
      <div style={{ position: 'relative' }}>
        <div ref={mapContainer} style={{ height: '100vh' }} />
        {isPanelOpen && (
          <div
            style={panelStyle}
            onClick={toggleFullScreen} // 클릭 시 전체 화면 전환
          >
            <div className={styles.toggle}>
              <svg width="71" height="8" viewBox="0 0 71 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="71" height="8" rx="4" fill="#D9D9D9" />
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardName}>{selectedAreaData.AREA_NM}</h3>
              <div className={styles.back}>
                <div className={styles.box}>
                  <div className={styles.industryContainer}>
                    <div className={styles.industryText}>
                      <p className={styles.title}> 상업 활동 수준 :</p>
                      <p className={styles.title}>{selectedAreaData.commercialLevel}</p>
                    </div>
                    <img src={graBar2} className={styles.graBar} />
                  </div>
                </div>
                <div className={styles.box}>
                  <p className={styles.title}>결제 건수 :
                    <span className={styles.text2}>{selectedAreaData.paymentCount} <span style={{ color: 'black', fontSize: 26, alignContent: 'center', fontWeight: 500 }}>건</span></span>
                  </p>
                </div>
                <div className={styles.box2}>
                  <div className={styles.graBarContainer}>
                    <p className={styles.title}>결제액</p>
                    <div className={styles.graBarText}>
                      <p>{selectedAreaData.paymentMin} 원</p>
                      <p>{selectedAreaData.paymentMax} 원</p>
                    </div>
                    <img src={graBar} className={styles.graBar} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recomend;