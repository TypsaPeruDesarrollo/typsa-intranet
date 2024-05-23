import { useEffect, useState, useCallback } from 'react';
import Checkbox from "../../../../../components/Checkbox";
import {ajustarFecha } from "@/utils/dateUtils"

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${data.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

const actualizarSolicitudesAbonadas = async (solicitudIds) => {
  try {
    const response = await fetch('http://localhost:3001/api/solicitud-viaticos/abonado', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ solicitudIds }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${data.message}`);
    }
    return data;
  } catch (error) {
    console.error('Error al actualizar las solicitudes abonadas:', error);
    throw error;
  }
};

export default function RegistrosPagados () {
  
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);

  const handleCheckboxChange = (id) => {
    setSolicitudes(prevSolicitudes =>
      prevSolicitudes.map(solicitud =>
        solicitud.SolicitudId === id
          ? { ...solicitud, checked: !solicitud.checked }
          : solicitud
      )
    );
  };

  const fetchSolicitudes = useCallback(async () => {
    try {
      const data = await fetchData('http://localhost:3001/api/solicitud-viaticos');
      const filteredData = data.filter(solicitud => solicitud.EstadoId === 2)
      .map(solicitud => ({ ...solicitud, checked: false }));
      setSolicitudes(filteredData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  const handleAbonadoClick = async () => {
    const abonadoSolicitudes = solicitudes.filter(solicitud => solicitud.checked).map(solicitud => solicitud.SolicitudId);
    try {
      await actualizarSolicitudesAbonadas(abonadoSolicitudes);
      // Actualizar el estado para reflejar los cambios
      fetchSolicitudes();
    } catch (error) {
      setError(error.message);
    }
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-20 top-16">Registro de pagos</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-7xl w-full p-2 relative overflow-x-auto sm:rounded-lg">
        
        <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
          <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
            <tr className="text-center align-middle">
            {["Centro de Costo", "Motivo", "Jefe de aprobación", "Fecha Incial", "Fecha Final", "Monto aprobado", "Abonado"].map(header => (
              <th key={header} className="px-4 py-3 border-b border-gray-200">{header}</th>
            ))}
            </tr>
          </thead>
          <tbody>
          {solicitudes.map(solicitud => (
              <tr key={solicitud.SolicitudId} className="text-center align-middle">
                <td className="px-2 py-4 border-2">{solicitud.CodigoProyecto}</td>
                <td className="px-2 py-4 border-2">{solicitud.NombreMotivo}</td>
                <td className="px-2 py-4 border-2">{solicitud.Nombres}</td>
                <td className="px-2 py-4 border-2">{ajustarFecha(solicitud.FechaInicio)}</td>
                <td className="px-2 py-4 border-2">{ajustarFecha(solicitud.FechaFin)}</td>
                <td className="px-2 py-4 border-2">S/.<span>{solicitud.MontoNetoAprobado}</span></td>
                <td className="px-2 py-4 border-2">
                  <Checkbox
                    checked={solicitud.checked}
                    onChange={() => handleCheckboxChange(solicitud.SolicitudId)}
                  />  
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button 
            onClick={handleAbonadoClick} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Abonado
          </button>
        </div>
      </div>
      
    </div>
  );
}