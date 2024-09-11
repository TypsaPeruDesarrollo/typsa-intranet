import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/request-password-reset', { email }); // Elimina 'response' si no lo necesitas
      setMessage('Correo de restablecimiento enviado. Verifica tu bandeja de entrada.');
      setIsLoading(false);
      setTimeout(() => {
        router.push('/');
      }, 5000); // Redirige a la página de inicio de sesión después de 5 segundos
    } catch (error) {
      setMessage(error.response?.data || 'Error al solicitar el restablecimiento de la contraseña.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Solicitar Restablecimiento de Contraseña</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo corporativo:
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              'Solicitar'
            )}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-4 text-center rounded ${message.includes('Error') ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'} animate-fade-in`}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestPasswordReset;
