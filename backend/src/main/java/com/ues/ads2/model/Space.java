package com.ues.ads2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;

@Entity
@Table(name = "spaces")
@Data
public class Space {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private SpaceType type;

    private int capacity;

    @Column(length = 100)
    private String subtitle;

    @Column(length = 500)
    private String description;

    private Double pricePerHour;

    public enum SpaceType {
        DESK,
        MEETING_ROOM,
        WORKSHOP,
        OFFICE,
        BOARDROOM,
        STUDIO,
        POD,
        COLLABORATION,
        TRAINING,
        PODCAST
    }
}
