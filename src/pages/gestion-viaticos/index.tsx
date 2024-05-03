import Image from "next/image";
import Link from "next/link";

export default function GestionViaticos () {
  return (
    <div className="min-h-screen">
      <div className="h-56 flex flex-col">
        <div className="h-56 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-24 gap-5">
        <Link href="/solicitar-viaticos">
        <div className="lg:w-80 w-64 lg:h-28 h-24 border-2 flex justify-center items-center gap-5 rounded-xl shadow-md">
          <div className="lg:w-24 w-20 lg:h-24 h-20">
            <Image src="/img/billete-de-avion.png" alt="icono de billete de avion" width={80} height={60}/>
          </div>
          <div>
            <p className="text-lg">Solicitar Viáticos</p>
          </div>
        </div>
        </Link>
        <Link href="/rendir-viaticos">
        <div className="lg:w-80 w-64 lg:h-28 h-24 border-2 flex justify-center items-center gap-5 rounded-xl shadow-md">
          <div className="lg:w-24 w-20 lg:h-24 h-20">
            <Image src="/img/cuenta-bancaria.png" alt="icono de billete de avion" width={80} height={60}/>
          </div>
          <div>
            <p className="text-lg">Rendir Viático</p>
          </div>
        </div>
        </Link>
        <Link href="#">
        <div className=" lg:w-80 w-64 lg:h-28 h-24 border-2 flex justify-center items-center gap-5 rounded-xl shadow-md">
          <div className="lg:w-24 w-20 lg:h-24 h-20">
            <Image src="/img/lista-de-verificacion.png" alt="icono de billete de avion" width={80} height={60}/>
          </div>
          <div>
            <p className="text-lg">Mis Viaticos</p>
          </div>
        </div>
        </Link>
      </div>
    </div>
  )
}