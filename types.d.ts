// types.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * Extensión del modelo User para incluir 'roles'.
   */
  interface User {
    empleadoId?: string;
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    roles?: string[];  // Agregar roles como un array de strings.
  }

  /**
   * Extensión del modelo Session para incluir el tipo User extendido.
   */
  interface Session {
    user: User;  // Usar el User extendido que incluye 'roles'.
  }
}
