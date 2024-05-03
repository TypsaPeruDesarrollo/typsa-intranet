export default function Home() {
  return (
      <div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-login-pattern bg-cover">
        <div className="relative">
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <a
                  href="#"
                  className="flex cursor-pointer items-center gap-2 text-red-700 no-underline hover:text-indigo-500"
                >
                  <span className="flex-shrink-0 text-3xl font-black uppercase tracking-tight opacity-100">
                    Typsa perú
                  </span>
                </a>
              </div>

              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Bienvenido a Typsa Perú!</h4>
              <p className="mb-6 text-gray-500">Por favor, inicie sesión para acceder a su cuenta</p>

              <form id="" className="mb-4" action="#" method="POST">
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
                  />
                </div>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                      Password
                    </label>
                    <a
                      href="auth-forgot-password-basic.html"
                      className="cursor-pointer text-red-500 no-underline hover:text-red-500"
                    >
                      <small className=" ">Forgot Password?</small>
                    </a>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="password"
                      id="password"
                      className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      placeholder="············"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="block">
                    <input
                      className="mt-1 mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-red-500 focus:border-red-500 focus:shadow"
                      type="checkbox"
                      id="remember-me"
                      checked
                    />
                    <label className="inline-block"> Remember Me </label>
                  </div>
                </div>
                <div className="mb-4">
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border border-red-500 bg-red-600 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-red-800 hover:bg-red-800 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                    type="submit"
                  >
                    Iniciar Sesion
                  </button>
                </div>
              </form>

              <p className="mb-4 text-center">
                <a
                  href="#"
                  className="cursor-pointer text-red-500 no-underline hover:text-red-800"
                >
                  {" "}
                  Crea una cuenta{" "}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
