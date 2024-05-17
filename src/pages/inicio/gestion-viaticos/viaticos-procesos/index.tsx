import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Stepper from "@/components/Stepper";
import SolicitudesRevision from "@/components/SolicitudesRevision"
import ViaticosRendir from "@/components/ViaticosRendir"
import RendicionRevision from "@/components/RendicionRevision"
import ViaticoCerrado from "@/components/ViaticoCerrado"

export default function ViaticosEnProcesos() {
  const [activeStep, setActiveStep] = useState(0);
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/");
    }
    
  }, [session, loading, router]);

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
      <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
      {activeStep === 0 && <SolicitudesRevision />}
      {activeStep === 1 && <ViaticosRendir />}
      {activeStep === 2 && <RendicionRevision />}
      {activeStep === 3 && <ViaticoCerrado />}
    </div>
  );
}
