package com.ues.ads2.service;

import com.ues.ads2.model.Reservation;
import com.ues.ads2.model.Space;
import com.ues.ads2.repository.ReservationRepository;
import com.ues.ads2.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final SpaceRepository spaceRepository;
    private final ReservationRepository reservationRepository;

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
}
