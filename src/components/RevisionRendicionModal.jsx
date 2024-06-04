import { CiCalendarDate } from "react-icons/ci";
import {ajustarFecha } from "@/utils/dateUtils";

// Componente del modal para revisión de rendición
const RendicionRevisionModal = ({ onClose, solicitud }) => {

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
        <div className="w-11/12 mx-auto flex justify-between gap-x-10">
          <div className="w-128 border-2">
            <h3 className="m-4 text-[#664242] font-semibold">Rendición con sustento</h3>
            <div className="flex justify-around m-2">
              <div>
                <p>Monto utilizado</p>
                <span>S/.{solicitud.MontoGastadoDeclaradoJustificado}</span>
              </div>
              <div>
                <p>Dato adjunto</p>
                <a href={solicitud.DocumentoAdjuntoJustificado} target="_blank" className="text-blue-500 underline">
                  PDFAdjunto.pdf
                </a>
              </div>
            </div>
          </div>
          <div className="w-128 border-2">
            <h3 className="m-4 text-[#664242] font-semibold">Rendición sin sustento</h3>
            <div className="flex justify-around m-2">
              <div>
                <p>Monto utilizado</p>
                <span>S/.{solicitud.MontoGastadoDeclaradoInjustificado}</span>
              </div>
              <div>
                <p>Declaración jurada</p>
                <a href={solicitud.DocumentoAdjuntoInjustificado} target="_blank" className="text-blue-500 underline">
                  PDFAdjunto.pdf
                </a>
              </div>
             
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto mt-10">
            <ul className="list-none pl-4">
              <li className="m-2 mb-6">Centro de Costo: 
                <p className="text-gray-500">{solicitud.CodigoProyecto}</p>
              </li>
              <li className="m-2 mb-6">Corresponsabilidad: 
                <p className="text-gray-500">{solicitud.CodigoAreatecnica}</p>
              </li>
              <li className="m-2 mb-6">Motivo de viático: 
                <p className="text-gray-500">{solicitud.NombreMotivo}</p>
              </li>
              <li className="m-2 mb-6">Jefe de aprobación: 
                <p className="text-gray-500">{solicitud.Nombres}</p>
              </li>
              <li className="m-2 mb-6">Fecha Inicial:
                <p className="text-gray-500 flex"> <CiCalendarDate className="w-6 h-6"/> {ajustarFecha(solicitud.FechaInicio)}</p>
              </li>
              <li className="m-2 mb-6">Fecha Final: 
                <p className="text-gray-500 flex"><CiCalendarDate className="w-6 h-6"/>{ajustarFecha(solicitud.FechaFin)}</p>
              </li>
              <li className="m-2 mb-6">Monto Aprobado: 
                <p className="text-gray-500 flex">S/.{solicitud.MontoNetoAprobado.toFixed(2)}</p>
              </li>
              <li className="m-2 mb-6">Monto Utilizado: 
                <p className="text-gray-500 flex">S/.{solicitud.MontoTotalGastado.toFixed(2)}</p>
              </li>
            </ul>
            </div>
      </div>
    </div>
  );
};

export default RendicionRevisionModal;
