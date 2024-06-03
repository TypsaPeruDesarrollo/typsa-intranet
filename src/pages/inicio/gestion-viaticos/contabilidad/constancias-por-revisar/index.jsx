import { useState } from "react";
import RendicionConstanciasModal from "../../../../../components/RevisionConstanciasModal";

export default function ConstanciasEnRevision() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-5 sm:left-10 lg:left-20 top-16 font-bold">Revisión de constancias</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 w-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-sm w-full text-left border-2 rtl:text-right text-gray-500">
          <thead className="text-xs border-2 text-gray-700 bg-gray-50 text-wrap text-center">
            <tr className="text-center align-middle">
            {["Centro de Costo", "Motivo", "Usuario", "Fecha Incial", "Fecha Final","Monto aprobado", "Monto utilizado", "Datos adjuntos"].map(header => (
              <th key={header} className="px-4 py-3 border-2 border-gray-200">{header}</th>
            ))}
            </tr>
          </thead>
          <tbody>
            <tr  className="bg-white hover:bg-gray-50 text-center align-middle">
              <td className="px-2 py-4 border-2">HY6890</td>
              <td className="px-4 py-4 border-2">Comida</td>
              <td className="px-4 py-4 border-2">William Cipriani</td>
              <td className="px-4 py-4 border-2">23/05/2024</td>
              <td className="px-4 py-4 border-2">23/05/2024</td>
              <td className="px-4 py-4 border-2">S/.50</td>
              <td className="px-4 py-4 border-2">S/.30</td>
              <td className="px-2 py-4 border-2 text-center">
                <button 
                  className="text-[#615a5a] font-semibold py-1 rounded-md underline"
                  onClick={openModal}
                >
                  Visualizar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isModalOpen && <RendicionConstanciasModal onClose={closeModal} />}
    </div>
  );
}
