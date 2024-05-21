import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const ViaticosMenu = () => {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(null); // Cambia el estado para manejar múltiples menús

  const handleToggleMenu = (menu) => {
    setShowMenu(showMenu === menu ? null : menu);
  };

  const allowedRoles = ['JefeProyecto', 'JefeDepartamento', 'Direccion', 'SuperAdmin'];

  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-4 mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/inicio/gestion-viaticos/solicitar-viaticos" className="shadow-lg bg-white w-full md:w-2/5 h-14 rounded-md text-left flex items-center">
        <span className="ml-5 text-lg text-zinc-600 font-semibold">Solicitar Nuevo Viático</span>
      </Link>
      
      <div className="relative w-full md:w-2/5">
        <button onClick={() => handleToggleMenu('misViaticos')} className="shadow-lg bg-white w-full h-14 rounded-md text-left flex justify-between items-center">
          <span className="ml-5 text-lg text-zinc-600 font-semibold">Mis Viáticos</span>
          <span className="rounded-full bg-red-800 text-xs text-white w-5 h-5 flex items-center justify-center mr-5">1</span>
        </button>
        {showMenu === 'misViaticos' && (
          <div className="absolute left-0 top-14 mt-2 w-full bg-white shadow-lg ring-1 ring-white z-10">
            <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link href="/inicio/gestion-viaticos/historial-viaticos" className="block px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 border-b-2" role="menuitem">Historial de viáticos</Link>
              <Link href="#" className="block px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 border-b-2" role="menuitem">Viáticos denegados</Link>
              <Link href="/inicio/gestion-viaticos/viaticos-procesos" className="flex px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 justify-between" role="menuitem">
                Viáticos en proceso 
                <div className="w-2 h-2 rounded-full bg-red-700 mt-1"></div>
              </Link>
            </div>
          </div>
        )}
      </div>
      {session?.user?.roles?.some(role => allowedRoles.includes(role)) && (
      <div className="relative w-full md:w-2/5">
        <button onClick={() => handleToggleMenu('aprobaciones')} className="shadow-lg bg-white w-full h-14 rounded-md text-left flex justify-between items-center">
          <span className="ml-5 text-lg text-zinc-600 font-semibold">Aprobaciones</span>
          <span className="rounded-full bg-red-800 text-xs text-white w-5 h-5 flex items-center justify-center mr-5">1</span>
        </button>
        {showMenu === 'aprobaciones' && (
          <div className="absolute left-0 top-14 mt-2 w-full bg-white shadow-lg ring-1 ring-white z-10">
            <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link href="/inicio/gestion-viaticos/historial-viaticos" className="block px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 border-b-2" role="menuitem">Viáticos Rechazados</Link>
              <Link href="#" className="block px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 border-b-2" role="menuitem">Viáticos aprobados</Link>
              <Link href="/inicio/gestion-viaticos/viaticos-por-aprobar" className="flex px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 justify-between" role="menuitem">
                Viáticos por aprobar 
                <div className="w-2 h-2 rounded-full bg-red-700 mt-1"></div>
              </Link>
            </div>
          </div>
        )}
      </div>
      )}

     
      <div className="relative w-full md:w-2/5">
        <button onClick={() => handleToggleMenu('aprobaciones')} className="shadow-lg bg-white w-full h-14 rounded-md text-left flex justify-between items-center">
          <span className="ml-5 text-lg text-zinc-600 font-semibold">Contabilidad</span>
          <span className="rounded-full bg-red-800 text-xs text-white w-5 h-5 flex items-center justify-center mr-5">1</span>
        </button>
        {showMenu === 'aprobaciones' && (
          <div className="absolute left-0 top-14 mt-2 w-full bg-white shadow-lg ring-1 ring-white z-10">
            <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link href="/inicio/gestion-viaticos/historial-viaticos" className="block px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 border-b-2" role="menuitem">Registro de pagos</Link>
              <Link href="#" className="block px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 border-b-2" role="menuitem">Revisión de rendición</Link>
              <Link href="/inicio/gestion-viaticos/viaticos-por-aprobar" className="flex px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 justify-between" role="menuitem">
                Revisión de constancias de saldos
                <div className="w-2 h-2 rounded-full bg-red-700 mt-1"></div>
              </Link>
            </div>
          </div>
        )}
      </div>
   
      

    </div>

    
  );
};

export default ViaticosMenu;
