import { Insecticida, TasasBrix, VariedadCereza } from "@/types";

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

export function actualizarBrix(
  brixActual: number,
  temperatura: number,
  variedad: VariedadCereza
): number {
  const tasasBrix: Record<VariedadCereza, TasasBrix> = {
    Lapins: { baja: 0.2, media: 0.3, alta: 0.4, madurez: 17.5 },
    Kordia: { baja: 0.2, media: 0.3, alta: 0.4, madurez: 18.0 },
    Sweetheart: { baja: 0.15, media: 0.25, alta: 0.35, madurez: 18.5 },
  };

  let incremento: number;
  if (temperatura < 20) incremento = tasasBrix[variedad].baja;
  else if (temperatura < 25) incremento = tasasBrix[variedad].media;
  else incremento = tasasBrix[variedad].alta;

  return brixActual + incremento;
}

function calcularTemperatura(mes:number): number {
  // implementar la logica para calcular una temperatura aleatoria
  const temperaturas: Record<number, number> = {
    0: 24,
    1: 22,
    10: 17,
    11: 21,
  };
  
  return temperaturas[mes] || 20;
}

function calcularCantidadDeCerezos(){
  return 21600+(25200-21600)*numeroAleatorio();
}

export function calcularCantidadCerezas() {
  const cantidadCerezos = calcularCantidadDeCerezos();
  return Math.floor(cantidadCerezos) * 20000+(70000-20000)*numeroAleatorio();
}

function numeroAleatorio(): number {
  return Math.floor(Math.random());
}
