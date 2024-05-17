import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ViaticosMenu from "@/components/ViaticosMenu";
import Image from "next/image";

export default function GestionViaticos() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/");
    }
    
  }, [session, loading, router]);

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="h-56 flex flex-col">
        <div className="h-56 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      </div>
      <ViaticosMenu />
      
      {/* 
      <div className="absolute bottom-0 right-0 ">
        <div className="rounded-full flex justify-end mr-4">
          <Image
            className="rounded-full object-cover filter grayscale" 
            height={120} width={120} src="/img/sin-pendientes.png" alt="imagen"/>
        </div>
        <div className="text-right mr-4">
          <p className="text-lime-600 font-medium">¡En horabuena! No tienes notificaciones pendientes.</p>
          <p className="font-thin">Continúa tu día sabiendo que todo está en orden.</p>
        </div>
      </div>*/}

      <div className="absolute bottom-0 right-0 ">
        <div className="rounded-full flex justify-end mr-4">
          <Image
            className="rounded-full object-cover filter grayscale" 
            height={120} width={120} src="/img/con-pendientes.png" alt="imagen"/>
        </div>
        <div className="text-right mr-4">
          <p className="text-rose-700 font-medium">Hay nuevas notificaciones esperando tu atención. ¡Échales un vistazo!</p>
          <p className="font-thin">Mantente al tanto y al día con tus viáticos</p>
        </div>
      </div>

    </div>
  );
}
