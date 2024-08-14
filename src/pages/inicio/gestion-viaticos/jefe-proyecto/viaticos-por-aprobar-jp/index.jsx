import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ajustarFecha } from "@/utils/dateUtils";
import ViaticosPorAprobarJPModal from '@/components/modals/ViaticosPorAprobarJPModal';
import RechazarJPModal from '@/components/modals/RechazarJPModal';
import ModificarMontoJPModal from '@/components/modals/ModificarMontoJPModal';
import { useMessages } from '@/components/messages/MessageContext';

export default function ViaticosProAprobarJP() {

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const [viaticos, setViaticos] = useState([]);
  const [isJefeModalOpen, setIsJefeModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  const { showMessage } = useMessages();

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos/proyecto/${empleadoId}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        const filteredData = data.filter(viatico => viatico.EstadoId === 12);
        setViaticos(filteredData);solicitud-viaticos/proyecto
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
        body: JSON.stringify({ nuevoEstadoId, esAprobacionJP: true })
      });
      if (res.ok) {
        fetchViaticos(session.user.empleadoId);
        showMessage('success', 'Solicitud aprobada con éxito');
      } else {
        console.error("Error al actualizar el estado de la solicitud de viáticos");
        showMessage('error', 'Error al aprobar la solicitud');
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la solicitud de viáticos", error);
      showMessage('error', 'Error al aprobar la solicitud');
    }
  };

  const handleRechazarJP  = async (solicitudId, comentarioJP) => {
    try {
      console.log('Solicitud ID:', solicitudId);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos/${solicitudId}/rechazar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nuevoEstadoId: 14, esRechazoJP: true, comentarioJP: comentarioJP })
      });
      if (res.ok) {
        fetchViaticos(session.user.empleadoId);
        showMessage('success', 'Solicitud rechazada con éxito');
      } else {
        console.error("Error al rechazar la solicitud de viáticos");
        showMessage('error', 'Error al rechazar la solicitud');
      }
    } catch (error) {
      console.error("Error al rechazar la solicitud de viáticos", error);
      showMessage('error', 'Error al rechazar la solicitud');
    }
  };

  // Nueva función para guardar el monto utilizando la nueva API
  const handleSaveMonto = async (solicitudId, detallesPresupuesto, comentarioJPMonto) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateSolicitud`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ solicitudId, detallesPresupuesto, comentario: comentarioJPMonto, rol: 'jp' })
      });
      if (res.ok) {
        fetchViaticos(session.user.empleadoId);
        showMessage('success', 'Monto y detalles modificados con éxito');
      } else {
        console.error("Error al actualizar la solicitud de viáticos");
        showMessage('error', 'Error al modificar la solicitud');
      }
    } catch (error) {
      console.error("Error al actualizar la solicitud de viáticos", error);
      showMessage('error', 'Error al modificar la solicitud');
    }
    setIsModifyModalOpen(false);
    setSelectedSolicitud(null);
  };

  const handleRechazarClick = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsRejectModalOpen(true);
  };

  const handleModificarMontoClick = (solicitud) => {
    setSelectedSolicitud(solicitud);
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
    setSelectedSolicitud(null);
  };

  const handleCloseModifyModal = () => {
    setIsModifyModalOpen(false);
    setSelectedSolicitud(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-5 sm:left-10 lg:left-20 top-16 font-bold">Viáticos por aprobar JP</h1>
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
                <td className="px-4 py-4 border-2">{viatico.NombreCompletoColaborador}</td>
                <td className="px-4 py-4 border-2">{ajustarFecha(viatico.FechaInicio)}</td>
                <td className="px-4 py-4 border-2">{ajustarFecha(viatico.FechaFin)}</td>
                <td className="px-4 py-4 border-2">{`S/. ${viatico.MontoNetoAprobado || viatico.MontoNetoInicial}`}</td>
                <td className="px-4 py-4 border-2 text-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleModificarMontoClick(viatico); }}
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
                    onClick={(e) => { e.stopPropagation(); handleRechazarClick(viatico); }}
                    className="bg-red-300 text-[#615a5a] font-semibold w-24 py-1 rounded-md hover:bg-red-600 hover:text-white">
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViaticosPorAprobarJPModal 
        isOpen={isJefeModalOpen}
        onClose={handleCloseJefeModal}
        solicitud={selectedSolicitud}
      />
      <ModificarMontoJPModal 
        isOpen={isModifyModalOpen}
        onClose={handleCloseModifyModal}
        solicitud={selectedSolicitud}
        handleSaveMonto={handleSaveMonto}
      />
      <RechazarJPModal
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        solicitudId={selectedSolicitud?.SolicitudId}
        handleRechazar={handleRechazarJP}
      />
    </div>
  );
}
