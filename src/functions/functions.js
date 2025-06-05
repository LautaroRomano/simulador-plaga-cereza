

export function simularCosecha({ variedadCereza, insecticidaSeleccionado }) {
  // Generar números aleatorios al inicio
  generarNumerosAleatorios(99999999);

  const arbolesTotales = calcularArbolesTotales();
  const cantidadCerezasInicial = calcularCantidadDeCerezas(arbolesTotales);
  const cantidadMoscasInicial = calcularCantidadDeMoscasIniciales(arbolesTotales);
  let cantidadCerezas = cantidadCerezasInicial;
  let cerezasDesechadas = 0;
  let poblacionMoscas = cantidadMoscasInicial;
  let brix = 0
  let dia = 1;
  let temperatura = 0;

  while (brix <= 18) {
    /* console.log({
      arbolesTotales,
      cantidadCerezasInicial,
      cantidadMoscasInicial,
      cantidadCerezas,
      cerezasDesechadas,
      poblacionMoscas,
      brix,
      dia,
      temperatura
    }) */

    const moscasHembras = calcularMoscasHembras(poblacionMoscas);
    for (let i = 0; i < moscasHembras; i++) {
      const cerezasOvipositadasPorMoscaPorDia = 11;
      const cd = poisson(cerezasOvipositadasPorMoscaPorDia);
      cerezasDesechadas += cd;
      cantidadCerezas -= cd;
    }
    temperatura = calcularTemperaturaPorDia(dia);
    brix += calcularBrix(temperatura);
    poblacionMoscas = calcularPoblacionMoscas(temperatura, poblacionMoscas);

    dia++;
  }

  return {
    poblacionPlaga: poblacionMoscas,
    cantidadCerezas: cantidadCerezas,
    cerezasDesechadas: cerezasDesechadas,
    brix: brix,
    dia,
    calidadCereza: 0,
    ganancia: 10 * cantidadCerezas,
    costoInsecticida: insecticidaSeleccionado ? insecticidaSeleccionado.impacto * cantidadCerezas : 0,
    perdidaTotal: cerezasDesechadas * 10 + (insecticidaSeleccionado ? insecticidaSeleccionado.impacto * cantidadCerezas : 0),
    insecticida: insecticidaSeleccionado ? insecticidaSeleccionado.nombre : "Ninguno",
  }
}

export function actualizarBrix(
  brixActual,
  temperatura,
  variedad
) {
  return brixActual + 0.2;
}

/* ----------------------------------
    CALCULAR CANTIDAD DE ARBOLES TOTALES
------------------------------------*/
export function calcularArbolesTotales() {
  return 21600 + 3600 * obtenerNumeroAleatorio();
}

/* ----------------------------------
    CALCULAR CANTIDAD DE CEREZAS
------------------------------------*/
export function calcularCantidadDeCerezas(cantidadCerezos) {
  let cantidadCerezas = 0;
  for (let i = 0; i < cantidadCerezos; i++) {
    cantidadCerezas += Math.floor(5000 + (5000 - 3000) * obtenerNumeroAleatorio());
  }
  return cantidadCerezas;
}
/* --------------------------------------------
    CALCULAR CANTIDAD TOTAL DE MOSCAS INICIALES
-----------------------------------------------*/
export function calcularCantidadDeMoscasIniciales(cantidadCerezos) {
  let cantidadMoscas = 0;
  for (let i = 0; i < cantidadCerezos; i++) {
    cantidadMoscas += Math.floor(2 + (13 - 2) * obtenerNumeroAleatorio()); //chequear 
  }
  return cantidadMoscas;
}
/* ------------------------------------
    CALCULAR CANTIDAD DE MOSCAS HEMBRAS
---------------------------------------*/

function calcularMoscasHembras(moscasTotales) {
  return Math.floor(moscasTotales / 2);
}

/* -----------------------------
      CALCULAR TEMPERATURA POR DIA
-------------------------------*/
function calcularTemperaturaPorDia(dia) {
  if (dia <= 30) {
    let temperatura = obtenerNumeroNormal(17, 7);
    return temperatura;
  }
  if (dia <= 61) {
    let temperatura = obtenerNumeroNormal(21, 8);
    return temperatura;
  }
  if (dia <= 92) {
    let temperatura = obtenerNumeroNormal(24, 10);
    return temperatura;
  }
  let temperatura = obtenerNumeroNormal(17, 7);
  return temperatura;
}

/* -----------------------------
      CALCULAR BRIX POR TEMPERATURA
-------------------------------*/
function calcularBrix(temp) {
  let brix = 0;
  if (temp < 20) brix += 0.2;
  else if (temp < 25) brix += 0.3;
  else brix += 0.4;

  return brix;
}

/* -----------------------------
      CALCULAR MOSCAS POR TEMPERATURA
-------------------------------*/
function calcularPoblacionMoscas(temperatura, poblacionAnterior) {
  let poblacionMoscas = poblacionAnterior * 0.9;

  poblacionMoscas = poblacionAnterior * 0.9; //muerte por causas naturales %10

  //Nacimientos de moscas
  if (temperatura < 15) poblacionMoscas = poblacionMoscas * 1.5;
  else if (temperatura < 20) poblacionMoscas = poblacionMoscas * 1.1;
  else if (temperatura < 25) poblacionMoscas = poblacionMoscas * 1.17;
  else poblacionMoscas = poblacionMoscas * 1.2;

  poblacionMoscas = poblacionMoscas - (poblacionMoscas * 0.064); //Muerte por insecticida

  return Math.floor(poblacionMoscas);
}

/* ----------------------------------------
    CALCULAR CANTIDAD DE CEREZAS DESECHADAS
------------------------------------------*/
function calcularCerezasDesechadas(moscasHembras) {
  for (let i = 0; i < moscasHembras; i++) {
    cerezasDesechadas += Math.floor(7 + (15 - 7) * obtenerNumeroAleatorio());
  }
  return cerezasDesechadas;
}
/* ------------------------------
          CALCULAR NORMAL
-------------------------------*/
function obtenerNumeroNormal(media = 0, desviacion = 1) {
  let u1 = obtenerNumeroAleatorio();
  console.log("🚀 ~ obtenerNumeroNormal ~ u1:", u1)
  let u2 = obtenerNumeroAleatorio();
  console.log("🚀 ~ obtenerNumeroNormal ~ u2:", u2)

  let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

  // Escalar con media y desviación estándar
  console.log(z * desviacion + media)
  return z * desviacion + media;
}

function poisson(media) {
  let L = Math.exp(-media);
  let k = 0;
  let p = 1;

  do {
    k++;
    p *= obtenerNumeroAleatorio();
  } while (p > L);

  return k - 1;
}

/* ------------------------------
    CALCULAR NUMERO ALEATORIO
-------------------------------*/
const numerosAleatorios = []
let ultimoUsado = 0;
//Generar u
function generarNumerosAleatorios(cantidad = 1000) {
  numerosAleatorios.length = 0; // Limpiar el array antes de llenarlo
  let seed = Math.random();
  const a = 17321;
  const c = 16123;
  const m = 15123;
  Array.from({ length: cantidad }).forEach((_, i) => {
    const newSeed = (a * seed + c) % m;
    const u = newSeed / m;
    numerosAleatorios.push(u);
    seed = newSeed;
  })
}
function obtenerNumeroAleatorio() { //obtener un numero aleatorio de la lista
  const num = numerosAleatorios[ultimoUsado]
  ultimoUsado++;
  return num;
}


/* ------------------------------
    CONSTANTES
-------------------------------*/
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