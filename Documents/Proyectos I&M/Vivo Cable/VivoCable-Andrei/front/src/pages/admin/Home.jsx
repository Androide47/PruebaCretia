import React, {useState} from "react";
import CardTicket from "../../components/CardTicket";
import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

const Home = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };
    const closeModal = () => {
      setModalVisible(false);
    };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
        <CardTicket
          ticket="total"
          totalTickets="*******"
          text="Ingresos"
          text2="Ver Más"
        />
        <CardTicket
          ticket="pending"
          totalTickets="*******"
          text="Clientes"
          text2="Ver Más"
        />
        <CardTicket
          ticket="inProcess"
          totalTickets="*******"
          text="Potenciales"
          text2="Ver Más"
        />
        <CardTicket
          ticket="close"
          totalTickets="*******"
          text="Materiales"
          text2="Ver Más"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-secondary-100 p-8 rounded-lg">
        {/* Title Card */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl">Tickets Nuevos</h1>
          <Link to="/" className="flex items-center gap-2 text-primary">
            Ver Más <RiArrowRightLine />
          </Link>
        </div>


        <div>

      {/* Main modal */}
      {modalVisible && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0"
        >
          <div className="relative w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
                  Asignar
                </h3>
                <div>
                  <input
                    type="text"
                    name="employeeNumber"
                    id="employeeNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-4"
                    placeholder="Empleado"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-2">
          No°
        </th>
        <th scope="col" className="p-3">
          Cliente
        </th>
        <th scope="col" className="p-4">
          Descripcion
        </th>
        <th scope="col" className="p-4">
          Acciones
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600">
        <td className="w-4 p-4">
          123
        </td>
        <th scope="row" className="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div className="text-base font-semibold">Fernando Izazaga Martinez</div>
        </th>
        <td className="px-6 py-4 overflow-hidden max-w-xs">
          <div className="line-clamp-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ducimus, soluta officia, expedita veritatis excepturi minima molestiae non sequi facere voluptas a. Autem eos non asperiores, hic aut perspiciatis quae.
          </div>
        </td>
        <td className="px-6 py-4">
          <a href="#" onClick={toggleModal} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Asignar
          </a>
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600">
        <td className="w-4 p-4">
          123
        </td>
        <th scope="row" className="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div className="text-base font-semibold">Fernando Izazaga Martinez</div>
        </th>
        <td className="px-6 py-4 overflow-hidden max-w-xs">
          <div className="line-clamp-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ducimus, soluta officia, expedita veritatis excepturi minima molestiae non sequi facere voluptas a. Autem eos non asperiores, hic aut perspiciatis quae.
          </div>
        </td>
        <td className="px-6 py-4">
          <a href="#" onClick={toggleModal} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Asignar
          </a>
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600">
        <td className="w-4 p-4">
          123
        </td>
        <th scope="row" className="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div className="text-base font-semibold">Fernando Izazaga Martinez</div>
        </th>
        <td className="px-6 py-4 overflow-hidden max-w-xs">
          <div className="line-clamp-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ducimus, soluta officia, expedita veritatis excepturi minima molestiae non sequi facere voluptas a. Autem eos non asperiores, hic aut perspiciatis quae.
          </div>
        </td>
        <td className="px-6 py-4">
          <a href="#" onClick={toggleModal} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Asignar
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>


    </div>


      </div>
      <div className="bg-secondary-100 p-8 rounded-lg">
        {/* Title Card */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl">Seguimiento de Tickets</h1>
          <Link to="/" className="flex items-center gap-2 text-primary">
          Ver Más <RiArrowRightLine />
          </Link>
        </div>
        {/* Content Card */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {/* Table header */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              <th scope="col" className="px-6 py-3">
                  No°
                </th>
                <th scope="col" className="px-6 py-3">
                  Empleado
                </th>
                <th scope="col" className="px-6 py-3">
                  Estatus
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Table rows */}
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">12345</td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="pl-3">
                    <div className="text-base font-semibold">Fernando Izazaga Martinez</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  </div>
                </td>
              </tr>
             {/* Table rows */}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">12345</td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="pl-3">
                    <div className="text-base font-semibold">Fernando Izazaga Martinez</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>
                  </div>
                </td>
              </tr>
                           {/* Table rows */}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">12345</td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="pl-3">
                    <div className="text-base font-semibold">Fernando Izazaga Martinez</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                  </div>
                </td>
              </tr>
              {/* More table rows */}
              {/* ... */}
            </tbody>
          </table>
        </div>
      </div>
    </div>

      <div className="bg-secondary-100 p-8 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-8">

      </div>
    </div>
  );
};

export default Home;
