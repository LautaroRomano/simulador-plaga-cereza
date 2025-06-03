export interface Insecticida {
    nombre: string;
    mortalidadExtra: number;
    duracion: number;
    impacto: number;
}

export interface TasasBrix {
  baja: number;
  alta: number;
  madurez: string;
  color: string;
}


export type VariedadCereza = 'Lapins' | 'Kordia' | 'Sweetheart';