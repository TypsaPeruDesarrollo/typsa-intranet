import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from "next-auth/react";
import {ajustarFecha } from "@/utils/dateUtils"
import { fetchSolicitudes } from '@/utils/fetchSolicitudes';
import SolicitudEnviadaModal from '@/components/SolicitudEnviadaModal';

export default function SolicitudRevision() {

  const { data: session } = useSession();
  const [solicitudes, setSolicitudes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);


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

  const handleRowClick = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSolicitud(null);
  };

  return (
    <div className="mx-auto mt-14 w-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? <p>Cargando...</p> : (
      <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
        <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
          <tr className="text-center align-middle">
            {["Centro de Costo","Corresponsabilidad", "Motivo", "Jefe de aprobación", "Fecha Incial", "Fecha Final", "Monto solicitado"].map(header => (
              <th key={header} className="px-4 py-3 border-b border-gray-200">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(solicitud => (
            <tr key={solicitud.SolicitudId} className="bg-white hover:bg-gray-50 text-center align-middle"
            onClick={() => handleRowClick(solicitud)}>
              <td className="px-2 py-4 border-2">{solicitud.CodigoProyecto}</td>
              <td className='px-2 py-4 border-2'>{solicitud.Codigo}</td>
              <td className="px-4 py-4 border-2">{solicitud.NombreMotivo}</td>
              <td className="px-4 py-4 border-2">{solicitud.Nombres}</td>
              <td className="px-4 py-4 border-2">{ajustarFecha(solicitud.FechaInicio)}</td>
              <td className="px-4 py-4 border-2">{ajustarFecha(solicitud.FechaFin)}</td>
              <td className="px-4 py-4 border-2">S/.<span>{solicitud.MontoNetoInicial}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {isModalOpen && (
        <SolicitudEnviadaModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          solicitud={selectedSolicitud} 
        />
      )}
    </div>
  );
}
