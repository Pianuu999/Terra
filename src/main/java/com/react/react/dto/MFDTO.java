package com.react.react.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MFDTO {
    @JsonProperty("SeoulRtd.citydata_ppltn")
    private List<CityData> cityDataPpltn;

    @JsonProperty("RESULT")
    private Result result;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CityData {
        @JsonProperty("AREA_NM")
        private String areaNm;

        @JsonProperty("AREA_CD")
        private String areaCd;

        @JsonProperty("AREA_CONGEST_LVL")
        private String areaCongestLvl;

        @JsonProperty("AREA_CONGEST_MSG")
        private String areaCongestMsg;

        @JsonProperty("AREA_PPLTN_MIN")
        private int areaPpltnMin;

        @JsonProperty("AREA_PPLTN_MAX")
        private int areaPpltnMax;

        @JsonProperty("MALE_PPLTN_RATE")
        private String malePpltnRate;

        @JsonProperty("FEMALE_PPLTN_RATE")
        private String femalePpltnRate;

        @JsonProperty("PPLTN_RATE_0")
        private double ppltnRate0;

        @JsonProperty("PPLTN_RATE_10")
        private double ppltnRate10;

        @JsonProperty("PPLTN_RATE_20")
        private double ppltnRate20;

        @JsonProperty("PPLTN_RATE_30")
        private double ppltnRate30;

        @JsonProperty("PPLTN_RATE_40")
        private double ppltnRate40;

        @JsonProperty("PPLTN_RATE_50")
        private double ppltnRate50;

        @JsonProperty("PPLTN_RATE_60")
        private double ppltnRate60;

        @JsonProperty("PPLTN_RATE_70")
        private double ppltnRate70;

        @JsonProperty("RESNT_PPLTN_RATE")
        private double resntPpltnRate;

        @JsonProperty("NON_RESNT_PPLTN_RATE")
        private double nonResntPpltnRate;

        @JsonProperty("REPLACE_YN")
        private String replaceYn;

        @JsonProperty("PPLTN_TIME")
        private String ppltnTime;

        @JsonProperty("FCST_YN")
        private String fcstYn;

        @JsonProperty("FCST_PPLTN")
        private List<ForecastPopulation> fcstPpltn;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class ForecastPopulation {
            @JsonProperty("FCST_TIME")
            private String fcstTime;

            @JsonProperty("FCST_CONGEST_LVL")
            private String fcstCongestLvl;

            @JsonProperty("FCST_PPLTN_MIN")
            private int fcstPpltnMin;

            @JsonProperty("FCST_PPLTN_MAX")
            private int fcstPpltnMax;
        }
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Result {
        @JsonProperty("RESULT.CODE")
        private String resultCode;

        @JsonProperty("RESULT.MESSAGE")
        private String resultMessage;
    }
}
