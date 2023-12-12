import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    RiDraftFill,
    RiFileEditFill
} from "react-icons/ri";
import { Tab } from "@headlessui/react";

const Tickets = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleModal1 = () => {
    setModalVisible1(!modalVisible1);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };

    return (
        <div>
                  {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10">
        <div>
          <h1 className="font-bold text-gray-100 text-xl">Tickets</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Tickets</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleModal}
            className="bg-primary/90 text-black hover:bg-primary flex items-center gap-4 py-2 px-4 rounded-lg transition-colors">
            <RiDraftFill /> Crear
          </button>
        </div>
      </div>
      <Tab.Group>
        <Tab.Panels className="mt-8">
          <Tab.Panel>
            <div className="bg-secondary-100 p-8 rounded-lg">
            <h1 className="text-3xl mb-8">Resultados</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No° Ticket
                        </th>
                        <th scope="col" className="px-6 py-3">
                            No° Empleado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            No° Cliente
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descripción
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            12345
                        </td>
                        <td className="px-6 py-4">
                            23456
                        </td>
                        <td className="px-6 py-4">
                            34567
                        </td>
                        <td className="px-6 py-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        </td>
                        <td className="px-6 py-4">
                           En Progreso 
                        </td>
                        <td className="px-6 py-4 flex gap-4 "> 
                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl">
                              <RiFileEditFill onClick={toggleModal1}/> 
                            </button>
                        </td>
                  </tr>
                </tbody>
            </table>
        </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {modalVisible && (
        <div
          id="extralarge-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full "
        >
          <div className="relative w-full max-w-4xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                  Registrar Ticket
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="extralarge-modal"
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
              </div>
              <form className="mx-4">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label
                      htmlFor="Id_Cliente"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      ID Cliente
                    </label>
                    <select
                      id="Id_Cliente"
                      name="Id_Cliente"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="1">456</option>
                      <option value="2">567</option>
                      <option value="3">678</option>
                    </select>
                  </div>
                <div>
                    <label
                      htmlFor="Id_Empleado"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      ID Empleado
                    </label>
                    <select
                      id="Id_Empleado"
                      name="Id_Empleado"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="1">123</option>
                      <option value="2">234</option>
                      <option value="3">345</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="Titulo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Titulo
                    </label>
                    <input
                      type="text"
                      id="Titulo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Titulo"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Descripcion"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Descripcion
                    </label>
                    <input
                      type="text"
                      id="Descripcion"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Descripcion"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-6"
                >
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

{modalVisible1 && (
        <div
          id="extralarge-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full "
        >
          <div className="relative w-full max-w-4xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                  Editar Ticket
                </h3>
                <button
                  onClick={closeModal1}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="extralarge-modal"
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
              </div>
              <form className="mx-4">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label
                      htmlFor="Id_Empleado"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      ID Empleado
                    </label>
                    <select
                      id="Id_Empleado"
                      name="Id_Empleado"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="1">123</option>
                      <option value="2">234</option>
                      <option value="3">345</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="Titulo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Titulo
                    </label>
                    <input
                      type="text"
                      id="Titulo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Titulo"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Descripcion"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Descripcion
                    </label>
                    <input
                      type="text"
                      id="Descripcion"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Descripcion"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Estado"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Estado
                    </label>
                    <select
                      id="Estado"
                      name="Estado"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="1">En Progreso</option>
                      <option value="2">Completada</option>
                      <option value="3">Cancelada</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-6"
                >
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
        </div>
    )
}

export default Tickets