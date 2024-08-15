import { IoIosCheckboxOutline } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { ajustarFecha } from "@/utils/dateUtils";

const HistorialContabilidadModal = ({ isOpen, onClose, solicitud }) => {
  if (!isOpen) return null;

  // Verifica que los detalles del presupuesto estén en la estructura correcta
  const detallesPresupuesto = solicitud?.DetallePresupuesto || [];

  const totalPresupuesto = detallesPresupuesto.reduce((total, detalle) => {
    return total + (detalle.PrecioUnitario * detalle.Personas * detalle.Cantidad);
    
  }, 0);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Historial de Viáticos</h2>
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
              {detallesPresupuesto.map((detalle, index) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-4 text-sm">{detalle.Resumen}</td>
                    <td className="py-2 px-4 text-sm text-center">S/.{detalle.PrecioUnitario}</td>
                    <td className="py-2 px-4 text-sm text-center">{detalle.Personas}</td>
                    <td className="py-2 px-4 text-sm text-center">{detalle.Cantidad}</td>
                    <td className="py-2 px-4 text-sm text-center">S/.{detalle.TotalPresupuestado}</td>
                  </tr>
                );
              })}
              <tr className="font-medium text-sm">
                <td className="py-2 px-4" colSpan={4}>Total Presupuesto</td>
                <td className="py-2 px-4 text-center">S/.{totalPresupuesto.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-y-5 mt-4">
          <div className="p-2 w-60 ml-5 bg-[#976666] text-white rounded-sm">
            <p>Código de Viático: <span>00{solicitud.SolicitudId}</span></p>
          </div>
          <ul className="list-none pl-4">
            <li className="m-2 mb-6">Centro de Costo: 
              <p className="text-gray-500">{solicitud.CodigoProyecto}</p>
            </li>
            <li className="m-2 mb-6">Motivo de viático: 
              <p className="text-gray-500">{solicitud.NombreMotivo}</p>
            </li>
            <li className="m-2 mb-6">Motivo de viático: 
              <p className="text-gray-500">{solicitud.NombreCompletoColaborador}</p>
            </li>
            <li className="m-2 mb-6">Jefe de aprobación: 
              <p className="text-gray-500">{solicitud.JefeAprobadorNombreCompleto}</p>
            </li>
            <li className="m-2 mb-6">Fecha Inicial:
              <p className="text-gray-500 flex"> <CiCalendarDate className="w-6 h-6"/> {ajustarFecha(solicitud.FechaInicio)}</p>
            </li>
            <li className="m-2 mb-6">Fecha Final: 
              <p className="text-gray-500 flex"><CiCalendarDate className="w-6 h-6"/>{ajustarFecha(solicitud.FechaFin)}</p>
            </li>
            <li className="m-2 mb-6">Monto Solicitado: 
              <p className="text-gray-500">S/.{solicitud.MontoNetoInicial}</p>
            </li>
            
          </ul>

          {solicitud.EstadoId === 5 && (
            <div className="flex">
              <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
              <p>Abonado por contabilidad</p>  
            </div>
          )}

          {solicitud.EstadoId === 7 && (
            <div>
              <div className="flex">
              <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
              <p>Abonado por contabilidad</p>  
              </div>
              <div className="flex">
                <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
                <p>Rendición conforme por contabilidad</p>  
              </div>
            </div>
          )}

          {solicitud.EstadoId === 10 && (
            <div>
              <div className="flex">
                <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
                <p>Abonado por contabilidad</p>  
                </div>
                <div className="flex">
                  <IoIosCheckboxOutline className="w-6 h-6 text-green-600 mr-2"/>
                  <p>Rendición conforme por contabilidad</p>  
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorialContabilidadModal;
