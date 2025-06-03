import { Insecticida, TasasBrix, VariedadCereza } from "@/types";

export function actualizarBrix(
  brixActual: number,
  temperatura: number,
  variedad: VariedadCereza
): number {
  return brixActual + 0.2;
}

function calcularTemperatura(mes: number): number {
  // implementar la logica para calcular una temperatura aleatoria
  const temperaturas: Record<number, number> = {
    0: 24,
    1: 22,
    10: 17,
    11: 21,
  };

  return temperaturas[mes] || 20;
}

function calcularCantidadDeCerezos() {
  return 21600 + (25200 - 21600) * numeroAleatorio();
}

export function calcularCantidadCerezas() {
  const cantidadCerezos = calcularCantidadDeCerezos();
  return (
    Math.floor(cantidadCerezos) * 20000 + (70000 - 20000) * numeroAleatorio()
  );
}

function numeroAleatorio(): number {
  return Math.floor(Math.random());
}


//constantes 
export const insecticidas: Insecticida[] = [
  { nombre: "Spinosinas", mortalidadExtra: 0.9, duracion: 14, impacto: -0.06 },
  {
    nombre: "Piretroides",
    mortalidadExtra: 0.95,
    duracion: 10,
    impacto: -0.15,
  },
  { nombre: "Carbamatos", mortalidadExtra: 0.85, duracion: 7, impacto: -0.12 },
  { nombre: "Diamidas", mortalidadExtra: 0.9, duracion: 14, impacto: -0.08 },
  {
    nombre: "Organofosforados",
    mortalidadExtra: 0.9,
    duracion: 10,
    impacto: -0.18,
  },
];

export const tasasBrix: TasasBrix[] = [
  {
    baja: 0,
    alta: 8,
    madurez: "Inmaduro 1",
    color: "green",
  },
  {
    baja: 8,
    alta: 10,
    madurez: "Inmaduro 2",
    color: "lightgreen",
  },
  {
    baja: 10,
    alta: 12,
    madurez: "Maduro 1",
    color: "yellow",
  },
  {
    baja: 12,
    alta: 14,
    madurez: "Maduro 2",
    color: "orange",
  },
  {
    baja: 14,
    alta: 16.5,
    madurez: "Maduro 3",
    color: "red",
  },
  {
    baja: 16.5,
    alta: 20,
    madurez: "Maduro 4",
    color: "darkred",
  },
];