package com.ues.ads2.controller;

import com.ues.ads2.controller.dto.ReservationRequestDTO;
import com.ues.ads2.controller.dto.ReservationResponseDTO;
import com.ues.ads2.model.Reservation;
import com.ues.ads2.model.Space;
import com.ues.ads2.model.User;
import com.ues.ads2.repository.SpaceRepository;
import com.ues.ads2.repository.UserRepository;
import com.ues.ads2.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for managing reservations in the MiniBooking system.
 * Provides endpoints for creating and managing workspace reservations.
 */
@RestController
@RequestMapping("/api/v1/reservations")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final UserRepository userRepository;
    private final SpaceRepository spaceRepository;

    /**
     * Creates a new reservation for a workspace.
     * Validates availability and prevents duplication by checking for overlapping reservations.
     *
     * @param reservationRequest DTO containing userId, spaceId, startTime, and endTime
     * @return ResponseEntity with the created reservation and HTTP 201 status
     * @throws RuntimeException if user or space not found
     * @throws com.ues.ads2.service.ReservationConflictException if space is already reserved for the time slot
     */
    @PostMapping
    public ResponseEntity<ReservationResponseDTO> createReservation(
            @Valid @RequestBody ReservationRequestDTO reservationRequest) {
        
        // Validate that user exists
        User user = userRepository.findById(reservationRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + reservationRequest.getUserId()));
        
        // Validate that space exists
        Space space = spaceRepository.findById(reservationRequest.getSpaceId())
                .orElseThrow(() -> new RuntimeException("Space not found with id: " + reservationRequest.getSpaceId()));

        // Validate time range
        if (reservationRequest.getStartTime().isAfter(reservationRequest.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }

        if (reservationRequest.getStartTime().isBefore(java.time.LocalDateTime.now())) {
            throw new IllegalArgumentException("Cannot create reservation in the past");
        }

        // Build reservation entity
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setSpace(space);
        reservation.setStartTime(reservationRequest.getStartTime());
        reservation.setEndTime(reservationRequest.getEndTime());

        // Create reservation (this will validate availability and prevent duplication)
        Reservation createdReservation = reservationService.createReservation(reservation);

        // Build response DTO
        ReservationResponseDTO response = ReservationResponseDTO.builder()
                .id(createdReservation.getId())
                .userId(createdReservation.getUser().getId())
                .userName(createdReservation.getUser().getName())
                .spaceId(createdReservation.getSpace().getId())
                .spaceName(createdReservation.getSpace().getName())
                .spaceType(createdReservation.getSpace().getType().toString())
                .startTime(createdReservation.getStartTime())
                .endTime(createdReservation.getEndTime())
                .message("Reservation created successfully")
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
