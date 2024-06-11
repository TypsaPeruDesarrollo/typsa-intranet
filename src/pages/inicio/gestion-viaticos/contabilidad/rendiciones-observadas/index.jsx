import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import axios from "axios";
import { ajustarFecha } from "@/utils/dateUtils";

export default function RegistrosObservadas () {

  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/");
    }
    
  }, [session, loading, router]);
  

  const fetchSolicitudes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/solicitud-viaticos');
      const filteredData = response.data
        .filter(solicitud => solicitud.EstadoId === 9)
        .map(solicitud => ({ ...solicitud, checked: false }));
      setSolicitudes(filteredData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);


  return (
    <div className="min-h-screen">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-20 top-16 font-bold">Rendiciones observadas</h1>
          </div>
        </div>
      </div>

        <div className="mx-auto mt-4 max-w-7xl w-full p-2 relative overflow-x-auto sm:rounded-lg">
          <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
            <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
              <tr className="text-center align-middle">
              {["Centro de Costo", "Corresponsabilidad", "Motivo", "usuario", "Fecha Incial", "Fecha Final", "Monto aprobado", "Monto utilizado", "Comentario"].map(header => (
                <th key={header} className="px-4 py-3 border-b border-gray-200">{header}</th>
              ))}
              </tr>
            </thead>
            <tbody>
              {solicitudes.map(solicitud => (
                <tr key={solicitud.SolicitudId} className="text-center align-middle">
                  <td className="px-2 py-4 border-2">{solicitud.CodigoProyecto}</td>
                  <td className="px-2 py-4 border-2">{solicitud.CodigoAreatecnica}</td>
                  <td className="px-2 py-4 border-2">{solicitud.NombreMotivo}</td>
                  <td className="px-2 py-4 border-2">{solicitud.Nombres}</td>
                  <td className="px-2 py-4 border-2">{ajustarFecha(solicitud.FechaInicio)}</td>
                  <td className="px-2 py-4 border-2">{ajustarFecha(solicitud.FechaFin)}</td>
                  <td className="px-2 py-4 border-2">S/.{solicitud.MontoNetoAprobado}</td>
                  <td className="px-2 py-4 border-2">S/.{solicitud.MontoTotalGastado}</td>
                  <td className="px-2 py-4 border-2">{solicitud.ComentariosContabilidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && (
        <div className="mt-4 text-center text-red-600">
          Error al obtener las solicitudes: {error}
        </div>
        )}
      </div>
  );
}