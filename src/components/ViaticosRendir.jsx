import React, { useEffect, useState, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import RendirModal from "@/components/RendirModal"
import {ajustarFecha } from "@/utils/dateUtils"
import { fetchSolicitudes } from '@/utils/fetchSolicitudes';

export default function ViaticosPorRendir() {

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
      const estadoIds =  [2, 3, 5];

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
      <RendirModal isOpen={isModalOpen} solicitud={selectedSolicitud} onClose={closeModal} />
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? <p>Cargando...</p> : (
      <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
        <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
          <tr className="text-center align-middle">
          {["Centro de Costo","Corresponsabilidad", "Motivo", "Jefe de aprobación","Comentario", "Fecha Incial", "Fecha Final", "Monto solicitado", "Monto aprobado", "Abonado por Contabilidad"].map(header => (
              <th key={header} className="px-4 py-3 border-b border-gray-200">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(solicitud => (
            <tr key={solicitud.SolicitudId} className="text-xs bg-white border-b hover:bg-gray-50 text-center">
              <td className="px-2 border-2">{solicitud.CodigoProyecto}</td>
              <td className='px2 border-2'>{solicitud.Codigo}</td>
              <td className="px-2 border-2">{solicitud.NombreMotivo}</td>
              <td className="px-2 border-2">{solicitud.Nombres}</td>
              <td className='px-2 border-2'>{solicitud.ComentariosUsuario}</td>
              <td className="px-2 border-2">{ajustarFecha(solicitud.FechaInicio)}</td>
              <td className="px-2 border-2">{ajustarFecha(solicitud.FechaFin)}</td>
              <td className="px-2 border-2">S/.<span>{solicitud.MontoNetoInicial}</span></td>
              <td className='px-2 border-2'>S/.<span>{solicitud.MontoNetoAprobado}</span></td>
              <td className={solicitud.EstadoId === 5 ? "py-5 flex justify-center items-center text-green-500" : "py-4 flex justify-center items-center"}>
                {solicitud.EstadoId === 5 ? (
                  <FaCheck className="w-5 h-5"/>
                ) : (solicitud.EstadoId === 2 || solicitud.EstadoId === 3) ? (
                  <GiBackwardTime style={{ color: '#e1be63' }} className="w-6 h-6"/>
                ) : null}
              </td>
              <td className="px-4 py-2 border-2">
              <button onClick={() => openModalWithSolicitud(solicitud)} className="text-blue-500 hover:text-blue-700">Rendir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}
