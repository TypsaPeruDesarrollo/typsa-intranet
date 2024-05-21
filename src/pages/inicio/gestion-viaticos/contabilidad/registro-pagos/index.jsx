import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import Checkbox from "../../../../../components/Checkbox";

export default function RegistrosPagados () {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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
            {["Centro de Costo", "Motivo", "Jefe de aprobación", "Fecha Incial", "Fecha Final", "Monto aprobado", "Abonado", "Fecha de abono"].map(header => (
              <th key={header} className="px-4 py-3 border-b border-gray-200">{header}</th>
            ))}
            </tr>
          </thead>
          <tbody>
              <tr className="text-center align-middle">
                <td className="px-2 py-4 border-2">HY333</td>
                <td className="px-2 py-4 border-2">Visita a campo</td>
                <td className="px-2 py-4 border-2">Maria Jose</td>
                <td className="px-2 py-4 border-2">18/04/2024</td>
                <td className="px-2 py-4 border-2">18/04/2024</td>
                <td className="px-2 py-4 border-2">S/. <span>200</span></td>
                <td className="px-2 py-4 border-2">
                  <Checkbox checked={isChecked} onChange={handleCheckboxChange} />  
                </td>
                <td className="px-2 py-7 border-1 flex justify-around">17/05/2024<span><CiCalendar className="w-4 h-4"/></span></td>
              </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  );
}