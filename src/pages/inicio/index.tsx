import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from  "next/link";

export default function InicioPage () {

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (loading) return; 
    if (!session) {
      router.push('/');
    }
  }, [session, loading, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="w-full flex-1 relative flex flex-wrap justify-center items-center gap-8 px-4 lg:px-12">
        {/*<Link href="/inicio/registro-actividades">
          <div className="w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 xl:w-72 xl:h-88 bg-white shadow-2xl rounded-lg flex flex-col justify-center items-center relative">
            <p className="text-red-700 text-xl md:text-2xl font-bold text-center px-2">REGISTRO DE ACTIVIDADES</p>
            <div className="absolute rounded-full w-1/4 h-1/4 bottom-4 right-4">
              <Image src="/img/icon-registro-actividad.png" alt="icono de registro de actividades" width={60} height={60}/>
            </div>
          </div>
        </Link>*/}
        <Link href="/inicio/gestion-viaticos">
          <div className="w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 xl:w-72 xl:h-88 bg-white shadow-2xl rounded-lg flex flex-col justify-center items-center relative">
            <p className="text-red-700 text-xl md:text-2xl font-bold text-center px-2">
              GESTIÓN DE VIÁTICOS
            </p>
            <div className="absolute rounded-full w-1/4 h-1/4 bottom-4 right-4">
              <Image src="/img/gestion-viaticos.png" alt="Icono de gestión de viáticos" width={60} height={60} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
