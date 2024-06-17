import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import RendicionRevisionModal from "../../../../../components/RevisionRendicionModal";
import RendicionObservacionModal from "../../../../../components/RendicionObservacionModal";
import { ajustarFecha } from "@/utils/dateUtils";
import { FiDownload } from "react-icons/fi";
import { Menu } from "@headlessui/react";
import { generarExcel } from "../../../../../components/DescargarExcel";
import { generarPDF } from "../../../../../components/DescargarPDF";

export default function RendicionesEnRevision() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isObservacionModalOpen, setIsObservacionModalOpen] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/");
    }
  }, [session, loading, router]);

  const fetchSolicitudes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/solicitud-viaticos');
      const filteredData = response.data.filter(solicitud => solicitud.EstadoId === 6)
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

  const openObservacionModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsObservacionModalOpen(true);
  };

  const closeObservacionModal = () => {
    setIsObservacionModalOpen(false);
    setSelectedSolicitud(null);
  };

  const aprobarSolicitud = async (solicitud) => {
    try {
      const montoTotalUtilizado = (solicitud.MontoGastadoDeclaradoJustificado || 0) + (solicitud.MontoGastadoDeclaradoInjustificado || 0);
      const montoPendiente = solicitud.MontoNetoAprobado - montoTotalUtilizado;

      const nuevoEstadoId = montoPendiente === 0 ? 10 : 7;

      await axios.put(`http://localhost:3001/api/solicitud-viaticos/${solicitud.SolicitudId}/estado`, { nuevoEstadoId });
      
      const updatedSolicitudes = solicitudes.filter(s => s.SolicitudId !== solicitud.SolicitudId);
      setSolicitudes(updatedSolicitudes);
      
    } catch (error) {
      console.error('Error al aprobar la solicitud:', error);
      setError('Error al aprobar la solicitud');
    }
  };

  const observarSolicitud = async (comentariosContabilidad) => {
    try {
        if (!selectedSolicitud || !selectedSolicitud.RendicionId) {
            throw new Error('RendicionId is undefined');
        }
        const { RendicionId } = selectedSolicitud;
        console.log('Observar Solicitud:', RendicionId, comentariosContabilidad); // Debugging
        await axios.put(`http://localhost:3001/api/rendicion-viaticos/${RendicionId}/observar`, {
            nuevoEstadoId: 9,
            comentariosContabilidad
        });
        const updatedSolicitudes = solicitudes.filter(s => s.RendicionId !== RendicionId);
        setSolicitudes(updatedSolicitudes);
        closeObservacionModal();
    } catch (error) {
        console.error('Error al observar la rendicion:', error);
        setError('Error al observar la rendicion');
    }
  };

  const handleDescargarExcel = (solicitud) => {
    generarExcel(solicitud);
  };

  const handleDescargarPDF = (solicitud) => {
    generarPDF(solicitud);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-5 sm:left-10 lg:left-20 top-16 font-bold">Revisión de rendiciones</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 w-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
          <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
            <tr className="text-center align-middle">
              {["Centro de Costo", "Motivo", "Usuario", "Fecha Incial", "Fecha Final","Monto aprobado", "Monto utilizado", "Monto a devolver", "Datos adjuntos", "Aprobar", "Observar", "Descargar"].map(header => (
                <th key={header} className="px-4 py-3 border-2 border-gray-200">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => {
              const montoTotalGastado = solicitud.MontoGastadoDeclaradoJustificado + solicitud.MontoGastadoDeclaradoInjustificado;
              const montoADevolver = montoTotalGastado - solicitud.MontoNetoAprobado;
              const mensajeDevolucion = montoADevolver >= 0 ? `S/.${montoADevolver.toFixed(2)}` : `El usuario debe devolver S/.${Math.abs(montoADevolver).toFixed(2)}`;
              
              return (
                <tr key={solicitud.SolicitudId} className="bg-white hover:bg-gray-50 text-center align-middle">
                  <td className="px-2 py-4 border-2">{solicitud.CodigoProyecto}</td>
                  <td className="px-4 py-4 border-2">{solicitud.NombreMotivo}</td>
                  <td className="px-4 py-4 border-2">{solicitud.Nombres}</td>
                  <td className="px-4 py-4 border-2">{ajustarFecha(solicitud.FechaInicio)}</td>
                  <td className="px-4 py-4 border-2">{ajustarFecha(solicitud.FechaFin)}</td>
                  <td className="px-4 py-4 border-2">S/.{solicitud.MontoNetoAprobado.toFixed(2)}</td>
                  <td className="px-4 py-4 border-2">S/.{montoTotalGastado.toFixed(2)}</td>
                  <td className="px-4 py-4 border-2">{mensajeDevolucion}</td>
                  <td className="px-2 py-4 border-2 text-center">
                    <button
                      className="text-[#615a5a] font-semibold py-1 rounded-md underline"
                      onClick={() => openModal(solicitud)}
                    >
                      Visualizar
                    </button>
                  </td>
                  <td className="px-2 py-4 border-2 text-center">
                    <button
                      className="text-gray-800 bg-green-400 font-semibold py-1 rounded-md px-4"
                      onClick={() => aprobarSolicitud(solicitud)}
                    >
                      Aprobar
                    </button>
                  </td>
                  <td className="px-2 py-4 border-2 text-center">
                    <button
                      className="text-gray-800 bg-red-400 font-semibold py-1 rounded-md px-4"
                      onClick={() => openObservacionModal(solicitud)}
                    >
                      Observar
                    </button>
                  </td>
                  <td className="px-2 py-4 border-2 text-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button>
                        <FiDownload className="w-8 h-8"/>
                      </Menu.Button>
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick={() => handleDescargarExcel(solicitud)}
                              >
                                Descargar Excel
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick={() => handleDescargarPDF(solicitud)}
                              >
                                Descargar PDF
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isModalOpen && <RendicionRevisionModal onClose={closeModal} solicitud={selectedSolicitud} />}
      <RendicionObservacionModal
        isOpen={isObservacionModalOpen}
        onClose={closeObservacionModal}
        onSubmitObservation={observarSolicitud}
      />
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
}
