package com.react.react.service;

import com.react.react.entity.Terra;
import com.react.react.repository.TerraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class TerraService {
    @Autowired
    private TerraRepository terraRepository;

    // 여러 개의 district를 처리하고 상위 3개를 반환하는 메서드
    public List<Terra> getTop3ByDistrictAndIndustry(List<String> districts, String serviceIndustryCodeName) {
        List<Terra> allRecommendations = new ArrayList<>();

        // 각 district에 대해 상위 3개를 조회
        for (String district : districts) {
            List<Terra> recommendations = terraRepository.findTop3ByDistrictAndServiceIndustryCodeNameOrderByTotalScoreDesc(district, serviceIndustryCodeName);
            allRecommendations.addAll(recommendations);
        }

        // 모든 추천 결과를 점수 기준으로 정렬
        Collections.sort(allRecommendations, new Comparator<Terra>() {
            @Override
            public int compare(Terra t1, Terra t2) {
                return Double.compare(t2.getTotalScore(), t1.getTotalScore()); // 내림차순 정렬
            }
        });

        // 상위 3개 반환
        return allRecommendations.subList(0, Math.min(3, allRecommendations.size()));
    }
}
