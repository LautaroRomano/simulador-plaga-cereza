"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { calcularCantidadCerezas, insecticidas, numeroAleatorio } from "@/functions/functions";
import { Check } from "lucide-react";
import Arbol from "@/components/Arbol";
import { tasasBrix } from "@/functions/functions";
import Mosca from "@/components/Mosca";

export default function App() {
  useEffect(() => {
    numeroAleatorio(); //generar numeros aleatorios al iniciar la app
  }, []);
  //Datos de entrada
  const [poblacionInicial, setPoblacionInicial] = useState(3000);
  const [variedadCereza, setVariedadCereza] = useState("Lapins");
  const [insecticidasSeleccionados, setInsecticidasSeleccionados] = useState<
    string[]
  >([]);
  const [fechaInicial, setFechaInicial] = useState<Date | null>(null);

  //Datos de simulación
  const [cantidadCerezas, setCantidadCerezas] = useState(0);
  const [brix, setBrix] = useState(0);
  const [dia, setDia] = useState(0);
  const [fechaActual, setFechaActual] = useState<Date>();

  //datos de salida
  const [poblacionPlaga, setPoblacionPlaga] = useState(poblacionInicial);
  const [calidadCereza, setCalidadCereza] = useState(0);

  const iniciarSimulacion = () => {
    setCantidadCerezas(calcularCantidadCerezas());
    setBrix(0);
    setDia(0);
  };

  const handleSelectInsecticida = (nombre: string) => {
    setInsecticidasSeleccionados((prev) =>
      prev.includes(nombre)
        ? prev.filter((item) => item !== nombre)
        : [...prev, nombre]
    );
  };

  const siguienteDia = () => {
    if (fechaInicial) {
      const insecticida = insecticidasSeleccionados.length
        ? insecticidas.find((i) => insecticidasSeleccionados.includes(i.nombre))
        : null;

      const mes = fechaInicial.getMonth();

      setDia((prev) => prev + 1);
      setPoblacionPlaga((prev) =>
        Math.max(0, prev - (insecticida?.mortalidadExtra || 0) * poblacionPlaga)
      );
      setBrix((prev) => prev + 0.1);
      setCalidadCereza((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold text-center">
        Simulador de Estrategias de Control de plagas en Cerezos
      </h1>
      <div className="flex gap-4">
        {/* Panel de Entrada de Datos */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Parámetros Iniciales</h2>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 items-center">
            <div className="flex flex-col gap-2">
              <Label>Población Inicial de Plaga</Label>
              <Input
                type="number"
                value={poblacionInicial}
                onChange={(e) => setPoblacionInicial(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>Variedad de Cereza</Label>
              <Select value={variedadCereza} onValueChange={setVariedadCereza}>
                <SelectTrigger>
                  <span>{variedadCereza}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lapins">Lapins</SelectItem>
                  <SelectItem value="Kordia">Kordia</SelectItem>
                  <SelectItem value="Sweetheart">Sweetheart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>Insecticidas a utilizar</Label>
              {insecticidas.map((insecticida) => (
                <div
                  key={insecticida.nombre}
                  className="flex items-start justify-start"
                >
                  <button
                    className="flex border w-4 h-4"
                    onClick={() => handleSelectInsecticida(insecticida.nombre)}
                  >
                    {insecticidasSeleccionados.includes(insecticida.nombre) && (
                      <Check className="text-green-500 -mt-1" />
                    )}
                  </button>
                  <Label htmlFor={insecticida.nombre} className="ml-2">
                    {insecticida.nombre}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>Fecha Inicial (Solo Noviembre y Diciembre)</Label>
              <Input
                type="date"
                value={
                  fechaInicial ? fechaInicial.toISOString().split("T")[0] : ""
                }
                min={`${new Date().getFullYear()}-11-01`}
                max={`${new Date().getFullYear()}-12-31`}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  const month = date.getMonth() + 1; // JavaScript months are 0-indexed

                  if (month === 11 || month === 12) {
                    setFechaInicial(date);
                  } else {
                    alert(
                      "Solo se permiten fechas de Noviembre (11) y Diciembre (12)"
                    );
                  }
                }}
              />
              <p className="text-sm text-gray-600">
                Ten en cuenta que la simulación inicia <br />
                desde que el fruto comienza a crecer
              </p>
            </div>
            <Button onClick={iniciarSimulacion}>Iniciar Simulación</Button>
          </CardContent>
        </Card>
      </div>

      {/* Pestañas para vistas adicionales */}
      <div className="flex flex-col">
        <p className="text-center">
          Gráficos de la simulación. <br />
          Población de Plaga: {poblacionPlaga} <br />
          Cantidad de Cerezas: {cantidadCerezas} <br />
          Brix: {brix.toFixed(2)} <br />
          Día: {dia} <br />
          Fecha Actual:{" "}
          {fechaActual
            ? fechaActual.toLocaleDateString()
            : "Fecha no establecida"}
        </p>
        <div className="grid grid-cols-10 items-center justify-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Arbol
              key={i}
              colorFruta={
                tasasBrix.find((tb) => tb.baja <= brix && tb.alta > brix)?.color
              }
            />
          ))}
          {Array.from({ length: poblacionPlaga / 100 }).map((_, index) => (
            <Mosca
              key={index}
              colorCuerpo={
                insecticidasSeleccionados.length > 0 ? "red" : "black"
              }
              colorAlas={
                insecticidasSeleccionados.length > 0 ? "darkred" : "gray"
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}
