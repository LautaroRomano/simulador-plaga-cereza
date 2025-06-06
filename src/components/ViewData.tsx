import { DatosSalida, Insecticida } from "@/types";
import Arbol from "./Arbol";
import Mosca from "./Mosca";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { tasasBrix } from "@/functions/functions";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Props {
  data: DatosSalida;
  insecticidaSeleccionado?: Insecticida | null;
}

const COLORS = ["#c41c00", "#ff6659"];

export default function ViewData({ data, insecticidaSeleccionado }: Props) {
  // Simulación de datos históricos para los gráficos
  // En una implementación real, estos datos vendrían acumulados día a día
  const generarDatosHistoricos = () => {
    const dias = Array.from({ length: data.dia || 1 }, (_, i) => i + 1);
    return dias.map((dia) => ({
      dia,
      poblacion: Math.round(data.poblacionPlaga * (dia / (data.dia || 1))),
      cerezas: Math.round(data.cantidadCerezas * (dia / (data.dia || 1))),
      brix: (data.brix * (dia / (data.dia || 1))).toFixed(1),
      ganancia: Math.round(data.ganancia * (dia / (data.dia || 1))),
      perdida: Math.round(data.perdidaTotal * (dia / (data.dia || 1))),
    }));
  };

  const datosHistoricos = generarDatosHistoricos();

  const datosPastel = [
    { name: "Cerezas Aprovechadas", value: data.cantidadCerezas },
    { name: "Cerezas Desechadas", value: data.cerezasDesechadas },
  ];

  return (
    <div className="w-full h-full bg-red-50 rounded-xl overflow-y-auto p-4">
      <h2 className="text-2xl font-bold text-red-800 mb-4">
        Simulación: Día {data.dia}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Tarjetas con métricas principales */}
        <Card className="bg-white">
          <CardHeader className=" border-b border-red-700 text-red-700 pt-4 flex items-center justify-between">
            <CardTitle className="text-lg">Datos Económicos</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-red-700 text-sm">Ganancia</span>
                <span className="text-2xl font-bold">
                  ${data.ganancia.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-700 text-sm">Costo Insecticida</span>
                <span className="text-2xl font-bold">
                  ${data.costoInsecticida.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-700 text-sm">Pérdida Total</span>
                <span className="text-2xl font-bold">
                  ${data.perdidaTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-700 text-sm">Calidad de Cereza</span>
                <span className="text-2xl font-bold">
                  {data.calidadCereza.toFixed(1)}/100
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className=" border-b border-red-700 text-red-700 pt-4 flex items-center justify-between">
            <CardTitle className="text-lg">Produccion</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex h-40 items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={datosPastel}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {datosPastel.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col">
                <span className="text-red-700 text-sm">Cerezas Totales</span>
                <span className="text-xl font-bold">
                  {(
                    data.cantidadCerezasInicial
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-red-700 text-sm">Cerezas desechadas</span>
                <span className="text-xl font-bold">
                  {(data.cerezasDesechadas || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visualización de árboles y moscas */}
      <Card className="mb-4 ">
        <CardHeader className=" border-b border-red-700 text-red-700 pt-4 flex items-center justify-between">
          <CardTitle className="text-lg">
            Visualización de la plantacion {data.arbolesTotales} Árboles
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-10 items-center justify-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <Arbol
                  key={i}
                  colorFruta={
                    tasasBrix.find(
                      (tb) => tb.baja <= data.brix && tb.alta > data.brix
                    )?.color || "#ff0000"
                  }
                />
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-red-800 font-medium mb-2">
                Población de Moscas: {data.poblacionPlaga.toLocaleString()}
              </h3>
              <div className="grid grid-cols-10 sm:grid-cols-15 items-center justify-center gap-1 max-h-24 overflow-y-auto bg-red-50 p-2 rounded-lg">
                {Array.from({
                  length: Math.min(150, Math.ceil(data.poblacionPlaga / 100)),
                }).map((_, index) => (
                  <Mosca
                    key={index}
                    colorCuerpo={!!insecticidaSeleccionado ? "red" : "black"}
                    colorAlas={!!insecticidaSeleccionado ? "darkred" : "gray"}
                  />
                ))}
              </div>
              {data.poblacionPlaga > 15000 && (
                <p className="text-xs text-red-600 mt-1">
                  Mostrando representación parcial de la población
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos de datos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="">
          <CardHeader className=" border-b border-red-700 text-red-700 pt-4 flex items-center justify-between">
            <CardTitle className="text-lg">Evolución de la Plaga</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={datosHistoricos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="dia"
                    label={{
                      value: "Días",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Area
                    type="monotone"
                    dataKey="poblacion"
                    stroke="#c41c00"
                    fill="#ff6659"
                    name="Población de Moscas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader className=" border-b border-red-700 text-red-700 pt-4 flex items-center justify-between">
            <CardTitle className="text-lg">
              Brix promedio de las cerezas
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={datosHistoricos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="dia"
                    label={{
                      value: "Días",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="brix"
                    stroke="#ff9e80"
                    name="Índice Brix"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className=" md:col-span-2">
          <CardHeader className=" border-b border-red-700 text-red-700 pt-4 flex items-center justify-between">
            <CardTitle className="text-lg">Análisis Económico</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datosHistoricos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="dia"
                    label={{
                      value: "Días",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Legend />
                  <Bar dataKey="ganancia" fill="#4caf50" name="Ganancia" />
                  <Bar dataKey="perdida" fill="#f44336" name="Pérdida" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
