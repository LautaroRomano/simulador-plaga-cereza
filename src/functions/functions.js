import { Insecticida, TasasBrix, VariedadCereza } from "@/types";

export function actualizarBrix(
  brixActual,
  temperatura,
  variedad
) {
  return brixActual + 0.2;
}

function calcularTemperatura(mes) {
  // implementar la logica para calcular una temperatura aleatoria
  const temperaturas = {
    0: 24,
    1: 22,
    10: 17,
    11: 21,
  };

  return temperaturas[mes] || 20;
}

let cantidadCerezas = 0;
let cerezasDesechadas = 0;
let cantidadMoscas = 0;

/* ----------------------------------
    CALCULAR CANTIDAD DE CEREZAS
------------------------------------*/
function calcularCantidadDeCerezas()
{
  const cantidadCerezos = 25000; //Cantidad de cerezos
  for (let i = 0; i < cantidadCerezos; i++) 
    {
      Math.floor(cantidadCerezas += 5000 + (5000 - 3000) * obtenerNumeroAleatorio());
    }
  return cantidadCerezas;
}
/* --------------------------------------------
    CALCULAR CANTIDAD TOTAL DE MOSCAS INICIALES
-----------------------------------------------*/
function calcularCantidadDeMoscasIniciales() {
  const cantidadCerezos = calcularCantidadDeCerezos();
  for (let i = 0; i < cantidadCerezos; i++) 
    {
      cantidadMoscas += Math.floor(cantidadCerezas += 2 + (13 - 2) * obtenerNumeroAleatorio());
    }
  return cantidadMoscas;
}
/* ------------------------------------
    CALCULAR CANTIDAD DE MOSCAS HEMBRAS
---------------------------------------*/

function calcularMoscasHembras(moscasTotales)
{
  return Math.floor(moscasTotales / 2);
}

/* -----------------------------
        CALCULAR EL BRIX
-------------------------------*/
function calcularBrix(temp, brix) 
{
  if (temp < 20) brix += 0.2;
  else if (temp <25) brix += 0.3;
  else brix += 0.4;

  return brix;
}

/* -----------------------------
      CALCULAR MOSCAS TOTALES
-------------------------------*/
function calcularMoscasTotales()
{
  let poblacionMoscas = calcularCantidadDeMoscasIniciales();
  let dia = 1;
  let brix;
  while (brix <= 18)  
    {
      let moscasHembras = calcularMoscasHembras(poblacionMoscas);
      cerezasDesechadas += calcularCerezasDesechadas(moscasHembras);
      
      if(dia <= 30)
        {
          let temperatura = obtenerNumeroNormal(17, 7);
          brix += calcularBrix(temperatura, brix);
          poblacionMoscas = poblacionMoscas * 0.9; 
        }
      else if(dia <= 61)
        {
          let temperatura = obtenerNumeroNormal(21, 8);
          brix += calcularBrix(temperatura, brix);
          poblacionMoscas = poblacionMoscas * 0.9; 
        }
      else if(dia <= 92)
        {
          let temperatura = obtenerNumeroNormal(24, 10);
          brix += calcularBrix(temperatura, brix);
          poblacionMoscas = poblacionMoscas * 0.9; 
        }
      else
        {
          let temperatura = obtenerNumeroNormal(17, 7);
          brix += calcularBrix(temperatura, brix);
          poblacionMoscas = poblacionMoscas * 0.9; 
        }
      //TO DO: Pasar estos if a una funcion aparte
      if(temperatura < 15) poblacionMoscas = poblacionMoscas * 1.5; 
      else if(temperatura < 20) poblacionMoscas = poblacionMoscas * 1.1;
      else if(temperatura < 25) poblacionMoscas = poblacionMoscas * 1.17;
      else poblacionMoscas = poblacionMoscas * 1.2;

      poblacionMoscas = poblacionMoscas -(poblacionMoscas * 0.064); 

      dia++;
    }
}

/* ----------------------------------------
    CALCULAR CANTIDAD DE CEREZAS DESECHADAS
------------------------------------------*/
function calcularCerezasDesechadas(moscasHembras)
{
  for (let i = 0 ; i < moscasHembras; i++)
    {
      cerezasDesechadas += Math.floor(7 + (15 - 7) * obtenerNumeroAleatorio());
    }
    return cerezasDesechadas;
}
/* ------------------------------
          CALCULAR NORMAL
-------------------------------*/

function obtenerNumeroNormal(media = 0, desviacion = 1) {
  let u1 = Math.random();
  let u2 = Math.random();

  // Box-Muller transform
  let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

  // Escalar con media y desviación estándar
  return z * desviacion + media;
}

/* ------------------------------
    CALCULAR NUMERO ALEATORIO
-------------------------------*/
const numerosAleatorios = []
const ultimoUsado = 0;
//Generar u
export function numeroAleatorio() {
  let seed = Math.random();
  const a = 17321;
  const c = 16123;
  const m = 15123;
  Array.from({ length: 1000 }).forEach((_, i) => {
    const newSeed = (a * seed + c) % m;
    const u = newSeed/m;
    numerosAleatorios.push(u);
    seed = newSeed;
  })
}

function obtenerNumeroAleatorio() { //obtener un numero aleatorio de la lista
  const num = numerosAleatorios[ultimoUsado]
  ultimoUsado++;
  return num;
}

//constantes 
export const insecticidas = [
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
export const tasasBrix = [
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