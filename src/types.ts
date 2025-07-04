export interface Insecticida {
  nombre: string;
  mortalidadExtra: number;
  duracion: number;
  impacto: number;
  precio: number;
  unidadesNecesarias: number;
}

export interface TasasBrix {
  baja: number;
  alta: number;
  madurez: string;
  color: string;
}


export type VariedadCereza = 'Lapins' | 'Kordia' | 'Sweetheart';

export interface DatosEntrada {
  variedadCereza: string;
  insecticidaSeleccionado: Insecticida | null;
}

export interface DatosSalida {
  dias: DiaSimulacion[];
  arbolesTotales: number;
  cantidadCerezasInicial: number;
  cantidadMoscasInicial: number;
}

export interface DiaSimulacion {
  poblacionPlaga: number;
  cantidadCerezas: number;
  cerezasDesechadas: number;
  brix: number;
  dia: number;
  calidadCereza: number;
  ganancia: number;
  costoInsecticida: number;
  perdidaTotal: number;
  insecticida: string;
}