import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const DetallePresupuestoForm = ({ onDetallesChange }) => {
  const [detalles, setDetalles] = useState([{
    resumen: '',
    precioUnitario: 0,
    personas: 0,
    cantidad: 0,
  }]);

  useEffect(() => {
    const totales = detalles.map(detalle => detalle.precioUnitario * detalle.personas * detalle.cantidad);
    const totalSuma = totales.reduce((acc, current) => acc + current, 0);
    onDetallesChange(detalles, totalSuma);
  }, [detalles, onDetallesChange]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setDetalles(prevDetalles => {
      const newDetalles = [...prevDetalles];
      // Asegúrate de que los campos numéricos se manejen como números
      newDetalles[index][name] = name === 'precioUnitario' || name === 'personas' || name === 'cantidad' ? parseFloat(value) || 0 : value;
      return newDetalles;
    });
  };

  const handleAddRow = useCallback(() => {
    setDetalles(prevDetalles => [
      ...prevDetalles,
      { resumen: '', precioUnitario: 0, personas: 0, cantidad: 0 }
    ]);
  }, []);

  const handleRemoveRow = useCallback((index) => {
    setDetalles(prevDetalles => prevDetalles.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    console.log('Detalles:', detalles);
  }, [detalles]);

  const totales = useMemo(() => detalles.map(detalle =>
    detalle.precioUnitario * detalle.personas * detalle.cantidad
  ), [detalles]);

  const totalSuma = useMemo(() => totales.reduce((acc, current) => acc + current, 0), [totales]);

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg">
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
                  {totales[index].toFixed(2)} {/* Asegúrate de formatear el total */}
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
        <div>
          Total Suma: {totalSuma.toFixed(2)} {/* Muestra la suma total formateada */}
        </div>
      </div>
    </form>
  );
};

export default DetallePresupuestoForm;
