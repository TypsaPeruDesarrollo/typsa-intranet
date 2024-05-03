import Image from "next/image";
import Link from  "next/link";

export default function InicioPage () {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      <div className="w-full flex-1 relative flex justify-center items-center">
        <Link href="/">
          <div className="lg:w-1/6 w-1/4 lg:h-3/4 h-1/2 absolute lg:left-1/4 left-48 -top-28 bg-white shadow-lg">
            <p className="text-red-700 text-2xl font-bold mt-10 ml-5">REGISTRO DE ACTIVIDADES</p>
            <div className="absolute rounded-full w-1/4 h-1/4 bottom-2 right-2">
              <Image src="/img/icon-registro-actividad.png" alt="icono de registro de actividades" width={60} height={60}/>
            </div>
          </div>
        </Link>
        <Link href="/gestion-viaticos">
          <div className="lg:w-1/6 w-1/4 lg:h-3/4 h-1/2 absolute lg:right-1/4 right-48 -top-28 bg-white shadow-lg">
            <p className="text-red-700 text-2xl font-bold mt-10 ml-5">GESTIÓN DE VIATICOS</p>
            <div className="absolute rounded-full w-1/4 h-1/4 bottom-2 right-2">
              <Image src="/img/gestion-viaticos.png" alt="icono de registro de actividades" width={60} height={60}/>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}