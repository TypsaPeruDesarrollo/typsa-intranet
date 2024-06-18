import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosCheckboxOutline } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { ajustarFecha } from "@/utils/dateUtils";
import DetalleRendicionForm from './DetalleRendicionForm';
import FormularioRendicion from './FormularioRendicion';

const RendirModal = ({ isOpen, onClose, solicitud }) => {
  const [montoGastadoDeclaradoJustificado, setMontoGastadoDeclaradoJustificado] = useState('');
  const [montoGastadoDeclaradoInjustificado, setMontoGastadoDeclaradoInjustificado] = useState('');
  const [documentoJustificado, setDocumentoJustificado] = useState(null);
  const [documentoInjustificado, setDocumentoInjustificado] = useState(null);
  const [comentariosContabilidad, setComentariosContabilidad] = useState('');
  const [rendicionId, setRendicionId] = useState(null);
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    if (solicitud && solicitud.EstadoId === 9) {
      setComentariosContabilidad(solicitud.ComentariosContabilidad);
      setMontoGastadoDeclaradoJustificado(solicitud.MontoGastadoDeclaradoJustificado || '');
      setMontoGastadoDeclaradoInjustificado(solicitud.MontoGastadoDeclaradoInjustificado || '');
      setRendicionId(solicitud.RendicionId); 
    }
  }, [solicitud]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem('userEmail');

    const formData = new FormData();
    formData.append('SolicitudId', solicitud.SolicitudId);
    formData.append('MontoGastadoDeclaradoJustificado', montoGastadoDeclaradoJustificado);
    formData.append('MontoGastadoDeclaradoInjustificado', montoGastadoDeclaradoInjustificado);
    formData.append('ComentariosUsuario', solicitud.ComentariosUsuario);
    formData.append('CorreoUsuario', userEmail);
    if (documentoJustificado) {
      formData.append('documentoJustificado', documentoJustificado);
    }
    if (documentoInjustificado) {
      formData.append('documentoInjustificado', documentoInjustificado);
    }
    formData.append('Detalles', JSON.stringify(detalles));

    try {
      const url = rendicionId ? 'http://localhost:3001/api/actualizar-rendicion-observada' : 'http://localhost:3001/api/rendicion';
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      onClose();
    } catch (error) {
      console.error('Error al subir la rendición', error);
    }
  };

  const isPendingApproval = solicitud && solicitud.EstadoId === 6;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Rendir Viático</h2>
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
        
        {isPendingApproval ? (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-yellow-600">Ya has rendido este viático. Está pendiente de aprobación por contabilidad.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-y-5 mt-4">
            {solicitud && solicitud.EstadoId === 9 && (
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-yellow-50 " role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{comentariosContabilidad}</span>
                </div>
              </div>
            )}
            
            <DetalleRendicionForm detalles={detalles} setDetalles={setDetalles} />
            
            <FormularioRendicion 
              montoGastadoDeclaradoJustificado={montoGastadoDeclaradoJustificado}
              setMontoGastadoDeclaradoJustificado={setMontoGastadoDeclaradoJustificado}
              montoGastadoDeclaradoInjustificado={montoGastadoDeclaradoInjustificado}
              setMontoGastadoDeclaradoInjustificado={setMontoGastadoDeclaradoInjustificado}
              documentoJustificado={documentoJustificado}
              setDocumentoJustificado={setDocumentoJustificado}
              documentoInjustificado={documentoInjustificado}
              setDocumentoInjustificado={setDocumentoInjustificado}
              handleSubmit={handleSubmit}
            />

            <div className="p-2 w-60 ml-5 bg-[#976666] text-white rounded-sm">
              <p>Código de Viático: <span>{solicitud?.CodigoSolicitud.substring(0, 8)}</span></p>
            </div>
            <ul className="list-none pl-4">
              <li className="m-2 mb-6">Centro de Costo: 
                <p className="text-gray-500">{solicitud?.CodigoProyecto}</p>
              </li>
              <li className="m-2 mb-6"> Corresponsabilidad
                <p className="text-gray-500">{solicitud?.Codigo}</p>
              </li>
              <li className="m-2 mb-6">Motivo de viático: 
                <p className="text-gray-500">{solicitud?.NombreMotivo}</p>
              </li>
              <li className="m-2 mb-6">Jefe de aprobación: 
                <p className="text-gray-500">{solicitud?.Nombres}</p>
              </li>
              <li className="m-2 mb-6">Fecha Inicial:
                <p className="text-gray-500 flex"> <CiCalendarDate className="w-6 h-6"/> {ajustarFecha(solicitud?.FechaInicio)}</p>
              </li>
              <li className="m-2 mb-6">Fecha Final: 
                <p className="text-gray-500 flex"><CiCalendarDate className="w-6 h-6"/>{ajustarFecha(solicitud?.FechaFin)}</p>
              </li>
              <li className="m-2 mb-6">Monto Solicitado: 
                <p className="text-gray-500">S/.{solicitud?.MontoNetoInicial}</p>
              </li>
              <li className="m-2 mb-6">Monto Aprobado: 
                <p className="text-gray-500">S/.{solicitud?.MontoNetoAprobado}</p>
              </li>
              <li className="m-2 mb-6">Comentario: 
                <p className="text-gray-500">{solicitud?.ComentariosUsuario}</p>
              </li>
              <li className="m-2 mb-6">Comentario del Jefe: 
                <p className="text-gray-500">{solicitud?.ComentarioJefeMonto}</p>
              </li>
            </ul>
            {solicitud && solicitud.EstadoId === 5 && (
              <div className="flex">
                <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
                <p>Abonado por contabilidad</p>  
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RendirModal;
