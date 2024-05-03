import React, { useState } from 'react';
import Select from 'react-select'
import SelectDataPicker  from '@/components/SelectDatePicker';

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
            <h1 className="absolute text-white text-4xl z-50 left-20 top-16">Solicitar Viaticos</h1>
          </div>
        </div>
      </div>
      <div className="my-10 mx-20">
        <div className="border-2 w-32 p-2 bg-customColor text-white">codigo: <span>X023</span></div>
        <form action="" className='mt-10 lg:mx-72 mx-0'>
          <div >
            <label>Centro de Costo</label>
            <Select className='z-30' options={options} isClearable={isClearable}/>
          </div>
          <div className='mt-5'>
            <label>Motivo de viático</label>
            <Select className='z-40' options={options} isClearable={isClearable}/>
          </div>
          <div className='mt-5'>
            <label>Jefe de aprobación</label>
            <Select className='z-20' options={options} isClearable={isClearable}/>
          </div>
          <div className='flex flex-row justify-start gap-10'>
            <div className='mt-5 w-52'>
              <p>Fecha de partida</p>
              <SelectDataPicker />
            </div>
            <div className='mt-5 w-52'>
              <p>Fecha de retorno</p>
              <SelectDataPicker />
            </div>
          </div>
          <div className='mt-5 flex flex-col'>
            <label>Monto solicitado</label>
            <input type="number" placeholder="S/." className="input-text form-input w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
          </div>
          <div className='mt-10 p-4 border-2 border-red-500 text-red-500'>
            <p>Declaración Jurada:</p>
            <p>
              Al solicitar el viatico, estamos declarando que contamos con la aprobación de ingreso, por escrito, por parte del Cliente.
            </p>
          </div>
          <button className='mt-5 border-2 px-4 py-2 rounded-md bg-slate-200'>Solicitar</button>
        </form>
        
      </div>
    </div>
  )
}