import React from 'react';
import { CiCalendarDate } from "react-icons/ci";
import { ajustarFecha } from "@/utils/dateUtils";

const ViaticosAprobadosJefe = ({ isOpen, onClose, viatico  }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Detalle Viático Aprobado</h2>
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
        
        <div className="flex flex-col gap-y-5 mt-4 ">
        
          <div className="p-2 w-60 ml-5 bg-[#976666] text-white rounded-sm">
            <p>Código de Viático: <span>{viatico?.CodigoSolicitud.substring(0, 8)}</span></p>
          </div>
          <ul className="list-none pl-4">
            <li className="m-2 mb-6">Centro de Costo: 
              <p className="text-gray-500">{viatico?.CodigoProyecto}</p>
            </li>
            <li className="m-2 mb-6"> Corresponsabilidad
              <p className="text-gray-500">{viatico?.Codigo}</p>
            </li>
            <li className="m-2 mb-6">Motivo de viático: 
              <p className="text-gray-500">{viatico?.NombreMotivo}</p>
            </li>
            <li className="m-2 mb-6">Colaborador: 
              <p className="text-gray-500">{viatico?.Nombres}</p>
            </li>
            <li className="m-2 mb-6">Fecha Inicial:
              <p className="text-gray-500 flex"> <CiCalendarDate className="w-6 h-6"/> {ajustarFecha(viatico?.FechaInicio)}</p>
            </li>
            <li className="m-2 mb-6">Fecha Final: 
              <p className="text-gray-500 flex"><CiCalendarDate className="w-6 h-6"/>{ajustarFecha(viatico?.FechaFin)}</p>
            </li>
            <li className="m-2 mb-6">Monto Solicitado: 
              <p className="text-gray-500">S/.{viatico?.MontoNetoInicial}</p>
            </li>
            <li className="m-2 mb-6">Monto Aprobado: 
              <p className="text-gray-500">S/.{viatico?.MontoNetoAprobado}</p>
            </li>
            <li className="m-2 mb-6">Comentario: 
              <p className="text-gray-500">{viatico?.ComentariosUsuario}</p>
            </li>
            <li className="m-2 mb-6">Comentario del Jefe: 
              <p className="text-gray-500">{viatico?.ComentarioJefeMonto}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViaticosAprobadosJefe;
