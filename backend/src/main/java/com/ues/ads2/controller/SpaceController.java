package com.ues.ads2.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/spaces")
@CrossOrigin(origins = "http://localhost:4200")
public class SpaceController {
    // Aquí van los métodos para manejar las solicitudes relacionadas con los espacios
    @GetMapping("path")
    public Map<String, String> getWelcomeMessageMap() {
        return Map.of("message", "Welcome to the Space API");
    }
    
    
}
