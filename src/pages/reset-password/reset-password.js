import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      if (token) {
        setIsTokenChecked(true);
      } else {
        setMessage('Token no disponible. Asegúrate de haber usado el enlace correcto.');
        setIsError(true);
      }
    }
  }, [router.isReady, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage('Token no disponible. Asegúrate de haber usado el enlace correcto.');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/reset-password', { token, newPassword });
      setMessage('Contraseña restablecida con éxito. Redirigiendo al inicio de sesión...');
      setIsError(false);
      setTimeout(() => {
        router.push('/login');
      }, 5000); // Redirige a la página de inicio de sesión después de 5 segundos
    } catch (error) {
      setMessage(error.response?.data || 'Error al restablecer la contraseña.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isTokenChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-gray-700">Cargando...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Restablecer Contraseña</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              Nueva Contraseña:
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type={showPassword ? "text" : "password"} 
              id="newPassword" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
            <div className="absolute inset-y-11 right-0 pr-3 flex items-center text-sm leading-5">
              <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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
              'Restablecer'
            )}
          </button>
        </form>
        {message && (
          <div className={`mt-4 p-4 text-center rounded ${isError ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'} animate-fade-in`}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
