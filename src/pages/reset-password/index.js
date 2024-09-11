import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;  // Tomar el token de la URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Manejar el formulario de envío
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Enviar la solicitud al backend para restablecer la contraseña
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/reset-password`, { token, newPassword });
      setMessage('Contraseña restablecida con éxito.');
      setIsLoading(false);

      // Redirigir al usuario a la página de inicio de sesión después de 3 segundos
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      setMessage('Error al restablecer la contraseña.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Restablecer Contraseña</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              Nueva Contraseña:
            </label>
            <input 
              type="password" 
              id="newPassword" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required 
            />
          </div>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Restablecer Contraseña'}
          </button>
        </form>
        {message && (
          <div className="mt-4 p-4 text-center rounded bg-green-100 border border-green-400 text-green-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
