package com.react.react.service;

import com.react.react.data.CreditData;
import com.react.react.data.PopulationData;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CreditService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String apiKey = "71516965496b6f6f3636515a765047";

    // 구별 관광지 리스트
    private final Map<String, List<String>> locationsByDistrict = new HashMap<>();

    public CreditService() {
        locationsByDistrict.put("강남구", new ArrayList<>(List.of(
                "강남 MICE 관광특구", "강남역", "가로수길", "압구정로데오거리", "선릉역", "역삼역",
                "양재역", "청담동 명품거리", "신논현역·논현역"
        )));
        locationsByDistrict.put("종로구", new ArrayList<>(List.of(
                "경복궁", "광화문·덕수궁", "보신각", "창덕궁·종묘", "북촌한옥마을", "서촌", "인사동", "익선동"
        )));
        locationsByDistrict.put("중구", new ArrayList<>(List.of(
                "명동 관광특구", "남대문시장", "서울광장", "충정로역", "남산공원", "덕수궁길·정동길"
        )));
        locationsByDistrict.put("마포구", new ArrayList<>(List.of(
                "홍대 관광특구", "홍대입구역(2호선)", "망원한강공원", "월드컵공원", "합정역", "연남동", "DMC(디지털미디어시티)"
        )));
        locationsByDistrict.put("송파구", new ArrayList<>(List.of(
                "잠실 관광특구", "잠실한강공원", "잠실종합운동장", "장지역"
        )));
        locationsByDistrict.put("서초구", new ArrayList<>(List.of(
                "고속터미널역", "서리풀공원·몽마르뜨공원", "방배역 먹자골목", "교대역"
        )));
        locationsByDistrict.put("성북구", new ArrayList<>(List.of(
                "성신여대입구역", "북한산우이역", "수유역", "수유리 먹자골목", "쌍문동 맛집거리"
        )));
        locationsByDistrict.put("동대문구", new ArrayList<>(List.of(
                "동대문 관광특구", "동대문역", "장한평역", "청량리 제기동 일대 전통시장", "회기역"
        )));
        locationsByDistrict.put("영등포구", new ArrayList<>(List.of(
                "영등포 타임스퀘어", "여의도", "여의도한강공원", "샛강생태공원", "오목교역·목동운동장"
        )));
        locationsByDistrict.put("은평구", new ArrayList<>(List.of(
                "북서울꿈의숲", "불광천", "연신내역"
        )));
        locationsByDistrict.put("강서구", new ArrayList<>(List.of(
                "김포공항", "강서한강공원", "서울식물원·마곡나루역", "발산역"
        )));
        locationsByDistrict.put("동작구", new ArrayList<>(List.of(
                "노량진", "총신대입구(이수)역"
        )));
        locationsByDistrict.put("성동구", new ArrayList<>(List.of(
                "뚝섬한강공원", "왕십리역", "성수카페거리"
        )));
        locationsByDistrict.put("관악구", new ArrayList<>(List.of(
                "서울대입구역", "신림역"
        )));
        locationsByDistrict.put("용산구", new ArrayList<>(List.of(
                "이태원 관광특구", "해방촌·경리단길", "용리단길", "남산공원", "이촌한강공원", "국립중앙박물관·용산가족공원"
        )));
    }

    public List<CreditData> fetchAllPopulationData(String district) {
        List<String> locations = locationsByDistrict.get(district);
        if (locations == null) {
            throw new IllegalArgumentException("Invalid district: " + district);
        }
        return locations.parallelStream()
                .map(this::fetchDataForLocation)
                .collect(Collectors.toList());
    }

    private CreditData fetchDataForLocation(String location) {
        String url = String.format("http://openapi.seoul.go.kr:8088/%s/xml/citydata_cmrcl/1/5/%s", apiKey, location);
        String xmlResponse = restTemplate.getForObject(url, String.class);

        System.out.println("XML Response for location " + location + ": " + xmlResponse); // XML 응답 출력

        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(PopulationData.class);
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            return (CreditData) unmarshaller.unmarshal(new StringReader(xmlResponse));
        } catch (JAXBException e) {
            e.printStackTrace();
            return null;
        }
    }
}
