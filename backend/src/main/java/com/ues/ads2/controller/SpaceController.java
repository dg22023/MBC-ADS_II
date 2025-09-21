package com.ues.ads2.controller;

import com.ues.ads2.controller.dto.ReservationRequestDTO;
import com.ues.ads2.model.Reservation;
import com.ues.ads2.model.Space;
import com.ues.ads2.model.User;
import com.ues.ads2.repository.SpaceRepository;
import com.ues.ads2.repository.UserRepository;
import com.ues.ads2.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/spaces")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class SpaceController {

    private final ReservationService reservationService;
    private final UserRepository userRepository;
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

    @PostMapping("/reservations")
    public ResponseEntity<Reservation> createReservation(@RequestBody ReservationRequestDTO reservationRequest) {
        User user = userRepository.findById(reservationRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Space space = spaceRepository.findById(reservationRequest.getSpaceId())
                .orElseThrow(() -> new RuntimeException("Space not found"));

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setSpace(space);
        reservation.setStartTime(reservationRequest.getStartTime());
        reservation.setEndTime(reservationRequest.getEndTime());

        Reservation createdReservation = reservationService.createReservation(reservation);
        return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
    }
}
