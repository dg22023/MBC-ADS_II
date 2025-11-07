package com.ues.ads2.service;

import com.ues.ads2.controller.dto.ReservationRequestDTO;
import com.ues.ads2.controller.dto.ReservationResponseDTO;
import com.ues.ads2.model.Reservation;
import com.ues.ads2.model.Space;
import com.ues.ads2.model.User;
import com.ues.ads2.repository.ReservationRepository;
import com.ues.ads2.repository.SpaceRepository;
import com.ues.ads2.repository.UserRepository;

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
    private final UserRepository userRepository;

public ReservationService(
            ReservationRepository reservationRepository,
            UserRepository userRepository,
            SpaceRepository spaceRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.spaceRepository = spaceRepository;
    }
    /**
     * Finds all available spaces for a given time range.
     * 
     * @param startTime Start time of the desired reservation
     * @param endTime End time of the desired reservation
     * @return List of available spaces
     */
    public List<Space> findAvailableSpaces(LocalDateTime startTime, LocalDateTime endTime) {
        log.info("Buscando espacios disponibles entre {} y {}", startTime, endTime);
        
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

        log.info("Se encontraron {} espacios disponibles de un total de {} espacios", availableSpaces.size(), allSpaces.size());
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
        log.info("Intentando crear reserva para el espacio {} desde {} hasta {}", 
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
            log.warn("Conflicto de reserva detectado para el espacio {} - {} reservas superpuestas encontradas", 
                     reservation.getSpace().getId(), 
                     overlappingReservations.size());
            throw new ReservationConflictException(
                    String.format("El espacio '%s' ya está reservado para el tiempo seleccionado. Por favor, elija un horario o espacio diferente.",
                                reservation.getSpace().getName())
            );
        }

        Reservation savedReservation = reservationRepository.save(reservation);
        log.info("Reserva creada con éxito con ID {} para el usuario {} en el espacio {}", 
                 savedReservation.getId(),
                 savedReservation.getUser().getId(),
                 savedReservation.getSpace().getId());
        
        return savedReservation;
    }
@Transactional
public ReservationResponseDTO updateReservation(Long id, ReservationRequestDTO request) {
    Reservation existing = reservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("No se encontró la reserva con el ID " + id));

    // Verificar si el espacio o fechas cambian
    if (!existing.getSpace().getId().equals(request.getSpaceId()) ||
        !existing.getStartTime().equals(request.getStartTime()) ||
        !existing.getEndTime().equals(request.getEndTime())) {

        // Verificar que el nuevo espacio esté disponible
        List<Reservation> overlapping = reservationRepository.findAll().stream()
                .filter(r -> !r.getId().equals(id))
                .filter(r -> r.getSpace().getId().equals(request.getSpaceId()))
                .filter(r -> r.getStartTime().isBefore(request.getEndTime()) &&
                             r.getEndTime().isAfter(request.getStartTime()))
                .collect(Collectors.toList());

        if (!overlapping.isEmpty()) {
            throw new ReservationConflictException("El espacio seleccionado no está disponible para el lapso de tiempo elegido.");
        }
    }

    // Actualizar datos
    existing.setStartTime(request.getStartTime());
    existing.setEndTime(request.getEndTime());
    existing.getSpace().setId(request.getSpaceId());

    Reservation updated = reservationRepository.save(existing);

    return new ReservationResponseDTO(
            updated.getId(),
            updated.getUser().getId(),
            updated.getUser().getName(),
            updated.getSpace().getId(),
            updated.getSpace().getName(),
            updated.getSpace().getType().toString(),
            updated.getStartTime(),
            updated.getEndTime(),
            "Reserva actualizada con éxito"
    );
}

    
}
