export interface Space {
  id: number;
  name: string;
  description?: string;
  type: 'Aula' | 'Laboratorio' | 'Sala' | 'Otro';
  capacity: number;
  imageUrl?: string;
  availableTimes: string[];
}
