import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Stepper from "@/components/layout/Stepper";
import SolicitudesRevision from "@/components/SolicitudesRevision";
import ViaticosRendir from "@/components/ViaticosRendir";
import RendicionRevision from "@/components/RendicionRevision";
import ViaticoCerrado from "@/components/ViaticoCerrado";
import ViaticosMenu from "@/components/ViaticosMenu";
import axios from "axios";

export default function ViaticosEnProcesos() {
  const [activeStep, setActiveStep] = useState(0);
  const { data: session, status } = useSession();
  const [hasSolicitudesRevision, setHasSolicitudesRevision] = useState(false);
  const loading = status === "loading";
  const router = useRouter();

  const fetchSolicitudesRevision = useCallback(async () => {
    if (session?.user?.empleadoId) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos/${session.user.empleadoId}`);
        const solicitudes = response.data;
        if (solicitudes.some((solicitud: { EstadoId: number; }) => solicitud.EstadoId === 1)) {
          setHasSolicitudesRevision(true);
        } else {
          setHasSolicitudesRevision(false);
          setActiveStep(1); // Si no hay solicitudes en revisión, ir a "Viáticos por Rendir"
        }
      } catch (error) {
        console.error("Error al obtener las solicitudes de revisión:", error);
        setHasSolicitudesRevision(false);
        setActiveStep(1); // En caso de error, ir a "Viáticos por Rendir"
      }
    }
  }, [session?.user?.empleadoId]);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/");
    } else if (session) {
      fetchSolicitudesRevision();
    }
  }, [session, loading, router, fetchSolicitudesRevision]);

  return (
    <div className="min-h-screen">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-20 top-16">Viáticos en procesos</h1>
          </div>
        </div>
      </div>
      <ViaticosMenu />
      <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
      {activeStep === 0 && hasSolicitudesRevision && <SolicitudesRevision />}
      {activeStep === 1 && <ViaticosRendir />}
      {activeStep === 2 && <RendicionRevision />}
      {activeStep === 3 && <ViaticoCerrado />}
    </div>
  );
}
