// Modelo para el espacio (la sala, oficina, etc.)
export interface Space {
  id: string;
  name: string;
  capacity: number;
}

export interface Booking {
  id: string;
  spaceId: string; // ID del espacio reservado
  userId: string;  // ID del usuario (simulado)
  startTime: Date; // Fecha y hora de inicio
  endTime: Date;   // Fecha y hora de fin

}
