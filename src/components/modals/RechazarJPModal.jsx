import { useState } from "react";

const RechazarJPModal = ({ isOpen, onClose, handleRechazar, solicitudId}) => {
  
  const [motivoRechazo, setMotivoRechazo] = useState('');

  if (!isOpen) return null;

  const handleRechazarClick  = () => {
    if (solicitudId) { // Asegúrate de que solicitudId no sea undefined
      handleRechazar(solicitudId, motivoRechazo);
      onClose();
    } else {
      console.error('Solicitud ID es undefined o null');
    }
  };

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
          <label>Ingresar motivo de rechazo del viático:</label>
          <textarea
            id="message" 
            rows={4} 
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Escribe aquí..."
            value={motivoRechazo}
            onChange={(e) => setMotivoRechazo(e.target.value)}
          >

          </textarea>
          <button
            onClick={handleRechazarClick} 
            className="border-2 w-60 h-12 rounded-lg bg-red-400 mx-auto hover:bg-red-600">
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RechazarJPModal;