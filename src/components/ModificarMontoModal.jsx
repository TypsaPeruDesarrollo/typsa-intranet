import React, { useState } from 'react';

const ModificarMontoModal = ({ isOpen, onClose, solicitudId, handleSaveMonto }) => {
  const [monto, setMonto] = useState('');
  const [comentario, setComentario] = useState('');

  const handleMontoChange = (e) => {
    setMonto(e.target.value);
  };

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleGuardarClick = () => {
    if (monto && comentario) {
      handleSaveMonto(solicitudId, monto, comentario);
      onClose();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-lg max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
        <div className="flex justify-end items-center">
          <button className="text-black w-6 h-6" onClick={onClose}>
            <svg
              className="w-4 h-4"
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
          <div>
            <label>Ingresar monto a modificar:</label>
            <input
              type='number'
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
              value={monto}
              onChange={handleMontoChange}
            />
          </div>
          <div>
            <label>Comentario:</label>
            <textarea
              id="message" 
              rows={2}
              value={comentario}
              onChange={handleComentarioChange} 
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Escribe aquí..."
            >
            </textarea>
          </div>
          <button
            onClick={handleGuardarClick}
            className="border-2 w-60 h-12 rounded-lg bg-[#bbbbbb] font-semibold  mx-auto">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModificarMontoModal;