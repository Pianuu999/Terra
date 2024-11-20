package com.react.react.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.react.react.dto.APIDTO;
import com.react.react.dto.APIResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Transactional
public class APIService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${api.url}")
    private String apiUrl;

    @Value("${api.key}")
    private String apiKey;

    public List<APIDTO> fetchAndParseJson() throws Exception {
        try {
            String fullUrl = apiUrl + "?apiKey=" + apiKey;
            ResponseEntity<String> response = restTemplate.getForEntity(fullUrl, String.class);
            String jsonResponse = response.getBody();

            System.out.println("JSON Response: " + jsonResponse);

            ObjectMapper objectMapper = new ObjectMapper();
            APIResponseDTO apiResponse = objectMapper.readValue(jsonResponse, APIResponseDTO.class);

            List<APIDTO> rowData = apiResponse.getIotVdata018().getRow();
            System.out.println("Parsed Data: " + rowData);
            // API DTO 리스트 반환
            return apiResponse.getIotVdata018().getRow();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("JSON 데이터를 가져오거나 파싱하는 중 오류 발생: " + e.getMessage());
        }
    }
}