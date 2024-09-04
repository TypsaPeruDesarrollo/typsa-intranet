import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ajustarFecha } from "@/utils/dateUtils"

export default function ViaticosRechazadosJP() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const [viaticos, setViaticos] = useState([]);

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos/proyecto/${empleadoId}`);

      if (res.ok) {
        const data = await res.json();
        const filteredData = data.filter(viatico => viatico.EstadoId === 14);
        setViaticos(filteredData);
      } else {
        console.error("Error al obtener las solicitudes de viáticos");
      }
    } catch (error) {
      console.error("Error al obtener las solicitudes de viáticos", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-5 sm:left-10 lg:left-20 top-16 font-bold">Viáticos rechazados JP</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 w-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
          <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
            <tr className="text-center align-middle">
            {["Centro de Costo", "Motivo", "Usuario", "Fecha Incial", "Fecha Final", "Monto solicitado", "Comentario JP"].map(header => (
              <th key={header} className="px-4 py-3 border-2 border-gray-200">{header}</th>
            ))}
            </tr>
          </thead>
          <tbody>
            {viaticos.map(viatico => (
              <tr key={viatico.SolicitudId} className="bg-white hover:bg-gray-50 text-center align-middle">
                <td className="px-2 py-4 border-2">{viatico.CodigoProyecto}</td>
                <td className="px-2 py-4 border-2">{viatico.NombreMotivo}</td>
                <td className="px-4 py-4 border-2">{viatico.NombreCompletoColaborador}</td>
                <td className="px-4 py-4 border-2">{ajustarFecha(viatico.FechaInicio)}</td>
                <td className="px-4 py-4 border-2">{ajustarFecha(viatico.FechaFin)}</td>
                <td className="px-4 py-4 border-2">S/.{viatico.MontoNetoInicial}</td>
                <td className="px-4 py-4 border-2">{viatico.ComentarioJP}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
