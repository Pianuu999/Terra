package com.react.react.controller;

import com.react.react.dto.APIDTO;
import com.react.react.service.APIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class APIController {

    private final APIService apiService;

    @Autowired
    public APIController(APIService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/fetch-and-save")
    public String fetchAndSaveData(Model model) {
        try {
            // ApiService의 fetchAndParseJson 메서드 호출
            List<APIDTO> apiDtoList = apiService.fetchAndParseJson();
            model.addAttribute("apiData", apiDtoList); // 데이터 리스트를 모델에 추가
            return "index"; // index.html로 이동
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "오류 발생: " + e.getMessage()); // 오류 메시지 추가
            return "index"; // index.html로 이동
        }
    }
}
