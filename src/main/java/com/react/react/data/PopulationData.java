package com.react.react.data;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name = "Map")
public class PopulationData {

    private SeoulRtdCitydataPpltn seoulRtdCitydataPpltn;

    @XmlElement(name = "SeoulRtd.citydata_ppltn")
    public SeoulRtdCitydataPpltn getSeoulRtdCitydataPpltn() {
        return seoulRtdCitydataPpltn;
    }

    public void setSeoulRtdCitydataPpltn(SeoulRtdCitydataPpltn seoulRtdCitydataPpltn) {
        this.seoulRtdCitydataPpltn = seoulRtdCitydataPpltn;
    }

    // 내부 클래스를 생성하여 XML 요소를 매핑합니다.
    public static class SeoulRtdCitydataPpltn {
        private String areaNm;
        private String areaCd;
        private String areaCongestLvl;
        private String areaCongestMsg;
        private int areaPpltnMin;
        private int areaPpltnMax;
        private double malePpltnRate;
        private double femalePpltnRate;
        private List<ForecastPopulation> fcstPpltn;

        @XmlElement(name = "AREA_NM")
        public String getAreaNm() {
            return areaNm;
        }

        public void setAreaNm(String areaNm) {
            this.areaNm = areaNm;
        }

        @XmlElement(name = "AREA_CD")
        public String getAreaCd() {
            return areaCd;
        }

        public void setAreaCd(String areaCd) {
            this.areaCd = areaCd;
        }

        @XmlElement(name = "AREA_CONGEST_LVL")
        public String getAreaCongestLvl() {
            return areaCongestLvl;
        }

        public void setAreaCongestLvl(String areaCongestLvl) {
            this.areaCongestLvl = areaCongestLvl;
        }

        @XmlElement(name = "AREA_CONGEST_MSG")
        public String getAreaCongestMsg() {
            return areaCongestMsg;
        }

        public void setAreaCongestMsg(String areaCongestMsg) {
            this.areaCongestMsg = areaCongestMsg;
        }

        @XmlElement(name = "AREA_PPLTN_MIN")
        public int getAreaPpltnMin() {
            return areaPpltnMin;
        }

        public void setAreaPpltnMin(int areaPpltnMin) {
            this.areaPpltnMin = areaPpltnMin;
        }

        @XmlElement(name = "AREA_PPLTN_MAX")
        public int getAreaPpltnMax() {
            return areaPpltnMax;
        }

        public void setAreaPpltnMax(int areaPpltnMax) {
            this.areaPpltnMax = areaPpltnMax;
        }

        @XmlElement(name = "MALE_PPLTN_RATE")
        public double getMalePpltnRate() {
            return malePpltnRate;
        }

        public void setMalePpltnRate(double malePpltnRate) {
            this.malePpltnRate = malePpltnRate;
        }

        @XmlElement(name = "FEMALE_PPLTN_RATE")
        public double getFemalePpltnRate() {
            return femalePpltnRate;
        }

        public void setFemalePpltnRate(double femalePpltnRate) {
            this.femalePpltnRate = femalePpltnRate;
        }

        @XmlElement(name = "FCST_PPLTN")
        public List<ForecastPopulation> getFcstPpltn() {
            return fcstPpltn;
        }

        public void setFcstPpltn(List<ForecastPopulation> fcstPpltn) {
            this.fcstPpltn = fcstPpltn;
        }

        // ForecastPopulation 클래스 정의
        public static class ForecastPopulation {
            private String fcstTime;
            private String fcstCongestLvl;
            private int fcstPpltnMin;
            private int fcstPpltnMax;

            @XmlElement(name = "FCST_TIME")
            public String getFcstTime() {
                return fcstTime;
            }

            public void setFcstTime(String fcstTime) {
                this.fcstTime = fcstTime;
            }

            @XmlElement(name = "FCST_CONGEST_LVL")
            public String getFcstCongestLvl() {
                return fcstCongestLvl;
            }

            public void setFcstCongestLvl(String fcstCongestLvl) {
                this.fcstCongestLvl = fcstCongestLvl;
            }

            @XmlElement(name = "FCST_PPLTN_MIN")
            public int getFcstPpltnMin() {
                return fcstPpltnMin;
            }

            public void setFcstPpltnMin(int fcstPpltnMin) {
                this.fcstPpltnMin = fcstPpltnMin;
            }

            @XmlElement(name = "FCST_PPLTN_MAX")
            public int getFcstPpltnMax() {
                return fcstPpltnMax;
            }

            public void setFcstPpltnMax(int fcstPpltnMax) {
                this.fcstPpltnMax = fcstPpltnMax;
            }
        }
    }
}


