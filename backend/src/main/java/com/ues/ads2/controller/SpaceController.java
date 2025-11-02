package com.ues.ads2.controller;

import com.ues.ads2.model.Space;
import com.ues.ads2.repository.SpaceRepository;
import com.ues.ads2.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/spaces")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class SpaceController {

    private final ReservationService reservationService;
    private final SpaceRepository spaceRepository;

    @GetMapping("/all")
    public List<Space> getAllSpaces() {
        return spaceRepository.findAll();
    }

    @GetMapping("/available")
    public List<Space> getAvailableSpaces(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        return reservationService.findAvailableSpaces(startTime, endTime);
    }


}
