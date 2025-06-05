"use client";
import { useState } from "react";
import { simularCosecha } from "@/functions/functions";
import { tasasBrix } from "@/functions/functions";
import Form from "@/components/Form";
import { Insecticida } from "@/types";
import ViewData from "@/components/ViewData";

interface DatosEntrada {
  variedadCereza: string;
  insecticidaSeleccionado: Insecticida | null;
}

interface DatosSalida {
  poblacionPlaga: number;
  cantidadCerezas: number;
  cerezasDesechadas: number;
  brix: number;
  dia: number;
  calidadCereza: number;
  ganancia: number;
  costoInsecticida: number;
  perdidaTotal: number;
}


export default function App() {

  //Datos de entrada
  const [datosDeEntrada, setDatosDeEntrada] = useState<DatosEntrada>({
    variedadCereza: "Lapins",
    insecticidaSeleccionado: null,
  });

  //datos de salida
  const [datosDeSalida, setDatosDeSalida] = useState<DatosSalida | null>(null);
  //console.log("🚀 ~ App ~ datosDeSalida:", datosDeSalida)

  const iniciarSimulacion = (datos: DatosEntrada) => {
    setDatosDeEntrada(datos);

    const datosSalida = simularCosecha(datos)
    setDatosDeSalida(datosSalida);
  };

  return (
    <main className="flex flex-col items-center bg-gray-100 w-full h-full overflow-x-hidden overflow-y-auto">
      <div className="flex w-screen h-16 bg-blue-500 items-center justify-between px-4">
        <h1 className="text-xl font-bold text-start">
          Simulador de Estrategias de Control de plagas en Cerezos
        </h1>
        <div className="flex item-center justify-center gap-2">
          {datosDeSalida?.dia ?
            `Simulacion de ${datosDeSalida?.dia} días`
            : "Simulación no iniciada"}
        </div>
      </div>
      <div
        className="flex w-screen items-center justify-center"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="flex w-96 h-full">
          <Form iniciarSimulacion={iniciarSimulacion} />
        </div>
        <div className="flex w-full h-full ">
          {datosDeSalida ? (
            <ViewData
              poblacionPlaga={datosDeSalida.poblacionPlaga}
              cantidadCerezas={datosDeSalida.cantidadCerezas}
              brix={datosDeSalida.brix}
              dia={datosDeSalida.dia}
              tasasBrix={tasasBrix}
              insecticidaSeleccionado={datosDeEntrada.insecticidaSeleccionado}
            />
          ) : (
            <ViewData
              poblacionPlaga={500}
              cantidadCerezas={0}
              brix={0}
              dia={0}
              tasasBrix={tasasBrix}
              insecticidaSeleccionado={datosDeEntrada.insecticidaSeleccionado}
            />
          )
          }
        </div>
      </div>
    </main>
  );
}
