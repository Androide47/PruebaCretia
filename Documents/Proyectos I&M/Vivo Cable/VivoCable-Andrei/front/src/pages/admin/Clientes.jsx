import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    RiDraftFill,
    RiFileEditFill,
    RiDeleteBin4Fill
} from "react-icons/ri";
import { Tab } from "@headlessui/react";

const Clientes = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

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

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

    return (
        <div>
                  {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10">
        <div>
          <h1 className="font-bold text-gray-100 text-xl">Clientes</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Clientes</span>
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
                            No° Cliente
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nombre Cliente
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Correo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Telefono
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
                            Fernando Izazaga Martínez
                        </td>
                        <td className="px-6 py-4">
                            fer@gmail.com
                        </td>
                        <td className="px-6 py-4">
                            5544886622
                        </td>
                        <td className="px-6 py-4 flex gap-4 "> 
                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl">
                              <RiFileEditFill onClick={toggleModal1}/> 
                            </button>
                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl">
                              <RiDeleteBin4Fill onClick={toggleModal2}/> 
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
          <div className="relative w-full max-w-5xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                  Registrar Cliente
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
                <div className="grid gap-6 mb-6 md:grid-cols-4">
                  <div>
                    <label
                      htmlFor="Nombre"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="Nombre"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nombre"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ApellidoPaterno"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Apellido Paterno
                    </label>
                    <input
                      type="text"
                      id="ApellidoPaterno"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Apellido Paterno"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Ape"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Apellido Materno
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Apellido Materno"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Telefono"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="Telefono"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Telefono"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-4">
                  <div>
                    <label
                      htmlFor="calle"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Calle
                    </label>
                    <input
                      type="text"
                      id="calle"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Calle"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="NumExterior"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Num Exterior
                    </label>
                    <input
                      type="number"
                      id="NumExterior"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Num Exterior"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="NumInterior"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Num Interior
                    </label>
                    <input
                      type="number"
                      id="NumInterior"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Num Interior"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Colonia"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Colonia
                    </label>
                    <input
                      type="text"
                      id="Colonia"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Colonia"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="CodigoPostal"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Codigo Postal
                    </label>
                    <input
                      type="number"
                      id="CodigoPostal"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Codigo Postal"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Municipio"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Municipio
                    </label>
                    <input
                      type="text"
                      id="Municipio"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Municipio"
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
                    <input
                      type="text"
                      id="Estado"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Estado"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="RFC"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      RFC
                    </label>
                    <input
                      type="text"
                      id="RFC"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="RFC"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="INE"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      INE
                    </label>
                    <input
                      type="file"
                      id="INE"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Comprobante"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Comprobante
                    </label>
                    <input
                      type="file"
                      id="Comprobante"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Correo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Correo
                    </label>
                    <input
                      type="email"
                      id="Correo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Correo"
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
          <div className="relative w-full max-w-5xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                  Editar Cliente
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
                <div className="grid gap-6 mb-6 md:grid-cols-4">
                  <div>
                    <label
                      htmlFor="calle"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Calle
                    </label>
                    <input
                      type="text"
                      id="calle"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Calle"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="NumExterior"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Num Exterior
                    </label>
                    <input
                      type="number"
                      id="NumExterior"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Num Exterior"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="NumInterior"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Num Interior
                    </label>
                    <input
                      type="number"
                      id="NumInterior"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Num Interior"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Colonia"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Colonia
                    </label>
                    <input
                      type="text"
                      id="Colonia"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Colonia"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="CodigoPostal"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Codigo Postal
                    </label>
                    <input
                      type="number"
                      id="CodigoPostal"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Codigo Postal"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Municipio"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Municipio
                    </label>
                    <input
                      type="text"
                      id="Municipio"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Municipio"
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
                    <input
                      type="text"
                      id="Estado"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Estado"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Telefono"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="Telefono"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Telefono"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="INE"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      INE
                    </label>
                    <input
                      type="file"
                      id="INE"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Comprobante"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Comprobante
                    </label>
                    <input
                      type="file"
                      id="Comprobante"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Correo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Correo
                    </label>
                    <input
                      type="email"
                      id="Correo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Correo"
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

{modalVisible2 && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0"
        >
          <div className="relative w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="px-6 py-6 lg:px-8">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
                  ¿Estás seguro de que deseas eliminar este elemento?
                </p>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                <button
                    type="submit"
                    className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Eliminar
                  </button>
                  <button
                    type="submit"
                    onClick={closeModal2}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
    )
}

export default Clientes