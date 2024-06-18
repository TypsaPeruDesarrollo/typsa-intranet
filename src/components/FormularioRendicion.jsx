import React from 'react';

const FormularioRendicion = ({

    montoGastadoDeclaradoJustificado,
    setMontoGastadoDeclaradoJustificado,
    montoGastadoDeclaradoInjustificado,
    setMontoGastadoDeclaradoInjustificado,
    documentoJustificado,
    setDocumentoJustificado,
    documentoInjustificado,
    setDocumentoInjustificado,
    handleSubmit
  }) => {
    
  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-row md:flex-col md:justify-center md:items-center items-start justify-start gap-x-4 gap-y-4 bg-gray-200 p-4 rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
      <div className='flex gap-x-10'>
        <div>
          <label>Monto utilizado (Justificado)</label>
          <input 
            type="number" 
            value={montoGastadoDeclaradoJustificado}
            onChange={(e) => setMontoGastadoDeclaradoJustificado(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 w-full" placeholder="S/." required />
          {documentoJustificado && <p className="text-sm text-gray-500 mt-1">Archivo seleccionado: {documentoJustificado.name}</p>}
        </div>
        <div>
          <label>Adjuntar documento (Justificado)</label>
          <input
            onChange={(e) => setDocumentoJustificado(e.target.files[0])}
            className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-1 w-full" aria-describedby="file_input_help" id="file_input" type="file"></input>
        </div>
      </div>
      <div className='flex gap-x-10'>
        <div>
          <label>Monto utilizado (Injustificado)</label>
          <input 
            type="number" 
            value={montoGastadoDeclaradoInjustificado}
            onChange={(e) => setMontoGastadoDeclaradoInjustificado(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 w-full" placeholder="S/." required />
          {documentoInjustificado && <p className="text-sm text-gray-500 mt-1">Archivo seleccionado: {documentoInjustificado.name}</p>}
        </div>
        <div>
          <label>Declaración jurada (Injustificado)</label>
          <input
            onChange={(e) => setDocumentoInjustificado(e.target.files[0])}
            className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-1 w-full " aria-describedby="file_input_help" id="file_input" type="file"></input>
        </div>
      </div>
      <div >
        <button className="bg-gray-400 shadow-lg w-28 md:w-24 h-8 rounded-md mt-3">Rendir</button>
      </div>
    </form>
  );
};

export default FormularioRendicion;
