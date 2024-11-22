package com.react.react.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;


@Entity
@Table(name = "terra")
public class Terra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for each record

    private String district; // District name

    @Column(name = "adstrd_cd_nm")
    private String administrativeDistrictName; // Administrative district name

    @Column(name = "svc_induty_cd_nm")
    private String serviceIndustryCodeName; // Service industry code/name

    @Column(name = "thsmon_selng_co")
    private Integer totalSalesOfTheMonth; // Total sales of the month

    @Column(name = "similr_induty_stor_co")
    private Integer similarIndustryStoreCount; // Similar industry store count

    @Column(name = "avg_sales")
    private BigDecimal avgSales; // Average sales

    @Column(name = "score_1")
    private BigDecimal score1; // Score 1

    @Column(name = "20232")
    private Long data20232; // Data for year 2023, month 2

    @Column(name = "20242")
    private Long data20242; // Data for year 2024, month 2

    @Column(name = "score_2")
    private BigDecimal score2; // Score 2

    @Column(name = "trdar_change_ix")
    private String tradeAreaChangeIndex; // Trade area change index

    @Column(name = "score_3")
    private BigDecimal score3; // Score 3

    @Column(name = "pop_density")
    private BigDecimal populationDensity; // Population density

    @Column(name = "score_4")
    private BigDecimal score4; // Score 4

    @Column(name = "total_score")
    private Double totalScore; // Total score

    @Column(name = "male_sale_co")
    private Integer maleSalesCount; // Male sales count

    @Column(name = "female_sale_co")
    private Integer femaleSalesCount; // Female sales count

    @Column(name = "age_10_sale_co")
    private Integer salesAge10; // Sales for age group 10-19

    @Column(name = "age_20_sale_co")
    private Integer salesAge20; // Sales for age group 20-29

    @Column(name = "age_30_sale_co")
    private Integer salesAge30; // Sales for age group 30-39

    @Column(name = "age_40_sale_co")
    private Integer salesAge40; // Sales for age group 40-49

    @Column(name = "age_50_sale_co")
    private Integer salesAge50; // Sales for age group 50-59

    @Column(name = "age_60_sale_co")
    private Integer salesAge60; // Sales for age group 60+

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getAdministrativeDistrictName() {
        return administrativeDistrictName;
    }

    public void setAdministrativeDistrictName(String administrativeDistrictName) {
        this.administrativeDistrictName = administrativeDistrictName;
    }

    public String getServiceIndustryCodeName() {
        return serviceIndustryCodeName;
    }

    public void setServiceIndustryCodeName(String serviceIndustryCodeName) {
        this.serviceIndustryCodeName = serviceIndustryCodeName;
    }

    public Integer getTotalSalesOfTheMonth() {
        return totalSalesOfTheMonth;
    }

    public void setTotalSalesOfTheMonth(Integer totalSalesOfTheMonth) {
        this.totalSalesOfTheMonth = totalSalesOfTheMonth;
    }

    public Integer getSimilarIndustryStoreCount() {
        return similarIndustryStoreCount;
    }

    public void setSimilarIndustryStoreCount(Integer similarIndustryStoreCount) {
        this.similarIndustryStoreCount = similarIndustryStoreCount;
    }

    public BigDecimal getAvgSales() {
        return avgSales;
    }

    public void setAvgSales(BigDecimal avgSales) {
        this.avgSales = avgSales;
    }

    public BigDecimal getScore1() {
        return score1;
    }

    public void setScore1(BigDecimal score1) {
        this.score1 = score1;
    }

    public Long getData20232() {
        return data20232;
    }

    public void setData20232(Long data20232) {
        this.data20232 = data20232;
    }

    public Long getData20242() {
        return data20242;
    }

    public void setData20242(Long data20242) {
        this.data20242 = data20242;
    }

    public BigDecimal getScore2() {
        return score2;
    }

    public void setScore2(BigDecimal score2) {
        this.score2 = score2;
    }

    public String getTradeAreaChangeIndex() {
        return tradeAreaChangeIndex;
    }

    public void setTradeAreaChangeIndex(String tradeAreaChangeIndex) {
        this.tradeAreaChangeIndex = tradeAreaChangeIndex;
    }

    public BigDecimal getScore3() {
        return score3;
    }

    public void setScore3(BigDecimal score3) {
        this.score3 = score3;
    }

    public BigDecimal getPopulationDensity() {
        return populationDensity;
    }

    public void setPopulationDensity(BigDecimal populationDensity) {
        this.populationDensity = populationDensity;
    }

    public BigDecimal getScore4() {
        return score4;
    }

    public void setScore4(BigDecimal score4) {
        this.score4 = score4;
    }

    public Double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Double totalScore) {
        this.totalScore = totalScore;
    }

    public Integer getMaleSalesCount() {
        return maleSalesCount;
    }

    public void setMaleSalesCount(Integer maleSalesCount) {
        this.maleSalesCount = maleSalesCount;
    }

    public Integer getFemaleSalesCount() {
        return femaleSalesCount;
    }

    public void setFemaleSalesCount(Integer femaleSalesCount) {
        this.femaleSalesCount = femaleSalesCount;
    }

    public Integer getSalesAge10() {
        return salesAge10;
    }

    public void setSalesAge10(Integer salesAge10) {
        this.salesAge10 = salesAge10;
    }

    public Integer getSalesAge20() {
        return salesAge20;
    }

    public void setSalesAge20(Integer salesAge20) {
        this.salesAge20 = salesAge20;
    }

    public Integer getSalesAge30() {
        return salesAge30;
    }

    public void setSalesAge30(Integer salesAge30) {
        this.salesAge30 = salesAge30;
    }

    public Integer getSalesAge40() {
        return salesAge40;
    }

    public void setSalesAge40(Integer salesAge40) {
        this.salesAge40 = salesAge40;
    }

    public Integer getSalesAge50() {
        return salesAge50;
    }

    public void setSalesAge50(Integer salesAge50) {
        this.salesAge50 = salesAge50;
    }

    public Integer getSalesAge60() {
        return salesAge60;
    }

    public void setSalesAge60(Integer salesAge60) {
        this.salesAge60 = salesAge60;
    }
}

