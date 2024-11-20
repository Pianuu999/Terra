package com.react.react.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.react.react.entity.APIEntity;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class APIDTO {
    @JsonProperty("MODEL_NM") // JSON 필드 이름을 대문자로 매핑
    private String modelNm;

    @JsonProperty("SERIAL_NO") // JSON 필드 이름을 대문자로 매핑
    private String serialNo;

    @JsonProperty("SENSING_TIME") // JSON 필드 이름을 대문자로 매핑
    private String sensingTime;

    @JsonProperty("REGION") // JSON 필드 이름을 대문자로 매핑
    private String region;

    @JsonProperty("AUTONOMOUS_DISTRICT") // JSON 필드 이름을 대문자로 매핑
    private String autonomousDistrict;

    @JsonProperty("ADMINISTRATIVE_DISTRICT") // JSON 필드 이름을 대문자로 매핑
    private String administrativeDistrict;

    @JsonProperty("VISITOR_COUNT") // JSON 필드 이름을 대문자로 매핑
    private String visitorCount;

    @JsonProperty("REG_DTTM") // JSON 필드 이름을 대문자로 매핑
    private String regDttm;

    // APIEntity를 APIDTO로 변환하는 메서드
    public static APIDTO toAPIDTO(APIEntity apiEntity) {
        APIDTO apidto = new APIDTO();
        apidto.setModelNm(apiEntity.getMODEL_NM()); // 메서드 이름 수정
        apidto.setSerialNo(apiEntity.getSERIAL_NO()); // 메서드 이름 수정
        apidto.setSensingTime(apiEntity.getSENSING_TIME()); // 메서드 이름 수정
        apidto.setRegion(apiEntity.getREGION()); // 메서드 이름 수정
        apidto.setAutonomousDistrict(apiEntity.getAUTONOMOUS_DISTRICT()); // 메서드 이름 수정
        apidto.setAdministrativeDistrict(apiEntity.getADMINISTRATIVE_DISTRICT()); // 메서드 이름 수정
        apidto.setVisitorCount(apiEntity.getVISITOR_COUNT()); // 메서드 이름 수정
        apidto.setRegDttm(apiEntity.getREG_DTTM()); // 메서드 이름 수정
        return apidto;
    }

    @Override
    public String toString() {
        return "APIDTO{" +
                "modelNm='" + modelNm + '\'' + // 대문자 필드명에서 소문자 필드명으로 수정
                ", serialNo='" + serialNo + '\'' + // 대문자 필드명에서 소문자 필드명으로 수정
                ", sensingTime='" + sensingTime + '\'' + // 대문자 필드명에서 소문자 필드명으로 수정
                ", region='" + region + '\'' + // 대문자 필드명에서 소문자 필드명으로 수정
                ", autonomousDistrict='" + autonomousDistrict + '\'' + // 대문자 필드명에서 소문자 필드명으로 수정
                ", administrativeDistrict='" + administrativeDistrict + '\'' + // 대문자 필드명에서 소문자 필드명으로 수정
                ", visitorCount='" + visitorCount + '\'' + // 대문자 필드명에서 소문자 필드명으로 수정
                ", regDttm='" + regDttm + '\'' + // 대문자 필드명에서 소문자 필드명으로 수정
                '}';
    }
}
