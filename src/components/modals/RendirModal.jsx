import React, { useState, useEffect } from 'react';
import { ajustarFecha } from "@/utils/dateUtils";
import FormularioIngresoBoletas from '../FormularioIngresoBoletas';
import TablaRegistrosGuardados from '../TablaRegistrosGuardados';
import axios from 'axios';

const RendirModal = ({ isOpen, onClose, solicitud }) => {
  const [registros, setRegistros] = useState([]);
  const [selectedRegistroIndex, setSelectedRegistroIndex] = useState(null);
  const [registroEditable, setRegistroEditable] = useState(null); // Estado para almacenar el registro que se va a editar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/rendicion-viaticos/${solicitud.SolicitudId}`);
        console.log("Datos de la API: ", response.data);
        setRegistros(response.data || []); // Cargar los registros anteriores
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };
  
    if (solicitud && solicitud.EstadoId === 9) {
      fetchData();
    }
  }, [solicitud]);  

  if (!isOpen) return null;

  const handleRegistroChange = (e, index, field) => {
    const newRegistros = [...registros];
    newRegistros[index][field] = e.target.value;
    setRegistros(newRegistros);
  };

  const handleRegistroClick = (index) => {
    setSelectedRegistroIndex(index);
    setRegistroEditable(registros[index]); // Pasar el registro seleccionado al formulario para editarlo
  };

  const handleUpdateRegistro = (updatedRegistro) => {
    const newRegistros = [...registros];
    newRegistros[selectedRegistroIndex] = updatedRegistro;
    setRegistros(newRegistros);
    setRegistroEditable(null); // Limpiar el formulario después de la edición
  };

  const handleSubmitCorrections = async () => {
    const formData = new FormData();
    formData.append('solicitudId', solicitud.SolicitudId);
    formData.append('boletas', JSON.stringify(registros));

    registros.forEach((registro) => {
      if (registro.Adjunto) {
        formData.append(`adjunto`, registro.Adjunto); // Adjunta el archivo al FormData
      }
    });
    

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/corregir-rendicion`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Corrección guardada con éxito', response.data);
      onClose(); // Cierra el modal o interfaz de corrección
    } catch (error) {
      console.error('Error al corregir', error);
    } 
  };

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

        {solicitud.EstadoId === 9 && (
          <div className="flex flex-col gap-y-5 mt-4">
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
                </div>
              </div>
            </div>

            {/* Mostrar FormularioIngresoBoletas con los datos del registro seleccionados para editar */}
            <FormularioIngresoBoletas
              registros={registros}
              setRegistros={setRegistros}
              registroEditable={registroEditable} // Pasar el registro editable al formulario
              onUpdateRegistro={handleUpdateRegistro} // Método para actualizar el registro
            />

            <TablaRegistrosGuardados 
              registros={registros} 
              handleRegistroChange={handleRegistroChange} 
              handleRegistroClick={handleRegistroClick} // Pasar la función para manejar el clic en un registro
              setSelectedRegistroIndex={setSelectedRegistroIndex} 
              selectedRegistroIndex={selectedRegistroIndex}
            />

            <div className="flex justify-end gap-4 mt-4">
              <button onClick={handleSubmitCorrections} className="bg-green-500 text-white py-2 px-4 rounded">
                Enviar Correcciones
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RendirModal;
