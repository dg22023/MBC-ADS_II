package com.ues.ads2.controller.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReservationRequestDTO {
    private Long userId;
    private Long spaceId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
