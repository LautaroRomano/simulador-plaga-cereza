import { simularCosecha } from "@/functions/functions";
export async function POST(request) {
  try {
    const { variedadCereza, insecticidaSeleccionado } = await request.json();
    const simulationResult = simularCosecha({
      variedadCereza,
      insecticidaSeleccionado,
    });

    return Response.json(simulationResult);
  } catch (error) {
    console.error("Error en la simulación:", error);
    return Response.json(
      {
        success: false,
        message: "Error en la simulación",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
