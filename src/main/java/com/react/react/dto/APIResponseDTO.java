package com.react.react.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class APIResponseDTO {
    @JsonProperty("IotVdata018")
    private IotVdata018 IotVdata018;

    @Data
    public static class IotVdata018 {
        private int list_total_count;

        @JsonProperty("RESULT")  // JSON 필드 이름과 매핑
        private Result result;

        private List<APIDTO> row;

        @Data
        public static class Result {
            @JsonProperty("CODE")  // 대문자 필드 이름과 매핑
            private String code;   // 소문자로 시작하는 Java 변수
            @JsonProperty("MESSAGE") // 대문자 필드 이름과 매핑
            private String message; // 소문자로 시작하는 Java 변수
        }
    }
}