import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from 'axios';
import Select from 'react-select';
import SelectDataPicker from '@/components/SelectDatePicker';
import DetallePresupuestoForm from '@/components/DetallePresupuestoForm';

interface SelectOption {
  value: number;
  label: string;
}

interface JefeAprobacion extends SelectOption {
  email: string;
}

interface DetallePresupuesto {
  resumen: string;
  precioUnitario: number;
  personas: number;
  cantidad: number;
}

export default function GestionViaticos() {
  const { data: session } = useSession();
  const empleadoId = session?.user?.empleadoId;
  const empleadoNombre = `${session?.user?.name} ${session?.user?.surname}`;
  const router = useRouter();
  const [isClearable] = useState(true);
  const [centroCostos, setCentroCostos] = useState<SelectOption[]>([]);
  const [motivosViatico, setMotivosViatico] = useState<SelectOption[]>([]);
  const [jefesAprobacion, setJefesAprobacion] = useState<JefeAprobacion[]>([]);
  const [areasTecnicas, setAreasTecnicas] = useState<SelectOption[]>([]);
  const [selectedCentroCosto, setSelectedCentroCosto] = useState<SelectOption | null>(null);
  const [selectedMotivoViatico, setSelectedMotivoViatico] = useState<SelectOption | null>(null);
  const [selectedJefeAprobacion, setSelectedJefeAprobacion] = useState<SelectOption | null>(null);
  const [selectedAreaTecnica, setSelectedAreaTecnica] = useState<SelectOption | null>(null);
  const [montoSolicitado, setMontoSolicitado] = useState('');
  const [fechaPartida, setFechaPartida] = useState<Date | null>(null);
  const [fechaRetorno, setFechaRetorno] = useState<Date | null>(null);
  const [comentariosUsuario, setComentariosUsuario] = useState('');
  const [jefeSeleccionado, setJefeSeleccionado] = useState<JefeAprobacion | null>(null);
  const [detallesPresupuesto, setDetallesPresupuesto] = useState<DetallePresupuesto[]>([]);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [centroCostosRes, motivosRes, jefesRes, areasRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/centrocosto`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/motivoviaticos`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jefe-aprobacion`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/areatecnica`)
        ]);
        setCentroCostos(centroCostosRes.data.map((cc: { ProyectoId: number; CodigoProyecto: string; NombreProyecto: string; }) => ({ value: cc.ProyectoId, label: `${cc.CodigoProyecto} - ${cc.NombreProyecto}` })));
        setMotivosViatico(motivosRes.data.map((mv: { MotivoId: number; NombreMotivo: string; }) => ({ value: mv.MotivoId, label: mv.NombreMotivo })));
        setJefesAprobacion(jefesRes.data.map((ja: { EmpleadoId: number; Nombres: string; Apellidos: string; CorreoTYPSA: string; }) => ({ value: ja.EmpleadoId, label: `${ja.Nombres} ${ja.Apellidos}`, email: ja.CorreoTYPSA })));
        setAreasTecnicas(areasRes.data.map((at: { AreaTecnicaId: number; Nombre: string; Codigo: string; }) => ({ value: at.AreaTecnicaId, label: `${at.Codigo} - ${at.Nombre}` })));
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
    const jefe = jefesAprobacion.find(j => j.value === selectedOption?.value) || null;
    setSelectedJefeAprobacion(selectedOption);
    setJefeSeleccionado(jefe);
    if (jefe) {
      console.log(`Jefe seleccionado: ${jefe.label}, Correo: ${jefe.email}`);
    }
  };

  const handleAreaTecnicaChange = (selectedOption: SelectOption | null) => {
    setSelectedAreaTecnica(selectedOption);
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

  const handleComentariosUsuarioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComentariosUsuario(event.target.value);
  };

  const handleDetallesChange = (detalles: DetallePresupuesto[]) => {
    setDetallesPresupuesto(detalles);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const solicitudData = {
        EmpleadoId: empleadoId,
        EmpleadoNombre: empleadoNombre,
        MotivoViaticoId: selectedMotivoViatico?.value,
        MontoNetoInicial: montoSolicitado,
        CentroCostosId: selectedCentroCosto?.value,
        JefeAprobadorId: selectedJefeAprobacion?.value,
        AreaTecnicaId: selectedAreaTecnica?.value,
        FechaInicio: fechaPartida,
        FechaFin: fechaRetorno,
        ComentariosUsuario: comentariosUsuario,
        CorreoJefe: jefeSeleccionado?.email,
        detallesPresupuesto: detallesPresupuesto,
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos`, solicitudData);
      if (response.status === 201) {
        alert('Solicitud creada con éxito');
        resetForm();
      }
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
      alert('Error al crear la solicitud');
    }
  };

  const resetForm = () => {
    setSelectedCentroCosto(null);
    setSelectedMotivoViatico(null);
    setSelectedJefeAprobacion(null);
    setSelectedAreaTecnica(null);
    setMontoSolicitado('');
    setFechaPartida(null);
    setFechaRetorno(null);
    setComentariosUsuario('');
    setDetallesPresupuesto([]);
  };

  return (
    <div className="min-h-screen mb-10">
      <div className="h-40 flex flex-col">
        <div className="h-40 bg-hero-pattern bg-center bg-cover w-full flex-1 relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div>
            <h1 className="absolute text-white text-4xl z-50 left-20 top-16">Solicitar Viaticos</h1>
          </div>
        </div>
      </div>
      <div className="my-10 mx-20">
        <form onSubmit={handleSubmit} className='mt-10 lg:mx-72 mx-0'>
          <div>
            <label>Centro de Costo</label>
            <Select
              className='z-50'
              options={centroCostos}
              isClearable={isClearable}
              instanceId="centro-de-costo-select"
              onChange={handleCentroCostoChange}
              value={selectedCentroCosto}
            />
          </div>
          <div className='mt-5'>
            <label>Corresponsabilidad</label>
            <Select
              className='z-40'
              options={areasTecnicas}
              isClearable={isClearable}
              instanceId="centro-de-costo-select"
              onChange={handleAreaTecnicaChange}
              value={selectedAreaTecnica}
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
          {selectedMotivoViatico?.value === 1 && (
            <div className="container mx-auto py-4 px-2 my-2 border-2 rounded-lg">
              <p>Detallado:</p>
              <DetallePresupuestoForm onDetallesChange={handleDetallesChange} />
            </div>
          )}
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
          
          <div className='mt-5 flex flex-col'>
            <label>Comentario</label>
            <textarea 
              id="message" 
              rows={4} 
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Escribe aquí..."
              onChange={handleComentariosUsuarioChange}
              value={comentariosUsuario}
              ></textarea>
          </div>
          <button type='submit' className='mt-5 border-2 px-4 py-2 rounded-md bg-slate-200'>Solicitar</button>
        </form>
      </div>
    </div>
  );
}
