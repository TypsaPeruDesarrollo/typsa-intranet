import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from "next-auth/react";
import {ajustarFecha } from "@/utils/dateUtils"
import { fetchSolicitudes } from '@/utils/fetchSolicitudes';

export default function SolicitudRevision() {

  const { data: session } = useSession();
  const [solicitudes, setSolicitudes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (session?.user?.accessToken && session?.user?.empleadoId) {
      const empleadoId = session.user.empleadoId;
      const accessToken = session.user.accessToken;
      const estadoIds = [1]; 

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
  }, [session?.user?.accessToken, session?.user?.empleadoId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="mx-auto mt-4 max-w-7xl w-full p-2 relative overflow-x-auto sm:rounded-lg">
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? <p>Cargando...</p> : (
      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="bg-gray-200 border-b">
            <th scope="col" className="px-3 py-3 border-2">Centro de Costo</th>
            <th scope="col" className="px-3 py-3 border-2">Motivo</th>
            <th scope="col" className="px-3 py-3 border-2">Jefe de aprobación</th>
            <th scope="col" className="px-3 py-3 border-2">Fecha Inicial</th>
            <th scope="col" className="px-3 py-3 border-2">Fecha Final</th>
            <th scope="col" className="px-3 py-3 border-2">Monto solicitado</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(solicitud => (
            <tr key={solicitud.SolicitudId} className="bg-white border-b hover:bg-gray-100">
              <td className="px-2 py-4 border-2">{solicitud.CodigoProyecto}</td>
              <td className="px-2 py-4 border-2">{solicitud.NombreMotivo}</td>
              <td className="px-2 py-4 border-2">{solicitud.Nombres}</td>
              <td className="px-2 py-4 border-2">{ajustarFecha(solicitud.FechaInicio)}</td>
              <td className="px-2 py-4 border-2">{ajustarFecha(solicitud.FechaFin)}</td>
              <td className="px-2 py-4 border-2">S/.<span>{solicitud.MontoNetoInicial}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}
