import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { ajustarFecha } from "@/utils/dateUtils";

const RendicionRevisionModal = ({ isOpen, onClose, solicitud }) => {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!isOpen) return null;

  const nombreJustificado = `viatico_justificado_${solicitud.CodigoSolicitud}.pdf`;
  const nombreInjustificado = `viatico_injustificado_${solicitud.CodigoSolicitud}.pdf`;

  const montoTotalUtilizado = (solicitud.MontoGastadoDeclaradoJustificado || 0) + (solicitud.MontoGastadoDeclaradoInjustificado || 0);
  const montoPendiente = solicitud.MontoNetoAprobado - montoTotalUtilizado;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (solicitud.EstadoId === 6) {
      setError('Sus viáticos aun siguen siendo revisados por contabilidad');
      setLoading(false);
      return;
    }

    if (!solicitud.RendicionId) {
      setError('RendicionId no está definido');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('SolicitudId', solicitud.SolicitudId);
    formData.append('RendicionId', solicitud.RendicionId);
    formData.append('documento', file);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/actualizar-rendicion`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, 
      });
      setSuccess('Documento subido con éxito');
      onClose();
    } catch (err) {
      setError('Error al subir el documento');
      console.error('Error al subir el documento', err);
    } finally {
      setLoading(false);
    }
  };

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
        
        {montoPendiente > 0 && (
          <form onSubmit={handleSubmit} className="flex flex-row md:flex-col md:justify-around items-start justify-start gap-x-4 gap-y-4 bg-gray-200 p-4 rounded-lg">
            <div>
              <p className="font-medium text-[#634040]">Depósito pendiente de S/. {montoPendiente.toFixed(2)}</p>
            </div>
            <div className="flex w-full gap-x-4">
              <div className="w-4/5">
                <label>Constancia del depósito</label>
                <input
                  onChange={(e) => setFile(e.target.files[0])} 
                  className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-1 w-full" aria-describedby="file_input_help" id="file_input" type="file"></input>
              </div>
              <div className="mt-2">
                <button className="bg-gray-400 shadow-lg w-28 md:w-24 h-8 rounded-lg mt-4">
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>
          </form>
        )}
        {error && 
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
            <strong className="font-bold">{error}</strong>
          </div>
        }
        {success && <p className="text-green-500">{success}</p>}

        <div className="flex flex-col gap-y-5 mt-4">
          <div className="p-2 w-60 ml-5 bg-[#976666] text-white rounded-sm">
            <p>Codigo de Viático: <span>{solicitud.SolicitudId}</span></p>
          </div>
          <ul className="list-none pl-4">
            <li className="m-2 mb-6">Centro de Costo: 
              <p className="text-gray-500">{solicitud.CodigoProyecto}</p>
            </li>
            <li className="m-2 mb-6">Corresponsabilidad: 
              <p className="text-gray-500">{solicitud.Codigo}</p>
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
              <p className="font-thin text-gray-500">S/.{solicitud.MontoNetoInicial}</p>
            </li>
            <li className="m-2 mb-6">Monto Aprobado: 
              <p className="font-thin text-gray-500">S/.{solicitud.MontoNetoAprobado}</p>
            </li>
            <li className="m-2 mb-6">Monto Utilizado: 
              <p className="font-thin text-gray-500">S/.{montoTotalUtilizado.toFixed(2)}</p>
            </li>
            <li className="m-2 mb-6">Datos Adjuntos:
              <a href={solicitud.DocumentoAdjuntoJustificado} download={nombreJustificado} className="font-thin text-gray-600 flex underline">
                Viatico justificado <span className="ml-1"><IoDocumentAttachOutline /></span>
              </a>
              <a href={solicitud.DocumentoAdjuntoInjustificado} download={nombreInjustificado} className="font-thin text-gray-600 flex underline">
                Viatico injustificado <span className="ml-1"><IoDocumentAttachOutline /></span>
              </a>
            </li>
          </ul>
          {solicitud.EstadoId === 5 && (
            <div className="flex">
              <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
              <p>Abonado por contabilidad</p>  
            </div>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default RendicionRevisionModal;
