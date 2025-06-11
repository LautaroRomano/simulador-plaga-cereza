export function simularCosecha({ variedadCereza, insecticidaSeleccionado }) {
  const precioCereza =
    variedadCereza === "Lapins"
      ? 4.19
      : variedadCereza === "Kordia"
      ? 3.59
      : variedadCereza === "Sweetheart"
      ? 3.99
      : 4.19;
  const brixNecesario =
    variedadCereza === "Lapins"
      ? 17.5
      : variedadCereza === "Kordia"
      ? 18
      : variedadCereza === "Sweetheart"
      ? 18.5
      : 18;
  const arbolesTotales = calcularArbolesTotales();
  const cantidadCerezasInicial = calcularCantidadDeCerezas(arbolesTotales);
  const cantidadMoscasInicial =
    calcularCantidadDeMoscasIniciales(arbolesTotales);
  let cantidadCerezas = cantidadCerezasInicial;
  let cerezasDesechadas = 0;
  let poblacionMoscas = cantidadMoscasInicial;
  let brix = 0;
  let dia = 1;
  let temperatura = 0;

  const datosSalida = {
    arbolesTotales,
    cantidadCerezasInicial,
    cantidadMoscasInicial,
    dias: [],
  };

  if (!insecticidaSeleccionado) {
    insecticidaSeleccionado = {
      nombre: "Ninguno",
      mortalidadExtra: 0,
      duracion: 1,
      impacto: 0,
      precio: 0,
      unidadesNecesarias: 0,
    };
  }

  while (brix <= brixNecesario) {
    const moscasHembras = calcularMoscasHembras(poblacionMoscas);
    for (let i = 0; i < moscasHembras; i++) {
      const cerezasOvipositadasPorMoscaPorDia = 4;
      const cd = poisson(cerezasOvipositadasPorMoscaPorDia); //cerezas desechadas por mosca por dia
      cerezasDesechadas += cd;
      cantidadCerezas = Math.max(0, cantidadCerezas - cd);
    }
    temperatura = calcularTemperaturaPorDia(dia);
    brix += calcularBrix(temperatura);
    poblacionMoscas = Math.min(
      1000000,
      Math.max(
        0,
        calcularPoblacionMoscas(
          temperatura,
          poblacionMoscas,
          insecticidaSeleccionado
        )
      )
    );

    const cantidadAplicaciones = Math.ceil(
      dia / insecticidaSeleccionado.duracion
    );
    const costoInsec =
      cantidadAplicaciones *
      insecticidaSeleccionado.precio *
      insecticidaSeleccionado.unidadesNecesarias;

    datosSalida.dias.push({
      poblacionPlaga: poblacionMoscas,
      cantidadCerezas: cantidadCerezas,
      cerezasDesechadas: cerezasDesechadas,
      brix: brix,
      dia,
      calidadCereza: Math.max(
        10,
        100 + insecticidaSeleccionado.impacto * cantidadAplicaciones
      ),
      ganancia: precioCereza * (cantidadCerezas / 100),
      costoInsecticida: costoInsec,
      perdidaTotal: costoInsec + (cerezasDesechadas / 100) * precioCereza,
      insecticida: insecticidaSeleccionado
        ? insecticidaSeleccionado.nombre
        : "Ninguno",
    });

    dia++;
  }

  return datosSalida;
}

/* ----------------------------------
    CALCULAR CANTIDAD DE ARBOLES TOTALES
------------------------------------*/
export function calcularArbolesTotales() {
  return Math.floor(21600 + 3600 * obtenerNumeroAleatorio());
  //return Math.floor(21.6 + 3.6 * obtenerNumeroAleatorio());
}

/* ----------------------------------
    CALCULAR CANTIDAD DE CEREZAS
------------------------------------*/
export function calcularCantidadDeCerezas(cantidadCerezos) {
  if (cantidadCerezos <= 0) return 0;
  let cantidadCerezas = 0;
  for (let i = 0; i < cantidadCerezos; i++) {
    cantidadCerezas += Math.floor(
      5000 + (5000 - 3000) * obtenerNumeroAleatorio()
    );
  }
  return cantidadCerezas;
}

/* --------------------------------------------
    CALCULAR CANTIDAD TOTAL DE MOSCAS INICIALES
-----------------------------------------------*/
export function calcularCantidadDeMoscasIniciales(cantidadCerezos) {
  let cantidadMoscas = 0;
  for (let i = 0; i < cantidadCerezos; i++) {
    cantidadMoscas += Math.floor(2 + (13 - 2) * obtenerNumeroAleatorio());
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
  if (typeof temp !== "number" || isNaN(temp)) {
    console.error("Invalid temperature value:", temp);
    return 0;
  }

  return temp < 20 ? 0.2 : temp < 25 ? 0.3 : 0.4;
}

/* -----------------------------
      CALCULAR MOSCAS POR TEMPERATURA
-------------------------------*/
function calcularPoblacionMoscas(temperatura, poblacionAnterior, insecticida) {
  let poblacionMoscas = poblacionAnterior * 0.9; //muerte por causas naturales %10

  if (temperatura < 15) poblacionMoscas = poblacionMoscas * 1.3;
  else if (temperatura < 20) poblacionMoscas = poblacionMoscas * 1.5;
  else if (temperatura < 25) poblacionMoscas = poblacionMoscas * 1.6;
  else poblacionMoscas = poblacionMoscas * 1.75;

  poblacionMoscas =
    poblacionMoscas - poblacionMoscas * (insecticida?.mortalidadExtra || 0);

  const poblacionMinima = 200 + 800 * obtenerNumeroAleatorio();

  return Math.max(poblacionMinima, Math.floor(poblacionMoscas));
}
/* ------------------------------
          CALCULAR NORMAL
-------------------------------*/
function obtenerNumeroNormal(media = 0, desviacion = 1) {
  let u1 = obtenerNumeroAleatorio();
  let u2 = obtenerNumeroAleatorio();

  let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

  // Escalar con media y desviación estándar
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
// Configuración para el generador lineal congruencial
const a = 1664525;
const c = 1013904223;
const m = Math.pow(2, 32);

let seed = Date.now() % m;

function obtenerNumeroAleatorio() {
  seed = (a * seed + c) % m;
  return seed / m;
}

/* ------------------------------
    CONSTANTES
-------------------------------*/
export const insecticidas = [
  {
    nombre: "Spinosinas",
    mortalidadExtra: 0.3,
    duracion: 14,
    impacto: -6,
    precio: 73,
    unidadesNecesarias: 13,
  },
  {
    nombre: "Piretroides",
    mortalidadExtra: 0.25,
    duracion: 10,
    impacto: -7,
    precio: 37,
    unidadesNecesarias: 53,
  },
  {
    nombre: "Carbamatos",
    mortalidadExtra: 0.35,
    duracion: 12,
    impacto: -5,
    precio: 75,
    unidadesNecesarias: 26,
  },
  {
    nombre: "Organofosforados",
    mortalidadExtra: 0.25,
    duracion: 10,
    impacto: -8,
    precio: 11,
    unidadesNecesarias: 21,
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
