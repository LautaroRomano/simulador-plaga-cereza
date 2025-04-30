"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "../components/carts/line-chart";
import { DonutChart } from "../components/carts/donut-chart";
import { ContaminationIndicator } from "../components/carts/contamination-indicator";

export default function PestSimulator() {
  const [insecticideAmount, setInsecticideAmount] = useState("1.5");
  const [insecticideType, setInsecticideType] = useState("Quimico");
  const [initialPopulation, setInitialPopulation] = useState("500");
  const [insecticidePrice, setInsecticidePrice] = useState("120");
  const [duration, setDuration] = useState("10");
  const [isSimulating, setIsSimulating] = useState(false);
  const [cherryPricePerKg, setCherryPricePerKg] = useState("5000"); // Precio por kg de cerezas
  const [estimatedProduction, setEstimatedProduction] = useState("1000"); // Producción estimada total en kg

  const [results, setResults] = useState({
    populationData: [] as { x: number; y: number }[],
    affectedFruitPercentage: 0,
    contaminationLevel: "low", // low, medium, high
    // Nuevos campos de resultados
    insecticideCost: 0, // Costo total del insecticida
    lostFruitKg: 0, // Kilos de fruta perdidos
    lostFruitValue: 0, // Valor monetario de la fruta perdida
    totalRevenue: 0, // Ingresos totales sin pérdidas
    finalProfit: 0, // Ganancia final después de pérdidas y costos
  });

  // Reset simulation
  const handleReset = () => {
    setInsecticideAmount("1.5");
    setInsecticideType("Quimico");
    setInitialPopulation("500");
    setDuration("10");
    setResults({
      populationData: [],
      affectedFruitPercentage: 0,
      contaminationLevel: "low",
      // Resetear también los nuevos campos
      insecticideCost: 0,
      lostFruitKg: 0,
      lostFruitValue: 0,
      totalRevenue: 0,
      finalProfit: 0,
    });
    setIsSimulating(false);
  };

  // Start simulation
  const handleStartSimulation = () => {
    setIsSimulating(true);

    // Generate simulation data based on inputs
    const weeks = Number.parseInt(duration);
    const initialPop = Number.parseInt(initialPopulation);
    const insecticideAmountValue = Number.parseFloat(insecticideAmount);
    const insecticidePriceValue = Number.parseFloat(insecticidePrice);
    const cherryPriceValue = Number.parseFloat(cherryPricePerKg);
    const totalProductionKg = Number.parseFloat(estimatedProduction);

    // Simple simulation algorithm (this would be more complex in a real app)
    const populationData = Array.from({ length: weeks + 1 }, (_, i) => {
      // Growth rate affected by insecticide amount (inverse relationship)
      const growthRate = 0.3 - insecticideAmountValue * 0.05;
      // Population grows exponentially but is limited by insecticide
      return {
        x: i,
        y: Math.round(initialPop * Math.exp(growthRate * i)),
      };
    });

    // Calculate affected fruit percentage based on final population
    const maxPopulation = 1000;
    const finalPopulation = populationData[populationData.length - 1].y;
    const affectedPercentage = Math.min(
      85,
      Math.round((finalPopulation / maxPopulation) * 100)
    );

    // Determine contamination level based on insecticide amount and type
    let contaminationLevel = "low";
    if (insecticideAmountValue > 2) {
      contaminationLevel = "high";
    } else if (insecticideAmountValue > 1) {
      contaminationLevel = "medium";
    }

    // Calcular los nuevos valores económicos
    const insecticideCost = insecticideAmountValue * insecticidePriceValue;
    const lostFruitKg = (affectedPercentage / 100) * totalProductionKg;
    const lostFruitValue = lostFruitKg * cherryPriceValue;
    const totalRevenue = totalProductionKg * cherryPriceValue;
    const finalProfit = totalRevenue - lostFruitValue - insecticideCost;

    setResults({
      populationData,
      affectedFruitPercentage: affectedPercentage,
      contaminationLevel,
      insecticideCost,
      lostFruitKg,
      lostFruitValue,
      totalRevenue,
      finalProfit,
    });
  };

  // Export results
  const handleExportResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "simulacion-resultados.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold text-center mb-6">
        Simulador de Control de Plagas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Entry Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Panel de entrada de datos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="insecticide-amount" className="block">
                Cantidad de insecticida aplicado:
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  id="insecticide-amount"
                  type="number"
                  value={insecticideAmount}
                  onChange={(e) => setInsecticideAmount(e.target.value)}
                  className="w-full"
                  placeholder="L litros"
                />
                <label className="block">Litros</label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="insecticide-type" className="block">
                Tipo de insecticida:
              </label>
              <Select
                value={insecticideType}
                onValueChange={setInsecticideType}
              >
                <SelectTrigger id="insecticide-type" className="w-full">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Quimico">Quimico</SelectItem>
                  <SelectItem value="Biologico">Biologico</SelectItem>
                  <SelectItem value="Organico">Organico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="insecticidePrice" className="block">
                Precio del insecticida por litro:
              </label>
              <div className="flex gap-2 items-center">
                <label htmlFor="">$</label>
                <Input
                  id="insecticidePrice"
                  type="number"
                  value={insecticidePrice}
                  onChange={(e) => setInsecticidePrice(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="initial-population" className="block">
                Población inicial de la plaga:
              </label>
              <Input
                id="initial-population"
                type="number"
                value={initialPopulation}
                onChange={(e) => setInitialPopulation(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="cherry-price" className="block">
                Precio de venta de cereza por kilo:
              </label>
              <div className="flex gap-2 items-center">
                <label htmlFor="">$</label>
                <Input
                  id="cherry-price"
                  type="number"
                  value={cherryPricePerKg}
                  onChange={(e) => setCherryPricePerKg(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="estimated-production" className="block">
                Producción estimada total:
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  id="estimated-production"
                  type="number"
                  value={estimatedProduction}
                  onChange={(e) => setEstimatedProduction(e.target.value)}
                  className="w-full"
                />
                <label className="block">Kilos</label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Panel de resultados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-center mb-2">
                Población de mosca de alas manchadas
              </h3>
              <div className="h-[200px]">
                <LineChart data={results.populationData} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-center mb-2">
                  Porcentaje de fruta afectada
                </h3>
                <div className="h-[120px] flex justify-center">
                  <DonutChart percentage={results.affectedFruitPercentage} />
                </div>
              </div>

              <div>
                <h3 className="text-center mb-2">
                  Nivel de contaminación del fruto
                </h3>
                <div className="h-[120px] flex justify-center items-center">
                  <ContaminationIndicator level={results.contaminationLevel} />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-center mb-4 font-semibold">
                Análisis Económico
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between border-b pb-1">
                  <span>Costo de insecticida:</span>
                  <span className="font-medium">
                    ${results.insecticideCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Fruta perdida:</span>
                  <span className="font-medium">
                    {results.lostFruitKg.toFixed(2)} kg ($
                    {results.lostFruitValue.toLocaleString()})
                  </span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Ingreso potencial total:</span>
                  <span className="font-medium">
                    ${results.totalRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Ganancia final estimada:</span>
                  <span
                    className={
                      results.finalProfit < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    ${results.finalProfit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        {!(isSimulating && results.populationData.length > 0) ? (
          <Button
            onClick={handleStartSimulation}
            className="min-w-[160px]"
            disabled={isSimulating && results.populationData.length > 0}
          >
            Iniciar simulación
          </Button>
        ) : (
          <Button
            onClick={handleReset}
            variant="default"
            className="min-w-[160px]"
          >
            Reiniciar simulación
          </Button>
        )}
        <Button
          onClick={handleExportResults}
          variant="outline"
          className="min-w-[160px]"
          disabled={!results.populationData.length}
        >
          Exportar resultados
        </Button>

        <div className="flex items-center gap-2">
          <span>Duración:</span>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
          <span>dias</span>
        </div>
      </div>
    </div>
  );
}
