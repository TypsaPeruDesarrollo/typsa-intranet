import { useState, useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { ajustarFecha } from "@/utils/dateUtils";

const RendicionRevisionModal = ({ onClose, solicitud }) => {
  const [detalles, setDetalles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/rendicion-viaticos/${solicitud.SolicitudId}`);
        setDetalles(response.data);
      } catch (error) {
        setError("Error al obtener los detalles de la rendición");
        console.error("Error al obtener los detalles de la rendición:", error);
      }
    };

    if (solicitud) {
      fetchDetalles();
    }
  }, [solicitud]);

  const downloadFile = (adjunto, mimeType, fileName) => {
    const link = document.createElement("a");
    link.href = adjunto;
    link.setAttribute("download", `${fileName}.${mimeType === 'application/pdf' ? 'pdf' : 'jpg'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!solicitud) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-6xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
        <div className="flex justify-end">
          <button className="text-black w-10 h-10" onClick={onClose}>
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="w-11/12 mx-auto mt-10">
          <h2 className="text-xl font-bold mb-4">Detalles de la Rendición</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                {["Fecha", "Número", "Proveedor", "Item", "Detalle", "Importe", "Adjunto"].map(header => (
                  <th key={header} className="px-4 py-2 border-b border-gray-300 bg-gray-50">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border-b border-gray-300">{ajustarFecha(detalle.Fecha)}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{detalle.Numero}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{detalle.Proveedor}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{detalle.Item}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{detalle.Detalle}</td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    S/.{detalle.Importe != null ? detalle.Importe.toFixed(2) : "0.00"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {detalle.Adjunto && (
                      <button
                        className="text-blue-500 underline"
                        onClick={() => downloadFile(detalle.Adjunto, detalle.MimeType, `adjunto_${detalle.DetalleRendicionId}`)}
                      >
                        Descargar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-11/12 mx-auto mt-10">
          <ul className="list-none pl-4">
            <li className="m-2 p-2 w-60 bg-[#976666] text-white rounded-sm flex">Codigo de Viático:
              <p className="text-white ml-4">00{solicitud.SolicitudId}</p>
            </li>
            <li className="m-2 mb-6">Centro de Costo:
              <p className="text-gray-500">{solicitud.CodigoProyecto}</p>
            </li>
            <li className="m-2 mb-6">Corresponsabilidad:
              <p className="text-gray-500">{solicitud.CodigoAreatecnica}</p>
            </li>
            <li className="m-2 mb-6">Motivo de viático:
              <p className="text-gray-500">{solicitud.NombreMotivo}</p>
            </li>
            <li className="m-2 mb-6">Colaborador:
              <p className="text-gray-500">{solicitud.NombreCompletoColaborador}</p>
            </li>
            <li className="m-2 mb-6">Jefe Aprobador:
              <p className="text-gray-500">{solicitud.JefeAprobadorNombreCompleto}</p>
            </li>
            <li className="m-2 mb-6">JP Aprobador:
              <p className="text-gray-500">{solicitud.JefeProyectoNombreCompleto}</p>
            </li>
            <li className="m-2 mb-6">Fecha Inicial:
              <p className="text-gray-500 flex"><CiCalendarDate className="w-6 h-6" /> {ajustarFecha(solicitud.FechaInicio)}</p>
            </li>
            <li className="m-2 mb-6">Fecha Final:
              <p className="text-gray-500 flex"><CiCalendarDate className="w-6 h-6" /> {ajustarFecha(solicitud.FechaFin)}</p>
            </li>
            <li className="m-2 mb-6">Monto Aprobado:
              <p className="text-gray-500 flex">S/.{solicitud.MontoNetoAprobado.toFixed(2)}</p>
            </li>
            <li className="m-2 mb-6">Monto a devolver:
              <p className="text-red-500 flex">S/.{(solicitud.MontoGastadoDeclaradoJustificado - solicitud.MontoNetoAprobado).toFixed(2)}</p>
            </li>
          </ul>
        </div>
        <div className="flex gap-x-5 pl-4 mb-4">
          <FaCheck />
          <p>Abonado por contabilidad el {ajustarFecha(solicitud.FechaPago)}</p>
        </div>
      </div>
    </div>
  );
};

export default RendicionRevisionModal;
