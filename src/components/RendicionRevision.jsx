import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { ajustarFecha } from "@/utils/dateUtils";
import { iconBasedOnState } from '@/utils/iconHelpers';
import { fetchSolicitudes } from '@/utils/fetchSolicitudes';
import RendicionRevisionModal from "../components/RendicionRevisionModal";

export default function ViaticosPorRevision() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
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
      const estadoIds = [5, 6, 7, 8, 9]; 

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

  const openModalWithSolicitud = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSolicitud(null);
  };

  return (
    <div className="mx-auto mt-14 w-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
      <RendicionRevisionModal isOpen={isModalOpen} solicitud={selectedSolicitud} onClose={closeModal}></RendicionRevisionModal>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? <p>Cargando...</p> : (
        <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
          <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
            <tr className="text-center align-middle">
              {["Centro de Costo", "Motivo", "Jefe de aprobación", "Fecha Incial", "Fecha Final", "Monto aprobado", "Monto utilizado", "Abonado por contabilidad", "Revisión de rendición por contabilidad", "Saldo por devolver", "Revisión de saldo por contabilidad"].map(header => (
                <th key={header} className="px-4 py-3 border-b border-gray-200">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {solicitudes.map(solicitud => {
              const montoTotalUtilizado = (solicitud.MontoGastadoDeclaradoJustificado || 0) + (solicitud.MontoGastadoDeclaradoInjustificado || 0);
              const montoPendiente = solicitud.MontoNetoAprobado - montoTotalUtilizado;
              return (
                <tr key={solicitud.SolicitudId} className="bg-white hover:bg-gray-50 text-center align-middle">
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b cursor-pointer">{solicitud.CodigoProyecto}</td>
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b cursor-pointer">{solicitud.NombreMotivo}</td>
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b cursor-pointer">{solicitud.Nombres}</td>
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b cursor-pointer">{ajustarFecha(solicitud.FechaInicio)}</td>
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b cursor-pointer">{ajustarFecha(solicitud.FechaFin)}</td>
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b cursor-pointer">S/.{solicitud.MontoNetoAprobado.toFixed(2)}</td>
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b cursor-pointer">S/.{montoTotalUtilizado.toFixed(2)}</td>
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b">{iconBasedOnState(solicitud.EstadoId, 1)}</td>
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b">{iconBasedOnState(solicitud.EstadoId, 2)}</td>
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b">{montoPendiente.toFixed(2) === '0.00' ? 'S/.0.0' : `S/.${montoPendiente.toFixed(2)}`}</td>
                  <td onClick={() => openModalWithSolicitud(solicitud)} className="px-4 py-4 border-b">{iconBasedOnState(solicitud.EstadoId, 4)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
