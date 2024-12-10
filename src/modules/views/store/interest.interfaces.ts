export interface Interest {
  id: string;
  name: string;
  summary: string;
  lawId?: string; // Opcional, para asociar la ley si es necesario
  selected?: boolean; // Opcional, para indicar si está seleccionado
}

export interface Law {
  id: string;
  title: string;
  description: string;
  tema: string;
  tipo_norma: string;
  numero: number;
  año: number;
  descripcion_corta: string;
  ente: string;
  sistema: string;
  derogada: boolean;
  interests: Interest[];
  articles: Article[];
  pdfs: PDF[];
}

export interface Article {
  article: number;
  summary: string;
}

export interface PDF {
  id?: string;
  url: string;
}

export interface ApiResponse {
  laws: Law[];
  total: number;
}
