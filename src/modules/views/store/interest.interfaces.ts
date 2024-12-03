export interface Interest {
  id: string;
  name: string;
  lawId?: string; // Opcional, para asociar la ley si es necesario
  selected?: boolean; // Opcional, para indicar si está seleccionado
}

export interface Law {
  id: string;
  title: string;
  interests: Interest[];
}

export interface ApiResponse {
  laws: Law[];
  total: number;
}
