import React, { useState } from 'react';
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default function GestionViaticos () {
  const [isClearable] = useState(true);
  return (
    <div className="min-h-screen">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-20 top-16">Rendir Viáticos</h1>
          </div>
        </div>
      </div>
      <div className="my-10 mx-20">
        <form action="#" className='mt-10 lg:mx-72 mx-0'>
          <div >
            <label>Codigo de Viatico</label>
            <Select className='z-30' options={options} isClearable={isClearable}/>
          </div>
          <div  className='mt-5 flex flex-col'>
            <label>Centro de costo</label>
            <input type='text' placeholder="HY1999" className="input-text form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
          </div>
          <div  className='mt-5 flex flex-col'>
            <label>Motivo de viático</label>
            <input type='text' placeholder="Viaje" className="input-text form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
          </div>
          <div  className='mt-5 flex flex-col'>
            <label>Jefe de aprobación</label>
            <input type='text' placeholder="Jhonny Florian" className="input-text form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
          </div>
          <div className='flex flex-row justify-start gap-10'>
            <div  className='flex flex-col mt-5 w-1/2'>
              <label>Fecha de partida</label>
              <input type='text' placeholder="05/04/2024" className="input-text form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
            </div>
            <div  className='flex flex-col mt-5 w-1/2'>
              <label>Fecha de retorno</label>
              <input type='text' placeholder="10/05/2024" className="input-text form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
            </div>
          </div>
          <div  className='mt-5 flex flex-col'>
            <label>Monto</label>
            <input type='text' placeholder="S/.500" className="input-text form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
          </div>
          <div className='mt-5'>
            <label className="block mb-2 text-sm font-medium text-gray-900">Upload file</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none " aria-describedby="file_input_help" id="file_input" type="file" />
            <p className="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG (MAX. 800x400px).</p>
          </div>
        </form>
      </div>
    
    </div>
  )
}