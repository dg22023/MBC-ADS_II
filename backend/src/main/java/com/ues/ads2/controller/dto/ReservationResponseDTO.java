package com.ues.ads2.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO for reservation operations.
 * Contains detailed information about the created reservation including user and space details.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponseDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Long spaceId;
    private String spaceName;
    private String spaceType;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String message;
}
