import { Insecticida, TasasBrix } from "@/types";
import Arbol from "./Arbol";
import Mosca from "./Mosca";
import { Card, CardContent, CardHeader } from "./ui/card";

interface Props {
    poblacionPlaga: number;
    cantidadCerezas: number;
    brix: number;
    dia: number;
    tasasBrix: TasasBrix[];
    insecticidaSeleccionado: Insecticida | null;
}

export default function ViewData({ poblacionPlaga, cantidadCerezas, brix, dia, tasasBrix, insecticidaSeleccionado }: Props) {
    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">Datos del dia {dia}</h2>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 items-center">
                <div className="flex flex-col">
                    <p className="text-center">
                        Población de Plaga: {poblacionPlaga} <br />
                        Cantidad de Cerezas: {cantidadCerezas} <br />
                        Brix total: {brix.toFixed(2)} <br />
                        Maduracion: {tasasBrix.find((tb) => tb.baja <= brix && tb.alta > brix)?.madurez || "Desconocida"} <br />
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
                    </div>
                    <div className="grid grid-cols-15 items-center justify-center gap-2">

                        {Array.from({ length: poblacionPlaga / 100 }).map((_, index) => (
                            <Mosca
                                key={index}
                                colorCuerpo={
                                    !!insecticidaSeleccionado ? "red" : "black"
                                }
                                colorAlas={
                                    !!insecticidaSeleccionado ? "darkred" : "gray"
                                }
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
