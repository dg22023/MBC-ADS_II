package com.ues.ads2.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Request DTO for creating a new reservation.
 * Contains the necessary information to create a workspace reservation.
 */
@Data
public class ReservationRequestDTO {

    @NotNull(message = "El campo ID de usuario es requerido")
    private Long userId;
    
    @NotNull(message = "El campo ID de espacio es requerido")
    private Long spaceId;
    
    @NotNull(message = "El campo de inicio es requerido")
    private LocalDateTime startTime;
    
    @NotNull(message = "El campo de fin es requerido")
    private LocalDateTime endTime;
}
