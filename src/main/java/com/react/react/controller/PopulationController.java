package com.react.react.controller;

import com.react.react.data.PopulationData;
import com.react.react.service.PopulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/population")
public class PopulationController {

    private final PopulationService populationService;

    @Autowired
    public PopulationController(PopulationService populationService) {
        this.populationService = populationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PopulationData>> getAllPopulationData() {
        List<PopulationData> data = populationService.fetchAllPopulationData();
        return ResponseEntity.ok(data);
    }
}


