package com.react.react.repository;
import com.react.react.entity.Terra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TerraRepository extends JpaRepository<Terra, Long> {
    // 자치구와 업종에 따른 상위 3개의 행정동을 점수 기준으로 조회
    List<Terra> findTop3ByDistrictAndServiceIndustryCodeNameOrderByTotalScoreDesc(String district, String serviceIndustryCodeName);
}
