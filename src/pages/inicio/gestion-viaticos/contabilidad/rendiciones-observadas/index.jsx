
export default function RegistrosObservadas () {

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
              {["Centro de Costo", "Motivo", "usuario", "Fecha Incial", "Fecha Final", "Monto aprobado", "Monto utilizado", "Abonado por contabilidad", "Revisión por contabilidad","Saldo por depositar", "Revision de saldo por contabilidad"].map(header => (
                <th key={header} className="px-4 py-3 border-b border-gray-200">{header}</th>
              ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-center align-middle">
                <td className="px-2 py-4 border-2">HY6890</td>
                <td className="px-2 py-4 border-2">Motivo</td>
                <td className="px-2 py-4 border-2">William Cipriani</td>
                <td className="px-2 py-4 border-2">18/04/2024</td>
                <td className="px-2 py-4 border-2">18/04/2024</td>
                <td className="px-2 py-4 border-2">S/.<span>200</span></td>
                <td className="px-2 py-4 border-2">S/.<span>150</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  );
}