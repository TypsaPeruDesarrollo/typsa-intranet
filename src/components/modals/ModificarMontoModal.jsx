import React, { useState, useEffect  } from 'react';

const ModificarMontoModal = ({ isOpen, onClose, solicitud, handleSaveMonto  }) => {
  // Mover los hooks fuera de la condición
  const [detallesPresupuesto, setDetallesPresupuesto] = useState([]);
  const [comentario, setComentario] = useState('');

  // Solo actualizar los estados si la solicitud existe
  useEffect(() => {
    if (solicitud) {
      setDetallesPresupuesto(solicitud.detallesPresupuesto || []);
      setComentario('');
    }
  }, [solicitud]);

  if (!isOpen || !solicitud) return null;

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleDetalleChange = (index, field, value) => {
    const nuevosDetalles = [...detallesPresupuesto];
    nuevosDetalles[index][field] = value;
    setDetallesPresupuesto(nuevosDetalles);
  };

  const handleGuardarClick = () => {
    // Llamar a la función que se pasa desde el componente padre
    handleSaveMonto(solicitud.SolicitudId, detallesPresupuesto, comentario);
    onClose(); // Cerrar el modal después de guardar
  };

  const totalPresupuesto = detallesPresupuesto.reduce((total, detalle) => {
    return total + (detalle.PrecioUnitario * detalle.Personas * detalle.Cantidad);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-3xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
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
          <h3 className="text-lg font-medium">Detalles del Presupuesto</h3>
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Resumen</th>
                <th className="py-2 px-4 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Precio Unitario</th>
                <th className="py-2 px-4 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Personas</th>
                <th className="py-2 px-4 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Cantidad días</th>
                <th className="py-2 px-4 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {detallesPresupuesto.map((detalle, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-sm">
                    <input 
                      type="text" 
                      className="w-full p-1 border border-gray-300 rounded"
                      value={detalle.Resumen}
                      onChange={(e) => handleDetalleChange(index, 'Resumen', e.target.value)}
                    />
                  </td>
                  <td className="py-2 px-4 text-sm text-center">
                    <input 
                      type="number" 
                      className="w-full p-1 border border-gray-300 rounded"
                      value={detalle.PrecioUnitario}
                      onChange={(e) => handleDetalleChange(index, 'PrecioUnitario', parseFloat(e.target.value))}
                    />
                  </td>
                  <td className="py-2 px-4 text-sm text-center">
                    <input 
                      type="number" 
                      className="w-full p-1 border border-gray-300 rounded"
                      value={detalle.Personas}
                      onChange={(e) => handleDetalleChange(index, 'Personas', parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td className="py-2 px-4 text-sm text-center">
                    <input 
                      type="number" 
                      className="w-full p-1 border border-gray-300 rounded"
                      value={detalle.Cantidad}
                      onChange={(e) => handleDetalleChange(index, 'Cantidad', parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td className="py-2 px-4 text-sm text-center">
                    S/.{(detalle.PrecioUnitario * detalle.Personas * detalle.Cantidad).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="font-medium text-sm ">
                <td className="py-2 px-4" colSpan={4}>Total Presupuesto</td>
                <td className="py-2 px-4 text-center">S/.{totalPresupuesto.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
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
            className="border-2 w-60 h-12 rounded-lg bg-[#bbbbbb] font-semibold  mx-auto"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModificarMontoModal;
