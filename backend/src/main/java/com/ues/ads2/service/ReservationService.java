package com.ues.ads2.service;

import com.ues.ads2.controller.dto.ReservationRequestDTO;
import com.ues.ads2.model.Reservation;
import com.ues.ads2.model.Space;
import com.ues.ads2.model.User;
import com.ues.ads2.repository.ReservationRepository;
import com.ues.ads2.repository.SpaceRepository;
import com.ues.ads2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final SpaceRepository spaceRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository; // <-- Inyección de dependencia

    public List<Space> findAvailableSpaces(LocalDateTime startTime, LocalDateTime endTime) {
        List<Space> allSpaces = spaceRepository.findAll();
        List<Reservation> overlappingReservations = reservationRepository.findAll().stream()
                .filter(reservation -> reservation.getStartTime().isBefore(endTime) && reservation.getEndTime().isAfter(startTime))
                .toList();

        List<Long> reservedSpaceIds = overlappingReservations.stream()
                .map(reservation -> reservation.getSpace().getId())
                .toList();

        return allSpaces.stream()
                .filter(space -> !reservedSpaceIds.contains(space.getId()))
                .collect(Collectors.toList());
    }

    public Reservation createReservation(Reservation reservation) {
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(
                reservation.getSpace().getId(),
                reservation.getStartTime(),
                reservation.getEndTime()
        );

        if (!overlappingReservations.isEmpty()) {
            throw new ReservationConflictException("Space is already reserved for the selected time.");
        }

        return reservationRepository.save(reservation);
    }

    @Transactional(readOnly = true)
    public List<Reservation> findActiveByUser(String username) {
        User user = userRepository.findByUsername(username) // <-- Corregido
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return reservationRepository.findByUserAndStartTimeAfter(user, LocalDateTime.now());
    }

    @Transactional
    public Reservation updateReservation(Long reservationId, ReservationRequestDTO updateData, String username) {
        User user = userRepository.findByUsername(username) // <-- Corregido
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        if (!reservation.getUser().getId().equals(user.getId())) {
            throw new SecurityException("No tienes permiso para modificar esta reserva");
        }

        Space space = spaceRepository.findById(updateData.getSpaceId())
                .orElseThrow(() -> new RuntimeException("El espacio especificado no existe"));

        // Verifica superposiciones para el nuevo horario, excluyendo la reserva actual
        List<Reservation> overlapping = reservationRepository.findOverlappingReservations(
                updateData.getSpaceId(),
                updateData.getStartTime(),
                updateData.getEndTime()
        ).stream().filter(r -> !r.getId().equals(reservationId)).toList();

        if (!overlapping.isEmpty()) {
            throw new ReservationConflictException("El nuevo horario entra en conflicto con otra reserva.");
        }

        reservation.setSpace(space);
        reservation.setStartTime(updateData.getStartTime());
        reservation.setEndTime(updateData.getEndTime());

        return reservationRepository.save(reservation);
    }

    @Transactional
    public void cancelReservation(Long reservationId, String username) {
        User user = userRepository.findByUsername(username) // <-- Corregido
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        if (!reservation.getUser().getId().equals(user.getId())) {
            throw new SecurityException("No tienes permiso para cancelar esta reserva");
        }

        reservationRepository.delete(reservation);
    }
}
