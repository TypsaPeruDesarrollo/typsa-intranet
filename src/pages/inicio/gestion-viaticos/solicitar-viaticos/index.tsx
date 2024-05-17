import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from 'axios';
import Select from 'react-select'
import SelectDataPicker  from '@/components/SelectDatePicker';

interface SelectOption {
  value: string;
  label: string;
}

export default function GestionViaticos () {
  const { data: session } = useSession();
  const empleadoId = session?.user?.empleadoId;
  const router = useRouter();
  const [isClearable] = useState(true);
  const [codigo, setCodigo] = useState("");
  const [centroCostos, setCentroCostos] = useState([]);
  const [motivosViatico, setMotivosViatico] = useState([]);
  const [jefesAprobacion, setJefesAprobacion] = useState([]);
  const [selectedCentroCosto, setSelectedCentroCosto] = useState<SelectOption | null>(null);
  const [selectedMotivoViatico, setSelectedMotivoViatico] = useState<SelectOption | null>(null);
  const [selectedJefeAprobacion, setSelectedJefeAprobacion] = useState<SelectOption | null>(null);
  const [montoSolicitado, setMontoSolicitado] = useState('');
  const [fechaPartida, setFechaPartida] = useState<Date | null>(null);
  const [fechaRetorno, setFechaRetorno] = useState<Date | null>(null);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
    
  }, [session, router]);

  useEffect(() => {
    const nuevoCodigo = Math.floor(Math.random() * 90000) + 10000;
    setCodigo(nuevoCodigo.toString());
  
    const fetchData = async () => {
      try {
        const [centroCostosRes, motivosRes, jefesRes] = await Promise.all([
          axios.get('http://localhost:3001/api/centrocosto'),
          axios.get('http://localhost:3001/api/motivoviaticos'),
          axios.get('http://localhost:3001/api/jefe-aprobacion')
        ]);
        setCentroCostos(centroCostosRes.data.map((cc: { ProyectoId: number; CodigoProyecto: string; NombreProyecto: string; }) => ({ value: cc.ProyectoId, label: `${cc.CodigoProyecto} - ${cc.NombreProyecto}` })));
        setMotivosViatico(motivosRes.data.map((mv: { MotivoId: number; NombreMotivo: string; }) => ({ value: mv.MotivoId, label: mv.NombreMotivo })));
        setJefesAprobacion(jefesRes.data.map((ja: { EmpleadoId: number; Nombres: string; Apellidos: string; }) => ({ value: ja.EmpleadoId, label: `${ja.Nombres} ${ja.Apellidos}` })));
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleCentroCostoChange = (selectedOption: SelectOption | null) => {
    setSelectedCentroCosto(selectedOption);
  };
  
  const handleMotivoViaticoChange = (selectedOption: SelectOption | null) => {
    setSelectedMotivoViatico(selectedOption);
  };
  
  const handleJefeAprobacionChange = (selectedOption: SelectOption | null) => {
    setSelectedJefeAprobacion(selectedOption);
  };

  const handleMontoSolicitadoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMontoSolicitado(event.target.value);
  };

  const handleFechaPartidaChange = (date: Date | null) => {
    setFechaPartida(date);
  };
  
  const handleFechaRetornoChange = (date: Date | null) => {
    setFechaRetorno(date);
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  try {
    const solicitudData = {
      EmpleadoId: empleadoId, 
      MotivoViaticoId: selectedMotivoViatico?.value,
      MontoNetoInicial: montoSolicitado,
      CentroCostosId: selectedCentroCosto?.value,
      JefeAprobadorId: selectedJefeAprobacion?.value,
      FechaInicio: fechaPartida,
      FechaFin: fechaRetorno
    };

    const response = await axios.post('http://localhost:3001/api/solicitud-viaticos', solicitudData);
    if (response.status === 201) {
      alert('Solicitud creada con éxito');
    }
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
    alert('Error al crear la solicitud');
  }
  };

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
        <div className="border-2 w-32 p-2 bg-customColor text-white">código: <span>{codigo}</span></div>
        <form onSubmit={handleSubmit} className='mt-10 lg:mx-72 mx-0'>
          <div>
            <label>Centro de Costo</label>
            <Select
              className='z-40'
              options={centroCostos}
              isClearable={isClearable}
              instanceId="centro-de-costo-select"
              onChange={handleCentroCostoChange}
              value={selectedCentroCosto}
            />
          </div>
          <div className='mt-5'>
            <label>Motivo de viático</label>
            <Select
              className='z-30'
              options={motivosViatico}
              isClearable={isClearable}
              instanceId="motivo-viatico-select"
              onChange={handleMotivoViaticoChange}
              value={selectedMotivoViatico}
            />
          </div>
          <div className='mt-5'>
            <label>Jefe de aprobación</label>
            <Select
              className='z-20'
              options={jefesAprobacion}
              isClearable={isClearable}
              instanceId="jefe-aprobacion-select"
              onChange={handleJefeAprobacionChange}
              value={selectedJefeAprobacion}
            />
          </div>
          <div className='flex flex-col justify-start gap-2 md:flex-row md:gap-10'>
            <div className='mt-5 w-52'>
              <p>Fecha de partida</p>
              <SelectDataPicker
                value={fechaPartida}
                onChange={handleFechaPartidaChange}
              />
            </div>
            <div className='mt-5 w-52'>
              <p>Fecha de retorno</p>
              <SelectDataPicker
                value={fechaRetorno}
                onChange={handleFechaRetornoChange}
              />
            </div>
          </div>
          <div className='mt-5 flex flex-col'>
            <label>Monto solicitado</label>
            <input
              type="number"
              placeholder="S/."
              className="input-text form-input w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleMontoSolicitadoChange}
              value={montoSolicitado}
            />
          </div>
          <div className='mt-10 p-4 border-2 border-red-500 text-red-500'>
            <p>Declaración Jurada:</p>
            <p>
              Al solicitar el viático, estamos declarando que contamos con la aprobación de ingreso, por escrito, por parte del Cliente.
            </p>
          </div>
          <button type='submit' className='mt-5 border-2 px-4 py-2 rounded-md bg-slate-200'>Solicitar</button>
        </form>
      </div>
    </div>
  );
}