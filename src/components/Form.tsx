import { Label } from "./ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { insecticidas } from "@/functions/functions";
import { Button } from "./ui/button";
import { useState } from "react";
import { Check } from "lucide-react";

export default function Form({ setDatosDeEntrada }: { setDatosDeEntrada: (datos: any) => void }) {
    const [cantidadArboles, setCantidadArboles] = useState(25000);
    const [variedadCereza, setVariedadCereza] = useState("Lapins");
    const [insecticidaSeleccionado, setInsecticidaSeleccionado] = useState<string | null>(null);
    const [simulacionIniciada, setSimulacionIniciada] = useState(false);

    const iniciarSimulacion = () => {
        if (cantidadArboles <= 0) {
            alert("La población inicial debe ser mayor que 0");
            return;
        }
        setSimulacionIniciada(true);
        setDatosDeEntrada({
            cantidadArboles,
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
            <CardHeader>
                <h2 className="text-xl font-semibold">Parámetros Iniciales</h2>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 items-center h-full">
                <div className="flex flex-col gap-2 w-full">
                    <Label>Cantidad de cerezos</Label>
                    <Input
                        type="number"
                        value={cantidadArboles}
                        onChange={(e) => setCantidadArboles(Number(e.target.value))}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label>Variedad de Cereza</Label>
                    <Select
                        value={variedadCereza}
                        onValueChange={setVariedadCereza}
                    >
                        <SelectTrigger className="w-full">
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
                        : <Button onClick={iniciarSimulacion}>Iniciar Simulación</Button>
                }
            </CardFooter>
        </Card>
    )
}