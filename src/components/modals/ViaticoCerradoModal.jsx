import { IoIosCheckboxOutline } from "react-icons/io";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import {ajustarFecha } from "@/utils/dateUtils"

const RendicionRevisionModal = ({ isOpen, onClose, solicitud}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
    <div className="w-full max-w-2xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Viáticos en Rendición</h2>
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
      <div className="flex flex-col gap-y-5 mt-4">
          <div className="p-2 w-60 ml-5 bg-[#976666] text-white rounded-sm">
            <p>Codigo de Viático: <span>{solicitud.CodigoSolicitud.substring(0, 8)}</span></p>
          </div>
          <ul className="list-none pl-4">
            <li className="m-2 mb-6">Centro de Costo: 
              <p className="text-gray-500">{solicitud.CodigoProyecto}</p>
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
            <li className="m-2 mb-6">Monto Solicitado: 
              <p className="text-gray-500">S/.{solicitud.MontoNetoInicial}</p>
            </li>
            <li className="m-2 mb-6">Monto Utilizado: 
              <p className="font-thin text-gray-500">S/.70</p>
            </li>
            <li className="m-2 mb-6">Datos Adjuntos:
              <p className="font-thin text-gray-600 flex">Viaticos203.pdf <span className="ml-1"><IoDocumentAttachOutline /></span></p>
            </li>
          </ul>
          {solicitud.EstadoId === 10 && (
            <div>
              <div className="flex">
                <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
                <p>Abonado por contabilidad</p>  
              </div>
              <div className="flex">
              <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
              <p>Rendición conforme por contabilidad</p>  
              </div>
              <div className="flex">
                <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
                <p>No contó con saldo por depositar</p>  
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RendicionRevisionModal;