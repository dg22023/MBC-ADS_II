// Modelo para el espacio (la sala, oficina, etc.)
export interface Space {
  id: number;
  name: string;
  type: 'DESK' | 'MEETING_ROOM';
  capacity: number;
}

export interface Booking {
  id: number;
  spaceId: number; // ID del espacio reservado
  userId: number;  // ID del usuario
  startTime: Date; // Fecha y hora de inicio
  endTime: Date;   // Fecha y hora de fin
}

// DTO para crear una reserva (enviar al backend)
export interface CreateBookingRequest {
  userId: number;
  spaceId: number;
  startTime: string; // ISO 8601 format
  endTime: string;   // ISO 8601 format
}

// DTO de respuesta del backend
export interface BookingResponse {
  id: number;
  userId: number;
  userName: string;
  spaceId: number;
  spaceName: string;
  spaceType: string;
  startTime: string;
  endTime: string;
  message: string;
}
