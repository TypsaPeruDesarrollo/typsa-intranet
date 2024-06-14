import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ajustarFecha } from "@/utils/dateUtils"
import ViaticosPorAprobarJefeModal from '@/components/ViaticosPorAprobarJefeModal';
import RechazarModal from '@/components/RechazarModal';
import ModificarMontoModal from '@/components/ModificarMontoModal';

export default function ViaticosProAprobar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const [viaticos, setViaticos] = useState([]);
  const [isJefeModalOpen, setIsJefeModalOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [solicitudIdToReject, setSolicitudIdToReject] = useState(null);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [solicitudIdToModify, setSolicitudIdToModify] = useState(null);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/");
    }
  }, [session, loading, router]);

  useEffect(() => {
    if (session) {
      fetchViaticos(session.user.empleadoId); 
    }
  }, [session]);

  const fetchViaticos = async (empleadoId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos/jefe/${empleadoId}`);
      if (res.ok) {
        const data = await res.json();
        const filteredData = data.filter(viatico => viatico.EstadoId === 1);
        setViaticos(filteredData);
      } else {
        console.error("Error al obtener las solicitudes de viáticos");
      }
    } catch (error) {
      console.error("Error al obtener las solicitudes de viáticos", error);
    }
  };

  const handleEstadoChange = async (solicitudId, nuevoEstadoId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos/${solicitudId}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nuevoEstadoId })
      });
      if (res.ok) {
        fetchViaticos(session.user.empleadoId);
      } else {
        console.error("Error al actualizar el estado de la solicitud de viáticos");
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la solicitud de viáticos", error);
    }
  };

  const handleRechazar = async (solicitudId, comentariosJefe) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos/${solicitudId}/rechazar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nuevoEstadoId: 4, comentariosJefe })
      });
      if (res.ok) {
        fetchViaticos(session.user.empleadoId);
      } else {
        console.error("Error al rechazar la solicitud de viáticos");
      }
    } catch (error) {
      console.error("Error al rechazar la solicitud de viáticos", error);
    }
  };

  const handleSaveMonto = async (solicitudId, monto, comentario) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos/${solicitudId}/monto`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ montoNetoAprobado: monto, comentarioJefeMonto: comentario })
      });
      if (res.ok) {
        fetchViaticos(session.user.empleadoId);
      } else {
        console.error("Error al actualizar el monto aprobado de la solicitud de viáticos");
      }
    } catch (error) {
      console.error("Error al actualizar el monto aprobado de la solicitud de viáticos", error);
    }
    setIsModifyModalOpen(false);
    setSolicitudIdToModify(null);
  };

  const handleRechazarClick = (solicitudId) => {
    setSolicitudIdToReject(solicitudId);
    setIsRejectModalOpen(true);
  };

  const handleModificarMontoClick = (solicitudId) => {
    setSolicitudIdToModify(solicitudId);
    setIsModifyModalOpen(true);
  };

  const handleRowClick = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsJefeModalOpen(true);
  };

  const handleCloseJefeModal = () => {
    setIsJefeModalOpen(false);
    setSelectedSolicitud(null);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setSolicitudIdToReject(null);
  };

  const handleCloseModifyModal = () => {
    setIsModifyModalOpen(false);
    setSolicitudIdToModify(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-5 sm:left-10 lg:left-20 top-16 font-bold">Viáticos por aprobar</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 w-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
          <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
            <tr className="text-center align-middle">
              {["Centro de Costo", "Motivo", "Usuario", "Fecha Incial", "Fecha Final", "Monto solicitado"].map(header => (
                <th key={header} className="px-4 py-3 border-2 border-gray-200">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {viaticos.map((viatico) => (
              <tr 
                key={viatico.SolicitudId} 
                className="bg-white hover:bg-gray-50 text-center align-middle cursor-pointer" 
                onClick={() => handleRowClick(viatico)}
              >
                <td className="px-2 py-4 border-2">{viatico.CodigoProyecto}</td>
                <td className="px-4 py-4 border-2">{viatico.NombreMotivo}</td>
                <td className="px-4 py-4 border-2">{viatico.Nombres}</td>
                <td className="px-4 py-4 border-2">{ajustarFecha(viatico.FechaInicio)}</td>
                <td className="px-4 py-4 border-2">{ajustarFecha(viatico.FechaFin)}</td>
                <td className="px-4 py-4 border-2">{`S/. ${viatico.MontoNetoAprobado || viatico.MontoNetoInicial}`}</td>
                <td className="px-4 py-4 border-2 text-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleModificarMontoClick(viatico.SolicitudId); }}
                    className="bg-yellow-200 text-[#615a5a] font-semibold w-32 py-1 rounded-md hover:bg-yellow-600 hover:text-white">
                    Modificar monto
                  </button>
                </td>
                <td className="px-4 py-4 border-2 text-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEstadoChange(viatico.SolicitudId, 2); }}
                    className="bg-green-200 text-[#615a5a] font-semibold w-24 py-1 rounded-md hover:bg-green-600 hover:text-white">
                    Aprobar
                  </button>
                </td>
                <td className="px-4 py-4 border-2 text-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleRechazarClick(viatico.SolicitudId); }}
                    className="bg-red-300 text-[#615a5a] font-semibold w-24 py-1 rounded-md hover:bg-red-600 hover:text-white">
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViaticosPorAprobarJefeModal 
        isOpen={isJefeModalOpen}
        onClose={handleCloseJefeModal}
        solicitud={selectedSolicitud}
      />
      <ModificarMontoModal 
        isOpen={isModifyModalOpen}
        onClose={handleCloseModifyModal}
        solicitudId={solicitudIdToModify}
        handleSaveMonto={handleSaveMonto}
      />
      <RechazarModal
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        handleRechazar={handleRechazar}
        solicitudId={solicitudIdToReject}
      />
    </div>
  );
}
