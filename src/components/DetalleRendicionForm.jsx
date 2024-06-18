import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const DetalleRendicionForm = ({ detalles, setDetalles }) => {
  
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newDetalles = [...detalles];
    newDetalles[index][name] = value;
    setDetalles(newDetalles);
  };

  const handleAddRow = () => {
    const newDetalles = [
      ...detalles,
      {
        resumen: '',
        precioUnitario: 0,
        personas: 0,
        cantidad: 0,
      }
    ];
    setDetalles(newDetalles);
  };

  const handleRemoveRow = (index) => {
    const newDetalles = detalles.filter((_, i) => i !== index);
    setDetalles(newDetalles);
  };

  const calculateTotal = (detalle) => {
    return (detalle.precioUnitario * detalle.personas * detalle.cantidad).toFixed(2);
  };

  return (
    <form className="p-6 rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Precio unitario</th>
              <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Personas</th>
              <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad de días</th>
              <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="py-2 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {detalles.map((detalle, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="resumen"
                    value={detalle.resumen}
                    onChange={event => handleChange(index, event)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <input
                    type="number"
                    name="precioUnitario"
                    value={detalle.precioUnitario}
                    onChange={event => handleChange(index, event)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <input
                    type="number"
                    name="personas"
                    value={detalle.personas}
                    onChange={event => handleChange(index, event)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <input
                    type="number"
                    name="cantidad"
                    value={detalle.cantidad}
                    onChange={event => handleChange(index, event)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  S/.{calculateTotal(detalle)}
                </td>
                <td className="py-2 px-4 whitespace-nowrap text-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="text-zinc-600 hover:text-red-800 focus:outline-none"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={handleAddRow}
          className="px-4 py-2 bg-[#f0f0f0] hover:bg-zinc-300 text-gray-600 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          <FaPlus className="mr-2" /> Agregar otra fila
        </button>
      </div>
    </form>
  );
};

export default DetalleRendicionForm;
