package com.react.react.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.react.react.dto.MFDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class MFService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${api.url1}")
    private String apiUrl1;

    @Value("${api.key}")
    private String apiKey;

    public List<MFDTO.CityData> fetchAndParseJson2() throws Exception {
        try {
            String a = "강남역";
            String fullUrl = apiUrl1.replace("sample", apiKey) + a;
            System.out.println("Request URL: " + fullUrl);
            ResponseEntity<String> response = restTemplate.getForEntity(fullUrl, String.class);
            String jsonResponse = response.getBody();

            System.out.println("JSON Response: " + jsonResponse);

            ObjectMapper objectMapper = new ObjectMapper();
            MFDTO MFResponse = objectMapper.readValue(jsonResponse, MFDTO.class);

            return MFResponse.getCityDataPpltn();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch city data");
        }
    }
}
