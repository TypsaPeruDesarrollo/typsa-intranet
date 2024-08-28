import React, { useState, useEffect, useRef } from 'react';

const FormularioIngresoBoletas = ({ registros, setRegistros, registroEditable, onUpdateRegistro }) => {
  const [item, setItem] = useState('');
  const [fecha, setFecha] = useState('');
  const [tipoComprobante, setTipoComprobante] = useState('');
  const [nroComprobante, setNroComprobante] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [detalle, setDetalle] = useState('');
  const [importe, setImporte] = useState('');
  const [adjunto, setAdjunto] = useState(null);
  const [adjuntoExistente, setAdjuntoExistente] = useState(null); // Para manejar el archivo existente
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (registroEditable) {
      setItem(registroEditable.Item || '');
      setFecha(registroEditable.Fecha ? registroEditable.Fecha.split('T')[0] : '');
      setTipoComprobante(registroEditable.TipoComprobante || '');
      setNroComprobante(registroEditable.Numero || '');
      setProveedor(registroEditable.Proveedor || '');
      setDetalle(registroEditable.Detalle || '');
      setImporte(registroEditable.Importe || '');
      setAdjuntoExistente(registroEditable.Adjunto || null); // Cargar el adjunto existente
      setAdjunto(null); // Resetea el nuevo adjunto
    }
  }, [registroEditable]);

  const handleAddBoleta = (e) => {
    e.preventDefault();
    const updatedRegistro = {
      Item: item,
      Fecha: fecha,
      TipoComprobante: tipoComprobante,
      Numero: nroComprobante,
      Proveedor: proveedor,
      Detalle: detalle,
      Importe: importe,
      Adjunto: adjunto || adjuntoExistente, // Usar el nuevo adjunto o el existente
    };

    if (registroEditable) {
      onUpdateRegistro(updatedRegistro);
    } else {
      setRegistros([...registros, updatedRegistro]);
    }

    handleReset();
  };

  const handleReset = () => {
    setItem('');
    setFecha('');
    setTipoComprobante('');
    setNroComprobante('');
    setProveedor('');
    setDetalle('');
    setImporte('');
    setAdjunto(null);
    setAdjuntoExistente(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Resetear manualmente el input de archivo
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-4">Formulario de Gastos</h3>
      <form onSubmit={handleAddBoleta}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Campos del formulario */}
          <div>
            <label className="block mb-2">Tipo comprobante:</label>
            <select
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccionar</option>
              <option value="Hotel">Hotel</option>
              <option value="Alimento">Alimento</option>
              <option value="Movilidad">Movilidad</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Fecha:</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Tipo de Comprobante de Pago:</label>
            <select
              value={tipoComprobante}
              onChange={(e) => setTipoComprobante(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccionar</option>
              <option value="factura">Factura</option>
              <option value="boleta">Boleta</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Nro Comprobante de Pago:</label>
            <input
              type="text"
              value={nroComprobante}
              onChange={(e) => setNroComprobante(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Proveedor:</label>
            <input
              type="text"
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Detalle:</label>
            <input
              type="text"
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Importe:</label>
            <input
              type="number"
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Adjuntar Imagen/PDF:</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setAdjunto(e.target.files[0])}
              className="w-full p-2 border rounded"
              ref={fileInputRef}
            />
            {adjuntoExistente && (
              <div className="mt-2">
                <a href={adjuntoExistente} target="_blank" rel="noopener noreferrer">
                  Ver archivo adjunto existente
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            {registroEditable ? 'Actualizar Boleta' : 'Agregar Boleta'}
          </button>
          <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded" onClick={handleReset}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioIngresoBoletas;
