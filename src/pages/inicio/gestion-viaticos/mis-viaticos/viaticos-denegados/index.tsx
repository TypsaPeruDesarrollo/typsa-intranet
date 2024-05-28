import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { fetchSolicitudes } from '@/utils/fetchSolicitudes';
import { Solicitud } from 'next-auth';
import { ajustarFecha } from "@/utils/dateUtils";

export default function ViaticosDenegados() {
  const { data: session } = useSession();
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (session?.accessToken && session?.user?.empleadoId) {
      const empleadoId = session.user.empleadoId;
      const accessToken = session.accessToken;

      const estadoIds = [4];

      try {
        const data = await fetchSolicitudes(empleadoId, accessToken, estadoIds);
        setSolicitudes(data);
      } catch (err) {
        setError('No se pudieron cargar las solicitudes.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('No hay token de acceso o ID de empleado disponible.');
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-20 top-16">Mis viáticos rechazados</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-7xl w-full p-2 relative overflow-x-auto sm:rounded-lg">
        {error && <p className="text-red-500">{error}</p>}
        {isLoading ? <p>Cargando...</p> : (
          <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
            <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
              <tr className="text-center align-middle">
                {["Centro de Costo", "Motivo", "Jefe de aprobación", "Fecha Inicial", "Fecha Final", "Monto solicitado"].map(header => (
                  <th key={header} className="px-4 py-3 border-b border-gray-200">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {solicitudes.map(solicitud => (
                <tr key={solicitud.SolicitudId} className="text-center align-middle">
                  <td className="px-2 py-4 border-2">{solicitud.CodigoProyecto}</td>
                  <td className="px-2 py-4 border-2">{solicitud.NombreMotivo}</td>
                  <td className="px-2 py-4 border-2">{solicitud.Nombres}</td>
                  <td className="px-2 py-4 border-2">{ajustarFecha(solicitud.FechaInicio)}</td>
                  <td className="px-2 py-4 border-2">{ajustarFecha(solicitud.FechaFin)}</td>
                  <td className="px-2 py-4 border-2">S/.{solicitud.MontoNetoInicial}</td>
                  <td className="px-2 py-4 border-2">Ver observación</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
