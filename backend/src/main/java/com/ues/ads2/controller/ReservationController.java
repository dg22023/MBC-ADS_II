package com.ues.ads2.controller;

import com.ues.ads2.controller.dto.ReservationRequestDTO;
import com.ues.ads2.model.Reservation;
import com.ues.ads2.model.Space;
import com.ues.ads2.model.User;
import com.ues.ads2.repository.SpaceRepository;
import com.ues.ads2.repository.UserRepository;
import com.ues.ads2.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/reservations") // <-- Nueva ruta base
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final UserRepository userRepository;
    private final SpaceRepository spaceRepository;

    @PostMapping
    public ResponseEntity<Reservation> createReservation(
            @RequestBody ReservationRequestDTO reservationRequest,
            Authentication authentication) {

        // 1. Obtener el usuario desde el token de seguridad
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Obtener el espacio
        Space space = spaceRepository.findById(reservationRequest.getSpaceId())
                .orElseThrow(() -> new RuntimeException("Space not found"));

        // 3. Crear la reserva
        Reservation reservation = new Reservation();
        reservation.setUser(user); // <-- Usuario autenticado
        reservation.setSpace(space);
        reservation.setStartTime(reservationRequest.getStartTime());
        reservation.setEndTime(reservationRequest.getEndTime());

        Reservation createdReservation = reservationService.createReservation(reservation);
        return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
    }

    /**
     * GET /api/v1/reservations/my-active
     * Obtiene las reservas activas del usuario autenticado.
     */
    @GetMapping("/my-active")
    public ResponseEntity<List<Reservation>> getMyActiveReservations(Authentication authentication) {
        String username = authentication.getName();

        List<Reservation> reservations = reservationService.findActiveByUser(username);
        return ResponseEntity.ok(reservations);
    }

    /**
     * PUT /api/v1/reservations/{id}
     * Modifica una reserva existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(
            @PathVariable Long id,
            @RequestBody ReservationRequestDTO updateData,
            Authentication authentication) {

        String username = authentication.getName();

        // El servicio debe verificar que el 'username' es dueño de la reserva 'id'
        Reservation updatedReservation = reservationService.updateReservation(id, updateData, username);
        return ResponseEntity.ok(updatedReservation);
    }

    /**
     * DELETE /api/v1/reservations/{id}
     * Cancela (elimina) una reserva.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();

        // El servicio debe verificar que el 'username' es dueño de la reserva 'id'
        reservationService.cancelReservation(id, username);
        return ResponseEntity.noContent().build(); // HTTP 204
    }
}