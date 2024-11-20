package com.react.react.controller;

import com.react.react.dto.MFDTO;
import com.react.react.service.MFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
@RestController
public class MFController {

    private final MFService mfService;

    @Autowired
    public MFController(MFService mfService) {
        this.mfService = mfService;
    }

    @GetMapping("/pplnt")
    public List<MFDTO.CityData> pplntData() {
        try {
            // ApiService의 fetchAndParseJson 메서드 호출
            List<MFDTO.CityData> malerate= mfService.fetchAndParseJson2();
            return malerate;
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
