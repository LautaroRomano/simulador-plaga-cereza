export interface Insecticida {
    nombre: string;
    mortalidadExtra: number;
    duracion: number;
    impacto: number;
}

export interface TasasBrix {
  baja: number;
  media: number;
  alta: number;
  madurez: number;
}

export type VariedadCereza = 'Lapins' | 'Kordia' | 'Sweetheart';