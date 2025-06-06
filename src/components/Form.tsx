import { Label } from "./ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { insecticidas } from "@/functions/functions";
import { Button } from "./ui/button";
import { useState } from "react";
import { Check } from "lucide-react";
import { Insecticida } from "@/types";

interface DatosEntrada {
    variedadCereza: string;
    insecticidaSeleccionado: Insecticida | null;
}

export default function Form({ iniciarSimulacion }: { iniciarSimulacion: (datos: DatosEntrada) => void }) {
    const [variedadCereza, setVariedadCereza] = useState("Lapins");
    const [insecticidaSeleccionado, setInsecticidaSeleccionado] = useState<string | null>(null);
    const [simulacionIniciada, setSimulacionIniciada] = useState(false);

    const handleInit = () => {
        setSimulacionIniciada(true);
        iniciarSimulacion({
            variedadCereza,
            insecticidaSeleccionado: insecticidas.find(
                (insecticida) => insecticida.nombre === insecticidaSeleccionado
            ) || null,
        });
    };

    const resetearSimulacion = () => {
        setSimulacionIniciada(false);
    };

    const handleSelectInsecticida = (nombre: string) => {
        if (nombre === insecticidaSeleccionado) {
            setInsecticidaSeleccionado(null);
            return;
        }
        setInsecticidaSeleccionado(nombre);
    };

    const handleSelectCereza = (cereza: string) => {
        setVariedadCereza(cereza);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="mt-4">
                <h2 className="text-xl font-semibold">Parámetros Iniciales</h2>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 items-center h-full">
                <div className="flex flex-col gap-2 w-full">
                    <Label>Variedad de la cereza</Label>
                    {["Lapins", "Kordia", "Sweetheart"].map((cereza) => (
                        <button
                            key={cereza}
                            className="flex w-full h-4"
                            onClick={() => handleSelectCereza(cereza)}
                        >
                            <div className="flex w-4 h-4 border-2 items-center justify-center rounded mr-2">
                                {variedadCereza === cereza && (
                                    <Check className="text-green-500 flex" />
                                )}
                            </div>
                            <Label htmlFor={cereza} className="ml-2">
                                {cereza}
                            </Label>
                        </button>
                    ))}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label>Insecticidas a utilizar</Label>
                    {insecticidas.map((insecticida) => (
                        <button
                            key={insecticida.nombre}
                            className="flex w-full h-4"
                            onClick={() => handleSelectInsecticida(insecticida.nombre)}
                        >
                            <div className="flex w-4 h-4 border-2 items-center justify-center rounded mr-2">
                                {insecticidaSeleccionado === insecticida.nombre && (
                                    <Check className="text-green-500 flex" />
                                )}
                            </div>
                            <Label htmlFor={insecticida.nombre} className="ml-2">
                                {insecticida.nombre}
                            </Label>
                        </button>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center w-full mb-10">
                {
                    simulacionIniciada ?
                        <Button onClick={resetearSimulacion}>Resetear Simulacion</Button>
                        : <Button onClick={handleInit}>Iniciar Simulación</Button>
                }
            </CardFooter>
        </Card>
    )
}