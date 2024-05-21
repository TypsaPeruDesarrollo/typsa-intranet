import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { ajustarFecha } from "@/utils/dateUtils"

export default function ViaticosEnProcesos() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const [viaticos, setViaticos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (!loading && !session) {
      router.push("/");
    }
  }, [session, loading, router]);

  useEffect(() => {
    if (session) {
      fetchViaticos(session.user.empleadoId); 
    }
  }, [session]);

  const fetchViaticos = async (empleadoId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/solicitud-viaticos/jefe/${empleadoId}`);
      if (res.ok) {
        const data = await res.json();
        const filteredData = data.filter(viatico => viatico.EstadoId === 1);
        setViaticos(filteredData);
      } else {
        console.error("Error al obtener las solicitudes de viáticos");
      }
    } catch (error) {
      console.error("Error al obtener las solicitudes de viáticos", error);
    }
  };

  const handleEditClick = (index, currentValue) => {
    setEditIndex(index);
    setEditValue(currentValue);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSaveClick = async (solicitudId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/solicitud-viaticos/${solicitudId}/monto`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ montoNetoAprobado: editValue })
      });
      if (res.ok) {
        fetchViaticos(session.user.empleadoId);
      } else {
        console.error("Error al actualizar el monto aprobado de la solicitud de viáticos");
      }
    } catch (error) {
      console.error("Error al actualizar el monto aprobado de la solicitud de viáticos", error);
    }
    setEditIndex(null);
  };

  const handleEstadoChange = async (solicitudId, nuevoEstadoId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/solicitud-viaticos/${solicitudId}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nuevoEstadoId })
      });
      if (res.ok) {
        fetchViaticos(session.user.empleadoId);
      } else {
        console.error("Error al actualizar el estado de la solicitud de viáticos");
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la solicitud de viáticos", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-5 sm:left-10 lg:left-20 top-16 font-bold">Viáticos por aprobar</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-7xl w-full p-4 sm:p-6 lg:p-8 relative overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="bg-gray-200 border-b text-center">
              <th scope="col" className="px-3 py-3 border-2">Centro de Costo</th>
              <th scope="col" className="px-3 py-3 border-2">Motivo</th>
              <th scope="col" className="px-3 py-3 border-2">Usuario</th>
              <th scope="col" className="px-3 py-3 border-2">Fecha Inicial</th>
              <th scope="col" className="px-3 py-3 border-2">Fecha Final</th>
              <th scope="col" className="px-3 py-3 border-2">Monto solicitado</th>
              <th scope="col" className="px-3 py-3 border-2">Aprobar</th>
              <th scope="col" className="px-3 py-3 border-2">Rechazar</th>
            </tr>
          </thead>
          <tbody>
            {viaticos.map((viatico, index) => (
              <tr key={viatico.SolicitudId} className="bg-white border-b hover:bg-gray-100 text-center">
                <td className="px-2 py-4 border-2">{viatico.CodigoProyecto}</td>
                <td className="px-2 py-4 border-2">{viatico.NombreMotivo}</td>
                <td className="px-2 py-4 border-2">{viatico.Nombres}</td>
                <td className="px-2 py-4 border-2">{ajustarFecha(viatico.FechaInicio)}</td>
                <td className="px-2 py-4 border-2">{ajustarFecha(viatico.FechaFin)}</td>
                <td className="px-2 py-7 flex justify-around">
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={editValue}
                      onChange={handleEditChange}
                      className="border rounded-md px-2 py-1 w-16"
                    />
                  ) : (
                    <span>S/. {viatico.MontoNetoAprobado || viatico.MontoNetoInicial}</span>
                  )}
                  {editIndex === index ? (
                    <button className="text-green-500 hover:text-green-600 ml-2" onClick={() => handleSaveClick(viatico.SolicitudId)}>
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                  ) : (
                    <button className="text-gray-500 hover:text-yellow-600" onClick={() => handleEditClick(index, viatico.MontoNetoInicial)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  )}
                </td>
                <td className="px-2 py-4 border-2 text-center">
                  <button 
                    onClick={() => handleEstadoChange(viatico.SolicitudId, 2)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                    Aprobar
                  </button>
                </td>
                <td className="px-2 py-4 border-2 text-center">
                  <button 
                    onClick={() => handleEstadoChange(viatico.SolicitudId, 4)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
