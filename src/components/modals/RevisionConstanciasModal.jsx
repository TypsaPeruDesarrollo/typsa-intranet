import React, { useState } from "react";
import { BsFiletypePdf } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

const RendicionConstanciasModal = ({ onClose, solicitud, onAprobar, onObservar }) => {

  const [comentarioContabilidadConstancia, setComentarioContabilidadConstancia] = useState('');
  const [imagenAdjunta, setImagenAdjunta] = useState(null);
  const [isObservacionModalOpen, setIsObservacionModalOpen] = useState(false);

  if (!solicitud) {
    return null;
  }

  const handleAprobar = async () => {
    await onAprobar(solicitud.SolicitudId);
    onClose();
  };

  const handleObservar = async () => {
    setIsObservacionModalOpen(true);
  };

  const handleConfirmarObservacion = async () => {
    await onObservar(solicitud.RendicionId, comentarioContabilidadConstancia);
    setIsObservacionModalOpen(false);
    onClose();
  };

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
        <div className="w-11/12 mx-auto flex justify-center">
          <div className="w-11/12 border-2">
            <h3 className="m-4 text-[#664242] font-semibold">Revisión: Constancia de depósito de saldo</h3>
            <div className="flex justify-center gap-x-20 m-2">
              <div>
                <p>Monto utilizado</p>
                <span>S/.{solicitud.MontoTotalGastado.toFixed(2)}</span>
              </div>
              <div>
                <p>Monto no utilizado</p>
                <span>S/.{(solicitud.MontoNetoAprobado - solicitud.MontoTotalGastado).toFixed(2)}</span>
              </div>
              <div>
                <p>Dato adjunto</p>
                <Link href="#" onClick={() => setImagenAdjunta(solicitud.DocumentoComprobante)} className="flex gap-x-2 underline">
                  Factura.pdf <FaRegEye className="w-5 h-5 text-[#73a7ff]"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {imagenAdjunta && (
          <div className="w-11/12 h-80 border-2 mx-auto mt-4 flex flex-col justify-center text-center items-center">
            <div className="relative">
              <img src={imagenAdjunta} alt="Imagen adjunta" className="w-auto h-64 mx-auto" />
              <a href={imagenAdjunta} download target="_black" className="absolute -bottom-5 -right-16 p-2 bg-white rounded-md">
                <FiDownload className="w-10 h-10 text-gray-500" />
              </a>
            </div>
          </div>
        )}
        {!imagenAdjunta && (
          <div className="w-4/5 h-80 border-2 mx-auto mt-4 flex flex-col justify-center text-center items-center">
            <div><BsFiletypePdf className="w-16 h-16 p-1 text-gray-500"/></div>
            <div className="font-extrabold text-gray-500 text-2xl p-1">.PNG</div>
          </div>
        )}
        <div className="flex justify-end gap-x-8 mr-12 mt-4">
          <button className="px-5 py-1 bg-[#d8f9b7] font-medium text-gray-700 rounded-md" onClick={handleAprobar}> Aprobar </button>
          <button className="border-2 px-5 py-1 font-medium text-gray-700 rounded-md" onClick={handleObservar}> Observar </button>
        </div>
        {isObservacionModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="w-full max-w-lg bg-white p-5 rounded-lg shadow-lg relative">
              <h3 className="text-lg font-semibold text-gray-700">Agregar Comentario</h3>
              <textarea
                id="comentarioContabilidadConstancia"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="4"
                value={comentarioContabilidadConstancia}
                onChange={(e) => setComentarioContabilidadConstancia(e.target.value)}
              />
              <div className="flex justify-end gap-x-4 mt-4">
                <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={() => setIsObservacionModalOpen(false)}>Cancelar</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleConfirmarObservacion}>Confirmar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RendicionConstanciasModal;
