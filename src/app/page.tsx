"use client";
import { useEffect, useState } from "react";
import { calcularCantidadCerezas, numeroAleatorio } from "@/functions/functions";
import { tasasBrix } from "@/functions/functions";
import Form from "@/components/Form";
import { Insecticida } from "@/types";
import ViewData from "@/components/ViewData";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

interface DatosEntrada {
  cantidadArboles: number;
  variedadCereza: string;
  insecticidaSeleccionado: Insecticida | null;
}

export default function App() {
  useEffect(() => {
    numeroAleatorio(); //generar numeros aleatorios al iniciar la app
  }, []);
  //Datos de entrada
  const [datosDeEntrada, setDatosDeEntrada] = useState<DatosEntrada>({
    cantidadArboles: 3000,
    variedadCereza: "Lapins",
    insecticidaSeleccionado: null,
  });

  //Datos de simulación
  const [cantidadCerezas, setCantidadCerezas] = useState(0);
  const [brix, setBrix] = useState(0);
  const [dia, setDia] = useState(0);
  const [fechaActual, setFechaActual] = useState<Date>();

  //datos de salida
  const [poblacionPlaga, setPoblacionPlaga] = useState(3000);
  const [calidadCereza, setCalidadCereza] = useState(0);

  const iniciarSimulacion = () => {
    setCantidadCerezas(calcularCantidadCerezas());
    setBrix(0);
    setDia(0);
  };

  const siguienteDia = () => {
    setDia((prev) => prev + 1);
    setPoblacionPlaga((prev) =>
      Math.max(0, prev - (datosDeEntrada.insecticidaSeleccionado?.mortalidadExtra || 0) * poblacionPlaga)
    );
    setBrix((prev) => prev + 0.1);
    setCalidadCereza((prev) => Math.min(100, prev + 5));
  };

  return (
    <main className="flex flex-col items-center bg-gray-100 w-full h-full overflow-x-hidden overflow-y-auto">
      <div className="flex w-screen h-16 bg-blue-500 items-center justify-between px-4">
        <h1 className="text-xl font-bold text-start">
          Simulador de Estrategias de Control de plagas en Cerezos
        </h1>
        <div className="flex item-center justify-center gap-2">
          <Button>
            Dia siguiente
          </Button>
          <Label className="my-auto text-white">
            Día: {dia}
          </Label>
          <Button>
            Dia siguiente
          </Button>
        </div>
      </div>
      <div
        className="flex w-screen items-center justify-center"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="flex w-96 h-full">
          <Form setDatosDeEntrada={setDatosDeEntrada} />
        </div>
        <div className="flex w-full h-full ">
          <ViewData
            poblacionPlaga={poblacionPlaga}
            cantidadCerezas={cantidadCerezas}
            brix={brix}
            dia={dia}
            tasasBrix={tasasBrix}
            insecticidaSeleccionado={datosDeEntrada.insecticidaSeleccionado}
          />
        </div>
      </div>
    </main>
  );
}
