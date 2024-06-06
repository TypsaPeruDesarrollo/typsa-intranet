import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn } from 'next-auth/react';


export default function LoginForm() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
        setError('Por favor, completa todos los campos.');
        return;
    }

    // Usando `signIn` de next-auth
    const result = await signIn('credentials', {
        redirect: false,
        username: email,
        password
    });

    if (result.error) {
      alert(result.error);
    } else if (result.url) {
      localStorage.setItem('userEmail', email); // Guardar el email en el localStorage
      router.push(result.url);
    }
  };

  if (session) {
    router.push('/inicio');  
  }

  return (
    <form className="mb-4" onSubmit={handleSubmit}>

      {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        <span className="font-medium">{error}</span>
        </div>
      }

      <div className="mb-4">
        <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
          Email
        </label>
        <input
          type="text"
          className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
          id="email"
          name="email-username"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
            Password
          </label>
          <Link
            href="auth-forgot-password-basic.html"
            className="cursor-pointer text-red-700 no-underline hover:text-red-500"
          >
            <small className=" ">Forgot Password?</small>
          </Link>
        </div>
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            type="password"
            id="password"
            className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
            name="password"
            placeholder="············"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="block">
          <input
            className="mt-1 mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-red-500 focus:border-red-500 focus:shadow"
            type="checkbox"
            id="remember-me"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label className="inline-block"> Remember Me </label>
        </div>
      </div>
      <div className="mb-4">
        <button
          className="grid w-full cursor-pointer select-none rounded-md border border-red-500 bg-red-600 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-red-800 hover:bg-red-800 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </div>
    </form>
  );
}
