package com.ues.ads2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SegurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Deshabilitar CSRF que es común para APIs stateless
                .csrf(csrf -> csrf.disable())
                // Definir las reglas de autorización
                .authorizeHttpRequests(auth -> auth
                        // Permitir todas las peticiones a tus endpoints de spaces
                        .requestMatchers("/api/v1/spaces/**").permitAll()
                        // Requerir autenticación para cualquier otra petición (opcional por ahora)
                        .anyRequest().authenticated());

        return http.build();
    }
}
