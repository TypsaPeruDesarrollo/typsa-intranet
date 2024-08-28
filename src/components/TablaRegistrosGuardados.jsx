import React from 'react';

const TablaRegistrosGuardados = ({ registros, handleRegistroClick, selectedRegistroIndex }) => {

  return (
    <div className="p-4 bg-white rounded-md shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-4">Registros Guardados</h3>
      <table className="min-w-full bg-white border">
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
                {registro.Adjunto && (
                  <a href={registro.Adjunto} target="_blank" rel="noopener noreferrer">
                    Ver Adjunto
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaRegistrosGuardados;
