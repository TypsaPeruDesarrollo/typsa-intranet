import Link from "next/link";
import LoginForm from '@/components/LoginForm'

export default function Home() {
  return (
      <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-login-pattern bg-cover">
        <div className="relative">
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <Link
                  href="#"
                  className="flex cursor-pointer items-center gap-2 text-red-700 no-underline hover:text-indigo-500"
                >
                  <span className="flex-shrink-0 text-3xl font-black uppercase tracking-tight opacity-100">
                    Typsa perú
                  </span>
                </Link>
              </div>

              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Bienvenido a Typsa Perú!</h4>
              <p className="mb-6 text-gray-500">Por favor, inicie sesión para acceder a su cuenta</p>

              <LoginForm />

              <p className="mb-4 text-center">
                <Link
                  href="/signin"
                  className="cursor-pointer text-red-500 no-underline hover:text-red-800"
                >
                  {" "}
                  Crea una cuenta{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
