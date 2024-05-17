import React from 'react';

export default function Stepper({ activeStep, setActiveStep }) {
  
  const steps = [
    { name: 'Solicitud en revisión', href: '#' },
    { name: 'Viáticos por rendir', href: '#' },
    { name: 'Rendiciones en revisión', href: '#' },
    { name: 'Viáticos cerrados', href: '#' }
  ];

  return (
    <div className="flex justify-center items-center h-36">
      <div className="flex items-center justify-between w-4/5 max-w-4xl p-4 bg-gray-200 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-xl">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            <button className="flex flex-col items-center cursor-pointer " onClick={() => setActiveStep(index)}>
                <span className={`flex items-center justify-center w-6 h-6 rounded-full lg:h-8 lg:w-8 shrink-0 transition-colors duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ${index <= activeStep ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-400 text-gray-500'}`}>
                </span>
                <p className={`text-xs text-center mt-1 transition-colors duration-300 ${index <= activeStep ? 'text-gray-600' : 'text-white'}`} >{step.name}</p>
            </button>
            {index < steps.length - 1 && (
              <div className="flex-grow border-2 h-3 transition-width duration-300 mb-4" style={{ background: activeStep > index ? 'green' : 'gray' }}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
