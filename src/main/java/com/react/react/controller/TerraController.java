package com.react.react.controller;
import com.react.react.entity.Terra;
import com.react.react.service.TerraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/terra")
public class TerraController {
    @Autowired
    private TerraService terraService;

    //district가 선택된 구
    //serviceIndustryCodeName 선택된 서비스 업종
    @GetMapping("/recommendations")
    public ResponseEntity<List<Terra>> getRecommendations(
            @RequestParam List<String> district,
            @RequestParam String serviceIndustryCodeName) {
        List<Terra> recommendations = terraService.getTop3ByDistrictAndIndustry(district, serviceIndustryCodeName);
        return ResponseEntity.ok(recommendations);
    }
}

