import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ViaticosMenu = () => {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(null); // Cambia el estado para manejar múltiples menús
  const [solicitudesCount, setSolicitudesCount] = useState(0);

  const handleToggleMenu = (menu) => {
    setShowMenu(showMenu === menu ? null : menu);
  };

  const allowedRoles = ["JefeProyecto", "JefeDepartamento", "Direccion", "SuperAdmin"];
  const contabilidadRoles = ["Administracion"];

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center gap-4 mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/inicio/gestion-viaticos/solicitar-viaticos"
          className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-white w-full md:w-2/5 h-14 rounded-md text-left flex items-center"
        >
          <span className="ml-5 text-lg text-zinc-600 font-semibold">Solicitar Nuevo Viático</span>
        </Link>

        <div className="relative w-full md:w-2/5 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-md">
          <button
            onClick={() => handleToggleMenu("misViaticos")}
            className="shadow-lg bg-white w-full h-14 rounded-md text-left flex justify-between items-center"
          >
            <span className="ml-5 text-lg text-zinc-600 font-semibold">Mis Viáticos</span>
            {solicitudesCount > 0 && (
              <span className="rounded-full bg-red-800 text-xs text-white w-5 h-5 flex items-center justify-center mr-5">
                {solicitudesCount}
              </span>
            )}
          </button>
          {showMenu === "misViaticos" && (
            <div className="absolute left-0 top-14 mt-2 w-full bg-white shadow-lg ring-1 ring-white z-10">
              <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link
                  href="/inicio/gestion-viaticos/mis-viaticos/viaticos-denegados"
                  className="block px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 border-b-2"
                  role="menuitem"
                >
                  Viáticos denegados
                </Link>
                <Link
                  href="/inicio/gestion-viaticos/mis-viaticos/viaticos-procesos"
                  className="flex px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 justify-between"
                  role="menuitem"
                >
                  Viáticos en proceso
                  <div className="w-2 h-2 rounded-full bg-red-700 mt-1"></div>
                </Link>
              </div>
            </div>
          )}
        </div>

        {session?.user?.roles?.some((role) => allowedRoles.includes(role)) && (
          <div className="relative w-full md:w-2/5 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-md">
            <button
              onClick={() => handleToggleMenu("aprobaciones")}
              className="shadow-lg bg-white w-full h-14 rounded-md text-left flex justify-between items-center"
            >
              <span className="ml-5 text-lg text-zinc-600 font-semibold">Aprobaciones</span>
              <span className="rounded-full bg-red-800 text-xs text-white w-5 h-5 flex items-center justify-center mr-5">
                1
              </span>
            </button>
            {showMenu === "aprobaciones" && (
              <div className="absolute left-0 top-14 mt-2 w-full bg-white shadow-lg ring-1 ring-white z-10">
                <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link
                    href="/inicio/gestion-viaticos/jefe/viaticos-rechazados"
                    className="block px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 border-b-2"
                    role="menuitem"
                  >
                    Viáticos Rechazados
                  </Link>
                  <Link
                    href="/inicio/gestion-viaticos/jefe/viaticos-aprobados"
                    className="block px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 border-b-2"
                    role="menuitem"
                  >
                    Viáticos aprobados
                  </Link>
                  <Link
                    href="/inicio/gestion-viaticos/jefe/viaticos-por-aprobar"
                    className="flex px-4 py-2 bg-gray-100 text-sm text-gray-500 font-medium hover:bg-gray-300 justify-between"
                    role="menuitem"
                  >
                    Viáticos por aprobar
                    <div className="w-2 h-2 rounded-full bg-red-700 mt-1"></div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-full flex flex-wrap justify-center gap-4 mt-16 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {session?.user?.roles?.some((role) => contabilidadRoles.includes(role)) && (
          <div className="relative w-full sm:w-2/3 md:w-1/4 lg:w-1/5">
            <button
              onClick={() => handleToggleMenu("registroPagos")}
              className="shadow-lg bg-white w-full h-14 rounded-md text-left flex justify-between items-center"
            >
              <span className="ml-5 text-sm text-zinc-600 font-semibold">
                Registro de pagos
              </span>
            </button>
            {showMenu === "registroPagos" && (
              <div className="absolute left-0 top-14 mt-2 w-full bg-white shadow-lg ring-1 ring-white z-10">
                <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link
                    href="/inicio/gestion-viaticos/contabilidad/registro-pagos"
                    className="block px-4 py-2 bg-gray-100 text-xs text-gray-500 font-medium hover:bg-gray-300 border-b-2"
                    role="menuitem"
                  >
                    Registro de pagos de viaticos
                  </Link>
                  <Link
                    href="/inicio/gestion-viaticos/contabilidad/registro-devolucion-pagos"
                    className="block px-4 py-2 bg-gray-100 text-xs text-gray-500 font-medium hover:bg-gray-300 border-b-2"
                    role="menuitem"
                  >
                   Registro de devolución de pagos
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {session?.user?.roles?.some((role) => contabilidadRoles.includes(role)) && (
          <div className="relative w-full sm:w-2/3 md:w-1/4 lg:w-1/5">
            <button
              onClick={() => handleToggleMenu("revisionRendiciones")}
              className="shadow-lg bg-white w-full h-14 rounded-md text-left flex justify-between items-center"
            >
              <span className="ml-5 text-sm text-zinc-600 font-semibold">
                Revisión de rendiciones
              </span>
            </button>
            {showMenu === "revisionRendiciones" && (
              <div className="absolute left-0 top-14 mt-2 w-full bg-white shadow-lg ring-1 ring-white z-10">
                <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link
                    href="/inicio/gestion-viaticos/contabilidad/rendiciones-observadas"
                    className="block px-4 py-2 bg-gray-100 text-xs text-gray-500 font-medium hover:bg-gray-300 border-b-2"
                    role="menuitem"
                  >
                    Rendiciones observadas
                  </Link>
                  <Link
                    href="/inicio/gestion-viaticos/contabilidad/revision-rendicion"
                    className="block px-4 py-2 bg-gray-100 text-xs text-gray-500 font-medium hover:bg-gray-300 border-b-2"
                    role="menuitem"
                  >
                    Rendiciones por revisar
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {session?.user?.roles?.some((role) => contabilidadRoles.includes(role)) && (
          <div className="relative w-full sm:w-2/3 md:w-1/4 lg:w-1/4">
            <button
              onClick={() => handleToggleMenu("revisionConstancias")}
              className="shadow-lg bg-white w-full h-14 rounded-md text-left flex justify-between items-center"
            >
              <span className="ml-5 text-sm text-zinc-600 font-semibold">
                Revisión de constancias de saldos
              </span>
            </button>
            {showMenu === "revisionConstancias" && (
              <div className="absolute left-0 top-14 mt-2 w-full bg-white shadow-lg ring-1 ring-white z-10">
                <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link
                    href="/inicio/gestion-viaticos/contabilidad/constancias-observadas"
                    className="block px-4 py-2 bg-gray-100 text-xs text-gray-500 font-medium hover:bg-gray-300 border-b-2"
                    role="menuitem"
                  >
                    Constancia observadas
                  </Link>
                  <Link
                    href="/inicio/gestion-viaticos/contabilidad/constancias-por-revisar"
                    className="block px-4 py-2 bg-gray-100 text-xs text-gray-500 font-medium hover:bg-gray-300 border-b-2"
                    role="menuitem"
                  >
                    Constancia por revisar
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {session?.user?.roles?.some((role) => contabilidadRoles.includes(role)) && (
          <div className="relative w-full sm:w-2/3 md:w-1/4 lg:w-1/5">
            <Link
              href="/inicio/gestion-viaticos/contabilidad/historial-viaticos"
              className="shadow-lg bg-white w-full h-14 rounded-md text-left flex justify-between items-center"
            >
              <span className="ml-5 text-sm text-zinc-600 font-semibold">Histórico de viáticos</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ViaticosMenu;
