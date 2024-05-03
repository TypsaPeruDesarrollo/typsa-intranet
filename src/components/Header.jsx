import Image from "next/image";
import Link from "next/link";
import { FaHome, FaRegUser  } from "react-icons/fa";

export default function Header() {
  return (
    <div className="w-full h-20 bg-red-700 flex justify-between">
      <div className="w-36 flex justify-between p-3 items-center">
        <Image 
          className="border-2"
          src="/img/logo-typsa.png"
          alt="logo de la empresa typsa"
          height={60}
          width={60}
          
        />
        <Link href="https://nextjs.org/docs/getting-started/installation" target="_blank">
          <FaHome className="text-white w-8 h-8"/>
        </Link>
        
      </div>
      <div className="w-64 flex justify-around text-white items-center m-6">
        <FaRegUser className="w-6 h-6" />
        <p className="text-xl"> William Cipriani Naveda</p>
      </div>
    </div>
  );
}
