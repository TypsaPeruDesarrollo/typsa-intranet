import React, { useState } from 'react';

const RendicionObservacionModal = ({ isOpen, onClose, onSubmitObservation }) => {
  const [comentariosContabilidad, setComentariosContabilidad] = useState('');

  const handleSubmit = () => {
    onSubmitObservation(comentariosContabilidad);
    setComentariosContabilidad('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
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
        <h3 className="m-4 text-[#664242] font-semibold">Observar Rendición</h3>
        <textarea
          value={comentariosContabilidad}
          onChange={(e) => setComentariosContabilidad(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="Ingrese los comentarios de contabilidad"
        />
        <div className="flex justify-end gap-x-4 mt-4">
          <button onClick={onClose} className="px-5 py-1 bg-gray-300 font-medium text-gray-700 rounded-md">Cancelar</button>
          <button onClick={handleSubmit} className="px-5 py-1 bg-red-400 font-medium text-white rounded-md">Observar</button>
        </div>
      </div>
    </div>
  );
};

export default RendicionObservacionModal;
