import { CiCalendarDate } from "react-icons/ci";
import { ajustarFecha } from "@/utils/dateUtils";

const SolicitudEnviadaModal = ({ isOpen, onClose, solicitud }) => {
  if (!isOpen) return null;

  // Asegurarse de que solicitud.detallesPresupuesto sea un array
  const detallesPresupuesto = solicitud?.detallesPresupuesto || [];

  // Calcular el total del presupuesto
  const totalPresupuesto = detallesPresupuesto.reduce((total, detalle) => {
    return total + (detalle.PrecioUnitario * detalle.Personas * detalle.Cantidad);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Solicitud de Viático</h2>
          <button className="text-black w-10 h-10" onClick={onClose}>
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-y-5 mt-4">
          <div className="p-2 w-60 ml-5 bg-[#976666] text-white rounded-sm">
            <p>Codigo de Viático: <span>{solicitud.CodigoSolicitud.substring(0, 8)}</span></p>
          </div>
          <ul className="list-none pl-4">
            <li className="m-2 mb-6">Centro de Costo: 
              <p className="text-gray-500">{solicitud.CodigoProyecto}</p>
            </li>
            <li className="m-2 mb-6">Corresponsabilidad: 
              <p className="text-gray-500">{solicitud.Codigo}</p>
            </li>
            <li className="m-2 mb-6">Motivo de viático: 
              <p className="text-gray-500">{solicitud.NombreMotivo}</p>
            </li>
            <li className="m-2 mb-6">Jefe de aprobación: 
              <p className="text-gray-500">{solicitud.Nombres}</p>
            </li>
            <li className="m-2 mb-6">Fecha Inicial:
              <p className="text-gray-500 flex"> <CiCalendarDate className="w-6 h-6"/> {ajustarFecha(solicitud.FechaInicio)}</p>
            </li>
            <li className="m-2 mb-6">Fecha Final: 
              <p className="text-gray-500 flex"><CiCalendarDate className="w-6 h-6"/>{ajustarFecha(solicitud.FechaFin)}</p>
            </li>
            <li className="m-2 mb-6">Monto Solicitado: 
              <p className=" text-gray-500">S/.{solicitud.MontoNetoInicial}</p>
            </li>
          </ul>
        </div>
        <div className="px-5">
          <h3 className="text-lg font-medium">Detalles del Presupuesto</h3>
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Resumen</th>
                <th className="py-2 px-4 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Precio Unitario</th>
                <th className="py-2 px-4 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Personas</th>
                <th className="py-2 px-4 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Cantidad días</th>
                <th className="py-2 px-4 text-xs font-medium text-gray-500 text-center uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {detallesPresupuesto.map((detalle, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-sm">{detalle.Resumen}</td>
                  <td className="py-2 px-4 text-sm text-center">S/.{detalle.PrecioUnitario.toFixed(2)}</td>
                  <td className="py-2 px-4 text-sm text-center">{detalle.Personas}</td>
                  <td className="py-2 px-4 text-sm text-center">{detalle.Cantidad}</td>
                  <td className="py-2 px-4 text-sm text-center">S/.{(detalle.PrecioUnitario * detalle.Personas * detalle.Cantidad).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-medium text-sm ">
                <td className="py-2 px-4" colSpan={4}>Total Presupuesto</td>
                <td className="py-2 px-4 text-center">S/.{totalPresupuesto.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SolicitudEnviadaModal;
