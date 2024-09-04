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

  return (
    <div className="p-4 bg-white rounded-md shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-4">Registros Guardados</h3>
      <table ref={tableRef} className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-1 px-4 border text-xs font-normal">Tipo comprobante</th>
            <th className="py-1 px-4 border text-xs font-normal">Fecha</th>
            <th className="py-1 px-4 border text-xs font-normal">Tipo de Comprobante de Pago</th>
            <th className="py-1 px-4 border text-xs font-normal">Nro Comprobante de Pago</th>
            <th className="py-1 px-4 border text-xs font-normal">Proveedor</th>
            <th className="py-1 px-4 border text-xs font-normal">Detalle</th>
            <th className="py-1 px-4 border text-xs font-normal">Importe</th>
            <th className="py-1 px-4 border text-xs font-normal">Adjunto</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, index) => (
            <tr 
              key={index}
              onClick={() => handleRegistroClick(index)}
              className={selectedRegistroIndex === index ? 'bg-gray-200' : ''}
            >
              <td className="py-2 px-4 border text-xs font-normal">
                <span>{registro.Item}</span>
              </td>
              <td className="py-2 px-4 border text-xs font-normal">
                <span>{registro.Fecha ? registro.Fecha.split('T')[0] : ''}</span>
              </td>
              <td className="py-2 px-4 border text-xs font-normal">
                <span>{registro.TipoComprobante}</span>
              </td>
              <td className="py-2 px-4 border text-xs font-normal">
                <span>{registro.Numero}</span>
              </td>
              <td className="py-2 px-4 border text-xs font-normal">
                <span>{registro.Proveedor}</span>
              </td>
              <td className="py-2 px-4 border text-xs font-normal">
                <span>{registro.Detalle}</span>
              </td>
              <td className="py-2 px-4 border text-xs font-normal">
                <span>{registro.Importe}</span>
              </td>
              <td className="py-2 px-4 border text-xs font-normal">
                {renderAdjuntoLink(registro)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaRegistrosGuardados;
