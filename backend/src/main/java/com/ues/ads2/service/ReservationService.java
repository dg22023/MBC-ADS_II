package com.ues.ads2.service;

import com.ues.ads2.model.Reservation;
import com.ues.ads2.model.Space;
import com.ues.ads2.repository.ReservationRepository;
import com.ues.ads2.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for managing reservations in the MiniBooking system.
 * Handles business logic for creating reservations and checking availability.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationService {

    private final SpaceRepository spaceRepository;
    private final ReservationRepository reservationRepository;

    /**
     * Finds all available spaces for a given time range.
     * 
     * @param startTime Start time of the desired reservation
     * @param endTime End time of the desired reservation
     * @return List of available spaces
     */
    public List<Space> findAvailableSpaces(LocalDateTime startTime, LocalDateTime endTime) {
        log.info("Finding available spaces between {} and {}", startTime, endTime);
        
        List<Space> allSpaces = spaceRepository.findAll();
        List<Reservation> overlappingReservations = reservationRepository.findAll().stream()
                .filter(reservation -> reservation.getStartTime().isBefore(endTime) && reservation.getEndTime().isAfter(startTime))
                .toList();

        List<Long> reservedSpaceIds = overlappingReservations.stream()
                .map(reservation -> reservation.getSpace().getId())
                .toList();

        List<Space> availableSpaces = allSpaces.stream()
                .filter(space -> !reservedSpaceIds.contains(space.getId()))
                .collect(Collectors.toList());
        
        log.info("Found {} available spaces out of {} total spaces", availableSpaces.size(), allSpaces.size());
        return availableSpaces;
    }

    /**
     * Creates a new reservation after validating availability.
     * Prevents duplicate reservations by checking for overlapping time slots.
     * 
     * @param reservation The reservation to create
     * @return The created reservation with generated ID
     * @throws ReservationConflictException if the space is already reserved for the given time
     */
    @Transactional
    public Reservation createReservation(Reservation reservation) {
        log.info("Attempting to create reservation for space {} from {} to {}", 
                 reservation.getSpace().getId(), 
                 reservation.getStartTime(), 
                 reservation.getEndTime());
        
        // Check for overlapping reservations
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(
                reservation.getSpace().getId(),
                reservation.getStartTime(),
                reservation.getEndTime()
        );

        if (!overlappingReservations.isEmpty()) {
            log.warn("Reservation conflict detected for space {} - {} overlapping reservations found", 
                     reservation.getSpace().getId(), 
                     overlappingReservations.size());
            throw new ReservationConflictException(
                    String.format("Space '%s' is already reserved for the selected time. Please choose a different time slot or space.",
                                reservation.getSpace().getName())
            );
        }

        Reservation savedReservation = reservationRepository.save(reservation);
        log.info("Successfully created reservation with ID {} for user {} in space {}", 
                 savedReservation.getId(),
                 savedReservation.getUser().getId(),
                 savedReservation.getSpace().getId());
        
        return savedReservation;
    }
}
