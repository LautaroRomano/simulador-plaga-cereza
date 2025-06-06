"use client";
import { useState } from "react";
import { tasasBrix } from "@/functions/functions";
import Form from "@/components/Form";
import { DatosEntrada, DatosSalida } from "@/types";
import ViewData from "@/components/ViewData";

export default function App() {
  //Datos de entrada
  const [datosDeEntrada, setDatosDeEntrada] = useState<DatosEntrada>({
    variedadCereza: "Lapins",
    insecticidaSeleccionado: null,
  });

  //datos de salida
  const [datosDeSalida, setDatosDeSalida] = useState<DatosSalida | null>(null);
  //console.log("🚀 ~ App ~ datosDeSalida:", datosDeSalida)

  const iniciarSimulacion = async (datos: DatosEntrada) => {
    setDatosDeEntrada(datos);

    try {
      const res = await fetch("/api/simularCosecha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (!res.ok) {
        alert("Error al iniciar la simulación");
        throw new Error("Error en la simulación");
      }
      const datosSalida: DatosSalida = await res.json();
      setDatosDeSalida(datosSalida);
    } catch (error) {
      console.error("Error al iniciar la simulación:", error);
      alert("Error al iniciar la simulación");
    }
  };

  const reset = () => {
    setDatosDeSalida(null);
    setDatosDeEntrada({
      variedadCereza: "Lapins",
      insecticidaSeleccionado: null,
    });
  };

  return (
    <main className="flex flex-col items-center bg-gray-100 w-full h-full overflow-x-hidden overflow-y-auto">
      <div className="flex w-screen h-16 bg-red-200 text-gray-950 items-center justify-between px-4">
        <h1 className="text-xl font-bold text-start">
          Simulador de Estrategias de Control de plagas en Cerezos
        </h1>
        <div className="flex item-center justify-center gap-2">
          {datosDeSalida?.dia
            ? `Simulacion de ${datosDeSalida?.dia} días`
            : "Simulación no iniciada"}
        </div>
      </div>
      <div
        className="flex w-screen items-center justify-center"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="flex w-96 h-full">
          <Form iniciarSimulacion={iniciarSimulacion} reset={reset}/>
        </div>
        <div className="flex w-full h-full ">
          {datosDeSalida ? (
            <ViewData
              data={datosDeSalida}
              insecticidaSeleccionado={datosDeEntrada.insecticidaSeleccionado}
            />
          ) : (
            <ViewData
              data={{
                poblacionPlaga: 500,
                cantidadCerezas: 0,
                cerezasDesechadas: 0,
                brix: 0,
                dia: 0,
                calidadCereza: 0,
                ganancia: 0,
                costoInsecticida: 0,
                perdidaTotal: 0,
                insecticida: "",
                arbolesTotales: 0,
                cantidadCerezasInicial: 0,
                cantidadMoscasInicial: 0,
              }}
              insecticidaSeleccionado={datosDeEntrada.insecticidaSeleccionado}
            />
          )}
        </div>
      </div>
    </main>
  );
}
