import React, { useRef, useEffect } from 'react';

const TablaRegistrosGuardados = ({ registros, handleRegistroClick, selectedRegistroIndex, setSelectedRegistroIndex }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Verificar si el clic ocurrió fuera de la tabla
      if (tableRef.current && !tableRef.current.contains(e.target)) {
        setSelectedRegistroIndex(null); // Deseleccionar el registro
      }
    };

    // Agregar el evento de clic en el documento
    document.addEventListener('click', handleClickOutside);

    // Eliminar el evento cuando el componente se desmonte
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setSelectedRegistroIndex]);

  const renderAdjuntoLink = (registro) => {
    if (registro.Adjunto instanceof Blob) {
      const url = URL.createObjectURL(registro.Adjunto);
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Ver Adjunto
        </a>
      );
    } else if (typeof registro.Adjunto === 'string') {
      return (
        <a href={registro.Adjunto} target="_blank" rel="noopener noreferrer">
          Ver Adjunto
        </a>
      );
    } else {
      return null;
    }
  };

  // Calcular el total de los importes
  const totalImporte = registros.reduce((total, registro) => {
    const importe = parseFloat(registro.Importe) || 0; // Asegurarse de que el importe sea un número
    return total + importe;
  }, 0);

  return (
    <div className="p-4 bg-white rounded-md shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-4">Registros Guardados</h3>
      <table ref={tableRef} className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
  <thead>
    <tr className="bg-gray-100 text-gray-600 border-b border-gray-200">
      <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Tipo comprobante</th>
      <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Fecha</th>
      <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Comprobante de Pago</th>
      <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Nro Comprobante de Pago</th>
      <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Proveedor</th>
      <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Detalle</th>
      <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Importe</th>
      <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider">Adjunto</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {registros.map((registro, index) => (
      <tr
        key={index}
        onClick={() => handleRegistroClick(index)}
        className={`cursor-pointer hover:bg-gray-50 ${selectedRegistroIndex === index ? 'bg-gray-100' : ''}`}
      >
        <td className="py-3 px-4 text-sm text-gray-700">{registro.Item}</td>
        <td className="py-3 text-sm text-gray-700">{registro.Fecha ? registro.Fecha.split('T')[0] : ''}</td>
        <td className="py-3 px-4 text-sm text-gray-700 text-center">{registro.TipoComprobante}</td>
        <td className="py-3 px-4 text-sm text-gray-700 text-center">{registro.Numero}</td>
        <td className="py-3 px-4 text-sm text-gray-700">{registro.Proveedor}</td>
        <td className="py-3 px-4 text-sm text-gray-700">{registro.Detalle}</td>
        <td className="py-3 px-4 text-sm text-gray-700">{registro.Importe}</td>
        <td className="py-3 px-4 text-sm text-gray-700">
          {renderAdjuntoLink(registro)}
        </td>
      </tr>
    ))}
  </tbody>
</table>


      {/* Mostrar el total del importe */}
      <div className="flex justify-end mt-6">
        <p className="text-lg font-semibold text-gray-800">
          Total Importe: S/. {totalImporte.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default TablaRegistrosGuardados;
