import React, { useState, useEffect } from 'react';
import { IoIosCheckboxOutline } from "react-icons/io";
import { ajustarFecha } from "@/utils/dateUtils";
import axios from 'axios';

const RendirModal = ({ isOpen, onClose, solicitud }) => {
  const [montoGastadoDeclaradoJustificado, setMontoGastadoDeclaradoJustificado] = useState('');
  const [comentariosContabilidad, setComentariosContabilidad] = useState('');
  const [rendicionId, setRendicionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [item, setItem] = useState('');
  const [fecha, setFecha] = useState('');
  const [tipoComprobante, setTipoComprobante] = useState('');
  const [nroComprobante, setNroComprobante] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [detalle, setDetalle] = useState('');
  const [importe, setImporte] = useState('');
  const [adjunto, setAdjunto] = useState(null);
  const [registros, setRegistros] = useState([]);
  const [selectedRegistroIndex, setSelectedRegistroIndex] = useState(null);

  useEffect(() => {
    if (solicitud && solicitud.EstadoId === 9) {
      setComentariosContabilidad(solicitud.ComentariosContabilidad);
      setMontoGastadoDeclaradoJustificado(solicitud.MontoGastadoDeclaradoJustificado || '');
      setRendicionId(solicitud.RendicionId); 
    }
  }, [solicitud]);

  if (!isOpen) return null;

  const handleAddBoleta = (e) => {
    e.preventDefault();  // Prevenir recarga de la página
    const newRegistro = {
      item,
      fecha,
      tipoComprobante,
      nroComprobante,
      proveedor,
      detalle,
      importe,
      adjunto
    };
    setRegistros([...registros, newRegistro]);
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
  };

  const handleDelete = () => {
    if (selectedRegistroIndex !== null) {
      const newRegistros = registros.filter((_, index) => index !== selectedRegistroIndex);
      setRegistros(newRegistros);
      setSelectedRegistroIndex(null);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('solicitudId', solicitud.SolicitudId);
    formData.append('boletas', JSON.stringify(registros));

    registros.forEach((registro, index) => {
      if (registro.adjunto) {
        formData.append(`adjunto`, registro.adjunto);
      }
    });

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/rendir`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Rendición guardada con éxito', response.data);
      onClose();
    } catch (error) {
      console.error('Error al rendir', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isPendingApproval = solicitud && solicitud.EstadoId === 6;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Rendir Viático</h2>
          <button className="text-black w-10 h-10" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {isPendingApproval ? (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-yellow-600">Ya has rendido este viático. Está pendiente de aprobación por contabilidad.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-y-5 mt-4">
            {solicitud && solicitud.EstadoId === 9 && (
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-yellow-50 " role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{solicitud.ComentariosContabilidad}</span>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-gray-100 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Nro. de solicitud:</strong> {solicitud?.SolicitudId}</p>
                  <p><strong>Centro de Costo:</strong> {solicitud?.CodigoProyecto}</p>
                  <p><strong>Corresponsabilidad:</strong> {solicitud?.Codigo}</p>
                  <p><strong>Jefe de aprobación:</strong> {solicitud?.Nombres}</p>
                  <p><strong>Motivo de viático:</strong> {solicitud?.NombreMotivo}</p>
                  <p><strong>Fecha de Inicio:</strong> {ajustarFecha(solicitud?.FechaInicio)}</p>
                  <p><strong>Fecha Final:</strong> {ajustarFecha(solicitud?.FechaFin)}</p>
                </div>
                <div>
                  <p><strong>Monto Solicitado:</strong> S/.{solicitud?.MontoNetoInicial}</p>
                  <p><strong>Monto Aprobado:</strong> S/.{solicitud?.MontoNetoAprobado}</p>
                  {solicitud.ComentariosUsuario && (
                    <p><strong>Comentario:</strong> {solicitud?.ComentariosUsuario}</p>
                  )}
                  {solicitud.ComentarioJefeMonto && (
                    <p><strong>Comentario del Jefe:</strong> {solicitud?.ComentarioJefeMonto}</p>
                  )}
                  {solicitud && solicitud.EstadoId === 5 && (
                    <div className="flex items-center mt-2">
                      <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
                      <p>Abonado por contabilidad</p>  
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-100 rounded-md shadow-md mt-4">
              <h3 className="text-lg font-semibold mb-4">Formulario de Gastos</h3>
              <form onSubmit={handleAddBoleta}>
                <div className="grid grid-cols-2 gap-4 mb-4">
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
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Agregar Boleta
                  </button>
                  <button 
                    type="button" 
                    className="bg-red-500 text-white py-2 px-4 rounded" 
                    onClick={handleDelete}
                    disabled={selectedRegistroIndex === null}
                  >
                    Eliminar
                  </button>
                  <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded" onClick={handleReset}>
                    Limpiar
                  </button>
                </div>
              </form>
            </div>

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
                      onClick={() => setSelectedRegistroIndex(index)}
                      className={selectedRegistroIndex === index ? 'bg-gray-200' : ''}
                    >
                      <td className="py-2 px-4 border text-xs font-normal">{registro.item}</td>
                      <td className="py-2 px-2 border text-xs font-normal">{registro.fecha}</td>
                      <td className="py-2 px-4 border text-xs font-normal">{registro.tipoComprobante}</td>
                      <td className="py-2 px-4 border text-xs font-normal">{registro.nroComprobante}</td>
                      <td className="py-2 px-4 border text-xs font-normal">{registro.proveedor}</td>
                      <td className="py-2 px-4 border text-xs font-normal">{registro.detalle}</td>
                      <td className="py-2 px-4 border text-xs font-normal">{registro.importe}</td>
                      <td className="py-2 px-4 border text-xs font-normal">
                        {registro.adjunto && (
                          <a href={URL.createObjectURL(registro.adjunto)} target="_blank" rel="noopener noreferrer">
                            Ver Adjunto
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end gap-4 mt-4">
                <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded">
                  Rendir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RendirModal;
