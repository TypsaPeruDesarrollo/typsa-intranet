import React, { useState } from 'react';
import axios from 'axios';
import { IoIosCheckboxOutline } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import {ajustarFecha } from "@/utils/dateUtils"

const RendirModal = ({ isOpen, onClose, solicitud }) => {

  const [montoGastadoDeclaradoJustificado, setMontoGastadoDeclaradoJustificado] = useState('');
  const [montoGastadoDeclaradoInjustificado, setMontoGastadoDeclaradoInjustificado] = useState('');
  const [documentoJustificado, setDocumentoJustificado] = useState(null);
  const [documentoInjustificado, setDocumentoInjustificado] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('SolicitudId', solicitud.SolicitudId);
    formData.append('MontoGastadoDeclaradoJustificado', montoGastadoDeclaradoJustificado);
    formData.append('MontoGastadoDeclaradoInjustificado', montoGastadoDeclaradoInjustificado);
    formData.append('documentoJustificado', documentoJustificado);
    formData.append('documentoInjustificado', documentoInjustificado);

    try {
      const res = await axios.post('http://localhost:3001/api/rendicion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      onClose(); // Cierra el modal después de enviar los datos
    } catch (error) {
      console.error('Error al subir la rendición', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
    <div className="w-full max-w-2xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
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
      
      <div className="flex flex-col gap-y-5 mt-4 ">
        <form 
          onSubmit={handleSubmit}
          className="flex flex-row md:flex-col md:justify-center md:items-center items-start justify-start gap-x-4 gap-y-4 bg-gray-200 p-4 rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
          <div className='flex gap-x-10'>
            <div>
              <label>Monto utilizado</label>
              <input 
                type="number" 
                onChange={(e) => setMontoGastadoDeclaradoJustificado(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 w-full" placeholder="S/." required />
            </div>
            <div>
              <label>Adjuntar documento</label>
              <input
                onChange={(e) => setDocumentoJustificado(e.target.files[0])}
                className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-1 w-full" aria-describedby="file_input_help" id="file_input" type="file"></input>
            </div>
          </div>
          <div className='flex gap-x-10'>
            <div>
              <label>Monto utilizado</label>
              <input 
                type="number" 
                onChange={(e) => setMontoGastadoDeclaradoInjustificado(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 w-full" placeholder="S/." required />
            </div>
            <div>
              <label>Declaración jurada</label>
              <input
                onChange={(e) => setDocumentoInjustificado(e.target.files[0])}
                className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-1 w-full " aria-describedby="file_input_help" id="file_input" type="file"></input>
            </div>
          </div>
          <div >
            <button className="bg-gray-400 shadow-lg w-28 md:w-24 h-8 rounded-md mt-3">Rendir</button>
          </div>
        </form>
          <div className="p-2 w-60 ml-5 bg-[#976666] text-white rounded-sm">
            <p>Codigo de Viático: <span>{solicitud.CodigoSolicitud.substring(0, 8)}</span></p>
          </div>
          <ul className="list-none pl-4">
            <li className="m-2 mb-6">Centro de Costo: 
              <p className="text-gray-500">{solicitud.CodigoProyecto}</p>
            </li>
            <li className="m-2 mb-6"> Corresponsabilidad
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
              <p className="text-gray-500">S/.{solicitud.MontoNetoInicial}</p>
            </li>
            <li className="m-2 mb-6">Monto Aprobado: 
              <p className="text-gray-500">S/.{solicitud.MontoNetoAprobado}</p>
            </li>
            <li className="m-2 mb-6">Comentario: 
              <p className="text-gray-500">{solicitud.ComentariosUsuario}</p>
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

export default RendirModal;