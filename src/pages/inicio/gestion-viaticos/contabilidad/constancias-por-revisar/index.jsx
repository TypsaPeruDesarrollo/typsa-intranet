import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import RendicionConstanciasModal from "../../../../../components/RevisionConstanciasModal";
import { ajustarFecha } from "@/utils/dateUtils";

export default function ConstanciasEnRevision() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);


  const fetchSolicitudes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/solicitud-viaticos');
      const filteredData = response.data.filter(solicitud => solicitud.EstadoId === 8)
        .map(solicitud => ({ ...solicitud, checked: false }));
      setSolicitudes(filteredData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  const openModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSolicitud(null);
  };

  const aprobarSolicitud = async (solicitudId) => {
    try {
      await axios.put(`http://localhost:3001/api/solicitud-viaticos/${solicitudId}/estado`, { nuevoEstadoId: 10 });
      // Actualizar el estado de la solicitud localmente si es necesario
      const updatedSolicitudes = solicitudes.map(solicitud => {
        if (solicitud.SolicitudId === solicitudId) {
          return { ...solicitud, EstadoId: 10 };
        }
        return solicitud;
      });
      setSolicitudes(updatedSolicitudes);
    } catch (error) {
      console.error('Error al aprobar la solicitud:', error);
      setError('Error al aprobar la solicitud');
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-5 sm:left-10 lg:left-20 top-16 font-bold">Revisión de constancias de pago</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 w-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
          <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
            <tr className="text-center align-middle">
            {["Centro de Costo", "Motivo", "Usuario", "Fecha Incial", "Fecha Final","Monto aprobado", "Monto utilizado", "Monto no utilizado", "Datos adjuntos"].map(header => (
              <th key={header} className="px-4 py-3 border-2 border-gray-200">{header}</th>
            ))}
            </tr>
          </thead>
          <tbody>
          {solicitudes.map((solicitud) => (
            <tr  key={solicitud.SolicitudId} className="bg-white hover:bg-gray-50 text-center align-middle">
              <td className="px-2 py-4 border-2">{solicitud.CodigoProyecto}</td>
              <td className="px-4 py-4 border-2">{solicitud.NombreMotivo}</td>
              <td className="px-4 py-4 border-2">{solicitud.Nombres}</td>
              <td className="px-4 py-4 border-2">{ajustarFecha(solicitud.FechaInicio)}</td>
              <td className="px-4 py-4 border-2">{ajustarFecha(solicitud.FechaFin)}</td>
              <td className="px-4 py-4 border-2">S/.{solicitud.MontoNetoAprobado.toFixed(2)}</td>
              <td className="px-4 py-4 border-2">S/.{solicitud.MontoTotalGastado.toFixed(2)}</td>
              <td className="px-4 py-4 border-2">
                S/.{(solicitud.MontoNetoAprobado - solicitud.MontoTotalGastado).toFixed(2)}
              </td>
              <td className="px-2 py-4 border-2 text-center">
                <button 
                  className="text-[#615a5a] font-semibold py-1 rounded-md underline"
                  onClick={() => openModal(solicitud)}
                >
                  Visualizar
                </button>
              </td>
            </tr>
          ))}
          </tbody>        
        </table>
      </div>
      {isModalOpen && <RendicionConstanciasModal onClose={closeModal} solicitud={selectedSolicitud} onAprobar={aprobarSolicitud} />}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
}
