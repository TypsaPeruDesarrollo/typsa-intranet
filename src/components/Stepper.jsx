import React from 'react';

export default function Stepper({ activeStep, setActiveStep }) {
  
  const steps = [
    { name: 'Solicitud en revisión', href: '#' },
    { name: 'Viáticos por rendir', href: '#' },
    { name: 'Rendiciones en revisión', href: '#' },
    { name: 'Viáticos cerrados', href: '#' }
  ];

  return (
    <div className="flex flex-col w-4/5 max-w-4xl justify-center items-center h-28 bg-gray-200 p-4 rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] mx-auto mt-5">
      <div className="w-full max-w-4xl">
        <h2 className="mb-4 text-gray-700 font-medium">Seleccionar etapa:</h2>
      </div>
      <div className="flex items-center justify-between w-full max-w-4xl">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            <button className="flex flex-col items-center cursor-pointer " onClick={() => setActiveStep(index)}>
                <span className={`flex items-center justify-center w-6 h-6 rounded-full lg:h-8 lg:w-8 shrink-0 transition-colors duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ${index <= activeStep ? 'bg-blueDark text-white' : 'bg-white border-2 border-gray-400 text-gray-500'}`}>
                </span>
                <p className={`text-xs text-center mt-1 transition-colors duration-300 ${index <= activeStep ? 'text-gray-600' : 'text-white'}`} >{step.name}</p>
            </button>
            {index < steps.length - 1 && (
              <div className="flex-grow border-2 h-3 transition-width duration-300 mb-4" style={{ background: activeStep > index ? '#175d85' : 'gray' }}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
