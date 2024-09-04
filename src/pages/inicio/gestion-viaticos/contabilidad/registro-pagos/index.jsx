import { useEffect, useState, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Checkbox from "../../../../../components/Checkbox";
import { ajustarFecha } from "@/utils/dateUtils";
import RegistrosPagadosModal from '../../../../../components/modals/RegistroPagosModal';

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

const actualizarSolicitudesAbonadas = async (solicitudesAbonadas) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos/abonado`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ solicitudesAbonadas }),
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

export default function RegistrosPagados() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchCentroCosto, setSearchCentroCosto] = useState('');
  const [searchCorresponsabilidad, setSearchCorresponsabilidad] = useState('');

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/");
    }
  }, [session, loading, router]);
  
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  const handleCheckboxChange = (id) => {
    setSolicitudes(prevSolicitudes =>
      prevSolicitudes.map(solicitud =>
        solicitud.SolicitudId === id
          ? { ...solicitud, checked: !solicitud.checked }
          : solicitud
      )
    );
  };

  const handleFechaPagoChange = (id, fechaPago) => {
    setSolicitudes(prevSolicitudes =>
      prevSolicitudes.map(solicitud =>
        solicitud.SolicitudId === id
          ? { ...solicitud, fechaPago }
          : solicitud
      )
    );
  };

  const handleRowClick = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsModalOpen(true);
  };

  const fetchSolicitudes = useCallback(async () => {
    try {
      const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos-presupuesto`);
      const filteredData = data.filter(solicitud => solicitud.EstadoId === 2)
        .map(solicitud => ({ ...solicitud, checked: false, fechaPago: '' }));
      setSolicitudes(filteredData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  const handleAbonadoClick = async () => {
    const solicitudesAbonadas = solicitudes.filter(solicitud => solicitud.checked).map(solicitud => ({
      SolicitudId: solicitud.SolicitudId,
      fechaPago: solicitud.fechaPago,
    }));

    // Verifica que todas las solicitudes seleccionadas tengan una fecha de pago
    const faltanFechas = solicitudesAbonadas.some(solicitud => !solicitud.fechaPago);

    if (faltanFechas) {
      setError('Debe proporcionar una fecha de pago para todas las solicitudes seleccionadas.');
      return;
    }

    try {
      await actualizarSolicitudesAbonadas(solicitudesAbonadas);
      // Actualizar el estado para reflejar los cambios
      fetchSolicitudes();
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredSolicitudes = solicitudes.filter(solicitud =>
    (solicitud.NombreCompletoColaborador && solicitud.NombreCompletoColaborador.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (solicitud.CodigoProyecto && solicitud.CodigoProyecto.toLowerCase().includes(searchCentroCosto.toLowerCase())) &&
    (solicitud.CodigoAreatecnica && solicitud.CodigoAreatecnica.toLowerCase().includes(searchCorresponsabilidad.toLowerCase()))
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-20 top-16 font-bold">Registro de pagos</h1>
          </div>
        </div>
      </div>
      

      <div className="mx-auto mt-4 max-w-7xl w-full p-2 relative overflow-x-auto sm:rounded-lg">
      <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-1/3"
          />
          <input
            type="text"
            placeholder="Buscar por Centro de Costo..."
            value={searchCentroCosto}
            onChange={(e) => setSearchCentroCosto(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-1/3"
          />
          <input
            type="text"
            placeholder="Buscar por Corresponsabilidad..."
            value={searchCorresponsabilidad}
            onChange={(e) => setSearchCorresponsabilidad(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-1/3"
          />
        </div>
        <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
          <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
            <tr className="text-center align-middle">
              {["Centro de Costo", "Corresponsabilidad", "Motivo", "Usuario", "Fecha Incial", "Fecha Final", "Monto aprobado", "Abonado", "Fecha de abono"].map(header => (
                <th key={header} className="px-4 py-3 border-b border-gray-200">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSolicitudes.map(solicitud => (
              <tr key={solicitud.SolicitudId} className="text-center align-middle">
                <td className="px-2 py-4 border-2 cursor-pointer" onClick={() => handleRowClick(solicitud)}>{solicitud.CodigoProyecto}</td>
                <td className="px-2 py-4 border-2 cursor-pointer" onClick={() => handleRowClick(solicitud)}>{solicitud.CodigoAreatecnica}</td>
                <td className="px-2 py-4 border-2 cursor-pointer" onClick={() => handleRowClick(solicitud)}>{solicitud.NombreMotivo}</td>
                <td className="px-2 py-4 border-2 cursor-pointer" onClick={() => handleRowClick(solicitud)}>{solicitud.NombreEmpleado}</td>
                <td className="px-2 py-4 border-2 cursor-pointer" onClick={() => handleRowClick(solicitud)}>{ajustarFecha(solicitud.FechaInicio)}</td>
                <td className="px-2 py-4 border-2 cursor-pointer" onClick={() => handleRowClick(solicitud)}>{ajustarFecha(solicitud.FechaFin)}</td>
                <td className="px-2 py-4 border-2 cursor-pointer" onClick={() => handleRowClick(solicitud)}>S/.<span>{solicitud.MontoNetoAprobado}</span></td>
                <td className="px-2 py-4 border-2">
                  <Checkbox
                    checked={solicitud.checked}
                    onChange={() => handleCheckboxChange(solicitud.SolicitudId)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="px-2 py-4 border-2">
                  <input
                    type="date"
                    value={solicitud.fechaPago}
                    onChange={(e) => handleFechaPagoChange(solicitud.SolicitudId, e.target.value)}
                    className="border rounded p-2"
                    onClick={(e) => e.stopPropagation()}
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

      {selectedSolicitud && (
        <RegistrosPagadosModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          solicitud={selectedSolicitud}
        />
      )}
    </div>
  );
}
