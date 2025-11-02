package com.ues.ads2.repository;

import com.ues.ads2.model.Reservation;
import com.ues.ads2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE r.space.id = :spaceId AND r.startTime < :endTime AND r.endTime > :startTime")
    List<Reservation> findOverlappingReservations(Long spaceId, LocalDateTime startTime, LocalDateTime endTime);

    List<Reservation> findByUserAndStartTimeAfter(User user, LocalDateTime startTime);
}
