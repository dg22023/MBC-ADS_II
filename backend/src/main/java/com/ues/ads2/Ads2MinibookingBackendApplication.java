package com.ues.ads2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Ads2MinibookingBackendApplication {
    public static void main(String[] args) {
     
        // Elimina todo el código de dotenv.
        // Spring Boot leerá automáticamente las variables
        // SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, y SPRING_DATASOURCE_PASSWORD
        // que Docker Compose le está pasando.
            
        SpringApplication.run(Ads2MinibookingBackendApplication.class, args);
    }
}