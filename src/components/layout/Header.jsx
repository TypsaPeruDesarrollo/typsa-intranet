import { useState } from 'react';
import Image from "next/image";
import { FaHome, FaRegUser, FaBars, FaTimes  } from "react-icons/fa";
import { useSession, signOut  } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false }); 
  };

  return (
    <div className="w-full h-20 bg-red-700 flex justify-between p-3">
      <div className="flex items-center">
        <Image 
          className="border-2"
          src="/img/logo-typsa.png"
          alt="logo de la empresa typsa"
          height={60}
          width={60}
          
        />
        <FaHome className="text-white w-8 h-8 ml-3 md:ml-9 cursor-pointer" onClick={() => window.location.href='/'} />
      </div>
      {session && (
      <div className="md:hidden flex items-center z-50">
        <FaBars className="text-white w-8 h-8 cursor-pointer" onClick={toggleMenu} />
      </div>
      )}
      <div className={`fixed bg-red-700 top-0 right-0 w-3/4 h-full z-50 p-10 transform ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:relative md:translate-x-0 md:w-auto md:p-0 md:h-auto md:flex`}>
        <FaTimes className="text-white w-8 h-8 absolute top-5 right-5 cursor-pointer md:hidden" onClick={toggleMenu} />
        <div className="flex flex-col md:flex-row md:items-center">
          {session && (
            <>
              <FaRegUser className="text-white w-6 h-6 md:mr-2" />
              <p className="text-white">{session.user.name}{session.user.surname}</p>
              <button onClick={handleSignOut} className="mt-4 md:mt-0 md:ml-4 border p-2 hover:bg-white hover:text-red-700 text-white transition-colors duration-200">Cerrar Sesión</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
