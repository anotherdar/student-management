import { Link } from '@tanstack/react-router'
import { PiStudentFill } from "react-icons/pi";

export default function Header() {
  return (
    <header className="p-2 py-4 flex gap-2 bg-white text-black justify-between shadow ">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/" className="group flex items-center gap-2 duration-300 rounded-full bg-blue-700 p-2 px-4">
            <PiStudentFill size={24} className="text-white" />
            <h5 className="font-bold text-white">Notas</h5>
          </Link>
        </div>
      </nav>
    </header>
  )
}
