// types.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * Extensión del modelo User para incluir 'roles'.
   */
  interface User {
    id?: string;
    empleadoId?: string;
    name?: string;
    surname?: string;
    email?: string;
    image?: string;
    roles?: string[];
    token?: string;   
  }

  export interface Solicitud {
    SolicitudId: string;
    CodigoProyecto: string;
    NombreMotivo: string;
    Nombres: string;
    FechaInicio: string;
    FechaFin: string;
    MontoNetoInicial: number;
    EstadoId: number;
  }

  /**
   * Extensión del modelo Session para incluir el tipo User extendido.
   */
  interface Session {
    user: User;
    accessToken?: string;  // Asegúrate de que accessToken esté incluido aquí.
  }

  interface JWT {
    id: string;
    empleadoId: string;
    name: string;
    surname: string;
    email: string;
    roles: string[];
    accessToken: string;
  }
}
