import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiArrowRightSLine,
  RiTicketLine,
  RiEarthLine,
  RiLogoutCircleRLine,
  RiMenu3Line,
  RiCloseLine,
  RiDatabaseLine,
  RiHomeFill,
  RiCashLine,
} from "react-icons/ri";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const [showSubmenu2, setShowSubmenu2] = useState(false);

  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 
        bg-secondary-100 p-4 flex flex-col justify-between z-50 ${showMenu ? "left-0" : "-left-full"} transition-all`}
      >
        <div>
          <h1 className="text-center text-2xl font-bold text-white mb-10">
            Admin<span className="text-primary text-4xl">.</span>
          </h1>
          <ul>
            <li>
              <Link
                to="/"
                className=" flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiHomeFill className="text-primary" />
                Inicio
              </Link>
            </li>
            
            <li>
              <button
                onClick={() => setShowSubmenu(!showSubmenu)}
                to="/"
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiEarthLine className="text-primary" />
                  Recursos Humanos
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${
                    showSubmenu && "rotate-90"
                  } transition-all`}
                />
              </button>
              <ul
                className={` ${
                  showSubmenu ? "h-auto" : "h-0"
                } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="/Asistencia"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3
                        before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2
                        before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white
                        transition-color"
                  >
                    Asistencia
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Empleado"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3
                        before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                        before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white
                        transition-color"
                  >
                    Empleados
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Roles"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3
                        before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                        before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white
                        transition-color"
                  >
                    Roles
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <button
                onClick={() => setShowSubmenu2(!showSubmenu2)}
                to="/"
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <RiDatabaseLine className="text-primary" />
                  CRM
                </span>
                <RiArrowRightSLine
                  className={`mt-1 ${
                    showSubmenu2 && "rotate-90"
                  } transition-all`}
                />
              </button>
              <ul
                className={` ${
                  showSubmenu2 ? "h-auto" : "h-0"
                } overflow-y-hidden transition-all`}
              >
                <li>
                  <Link
                    to="/Clientes"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3
                        before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2
                        before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white
                        transition-color"
                  >
                    Cliente
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Servicios"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3
                        before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                        before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white
                        transition-color"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Provedores"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3
                        before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                        before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white
                        transition-color"
                  >
                    Provedores
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Finanzas"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3
                        before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                        before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white
                        transition-color"
                  >
                    Finanzas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Inventario"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3
                        before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                        before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white
                        transition-color"
                  >
                    Inventario
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Autos"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3
                        before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                        before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white
                        transition-color"
                  >
                    Autos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Potenciales"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3
                        before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2
                        before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white
                        transition-color"
                  >
                    Clientes Potenciales
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                to="/Caja"
                className=" flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiCashLine className="text-primary" />
                Sistema de Caja
              </Link>
            </li>

            <li>
              <Link
                to="/Tickets"
                className=" flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiTicketLine className="text-primary" />
                Tickets
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <Link
            to="/"
            className=" flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
          >
            <RiLogoutCircleRLine className="text-primary" /> Cerrar Sessión
          </Link>
        </nav>
      </div>
      <button onClick={() => setShowMenu(!showMenu)} className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50">
        { showMenu ? <RiCloseLine/> : <RiMenu3Line/>}
      </button>
    </>
  );
};

export default Sidebar;
