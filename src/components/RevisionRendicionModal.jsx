import { BsFiletypePdf } from "react-icons/bs";

const RendicionRevisionModal = ({ onClose, solicitud }) => {
  if (!solicitud) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-6xl max-h-[90vh] bg-white p-5 rounded-lg shadow-lg relative overflow-auto">
        <div className="flex justify-end">
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
        <div className="w-11/12 mx-auto flex justify-between gap-x-10">
          <div className="w-128 border-2">
            <h3 className="m-4 text-[#664242] font-semibold">Rendición con sustento</h3>
            <div className="flex justify-around m-2">
              <div>
                <p>Monto utilizado</p>
                <span>S/.{solicitud.MontoGastadoDeclaradoJustificado}</span>
              </div>
              <div>
                <p>Dato adjunto</p>
                <a href={solicitud.DocumentoAdjuntoJustificado} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  PDFAdjunto.pdf
                </a>
              </div>
            </div>
          </div>
          <div className="w-128 border-2">
            <h3 className="m-4 text-[#664242] font-semibold">Rendición sin sustento</h3>
            <div className="flex justify-around m-2">
              <div>
                <p>Monto utilizado</p>
                <span>S/.{solicitud.MontoGastadoDeclaradoInjustificado}</span>
              </div>
              <div>
                <p>Declaración jurada</p>
                <a href={solicitud.DocumentoAdjuntoInjustificado} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  PDFAdjunto.pdf
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-11/12 h-96 border-2 mx-auto mt-4 flex flex-col justify-center text-center items-center">
          <div><BsFiletypePdf className="w-16 h-16 p-1 text-gray-500"/></div>
          <div className="font-extrabold text-gray-500 text-2xl p-1">.pdf</div>
        </div>
        <div className="flex justify-end gap-x-8 mr-12 mt-4">
          <button className="px-5 py-1 bg-[#d8f9b7] font-medium text-gray-700 rounded-md"> Aprobar </button>
          <button className="border-2 px-5 py-1 font-medium text-gray-700 rounded-md"> Observar </button>
        </div>
      </div>
    </div>
  );
};

export default RendicionRevisionModal;
