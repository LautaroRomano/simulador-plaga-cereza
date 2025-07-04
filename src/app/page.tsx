"use client";
import { useState } from "react";
import Form from "@/components/Form";
import { DatosEntrada, DatosSalida } from "@/types";
import ViewData from "@/components/ViewData";

export default function App() {

  //datos de salida
  const [datosDeSalida, setDatosDeSalida] = useState<DatosSalida | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);

  const iniciarSimulacion = async (datos: DatosEntrada) => {
    setCargando(true);

    try {
      const res = await fetch("/api/simularCosecha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (!res.ok) {
        throw new Error("Error en la simulación");
      }
      const datosSalida: DatosSalida = await res.json();
      setDatosDeSalida(datosSalida);
    } catch (error) {
      console.error("Error al iniciar la simulación:", error);
      alert("Error al iniciar la simulación");
    } finally {
      setCargando(false);
    }
  };

  const reset = () => {
    setDatosDeSalida(null);
  };

  return (
    <main className="flex flex-col items-center bg-gray-100 w-full h-full overflow-x-hidden overflow-y-auto">
      <div className="flex w-screen h-16 bg-red-200 text-gray-950 items-center justify-between px-4">
        <h1 className="text-xl font-bold text-start">
          Simulador de Estrategias de Control de plagas en Cerezos
        </h1>
        {!!datosDeSalida ? (
        <div className="flex item-center justify-center gap-2">
          {datosDeSalida.dias.length > 0
            ? `Simulación de ${datosDeSalida.dias.length} días`
            : "Simulación no iniciada"}
        </div>
        ):(
          <div className="flex item-center justify-center gap-2">
            Simulación no iniciada
          </div>
        )}
      </div>
      <div
        className="flex w-screen items-center justify-center"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="flex w-96 h-full">
          <Form iniciarSimulacion={iniciarSimulacion} reset={reset}/>
        </div>
        <div className="flex w-full h-full ">
          <ViewData
            data={datosDeSalida || {
              dias: [],
              arbolesTotales: 0,
              cantidadCerezasInicial: 0,
              cantidadMoscasInicial: 0,
            }}
            cargando={cargando}
          />
        </div>
      </div>
    </main>
  );
}
