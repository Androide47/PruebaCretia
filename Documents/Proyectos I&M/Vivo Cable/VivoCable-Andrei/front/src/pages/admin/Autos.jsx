import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiDraftFill, RiFileEditFill, RiDeleteBin4Fill } from "react-icons/ri";
import { Tab } from "@headlessui/react";
import axios from "axios";

const Autos = () => {
  const [autos, setAutos] = useState([]);
  const [autoEditado, setAutoEditado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  useEffect(() => {
    fetchAutos();
  }, []);

  const fetchAutos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/autos");
      setAutos(response.data);
    } catch (error) {
      console.error("Error al cargar los autos", error);
    }
  };

  const handleAddAuto = async (event) => {
    event.preventDefault();
    const newAuto = {
      marca: event.target.Marca.value,
      modelo: event.target.Modelo.value,
      placa: event.target.Placa.value,
      // ...otros campos
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/autos",
        newAuto
      );
      setAutos([...autos, response.data]);
      closeModal();
    } catch (error) {
      console.error("Error al agregar el auto", error);
    }
  };

  const handleEditAuto = async (event) => {
    event.preventDefault();
    // ...obtener datos del formulario
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/autos/${autoEditado.id}`,
        autoEditado
      );
      const autosActualizados = autos.map((auto) =>
        auto.id === autoEditado.id ? response.data : auto
      );
      setAutos(autosActualizados);
      closeModal1();
    } catch (error) {
      console.error("Error al editar el auto", error);
    }
  };

  const handleDeleteAuto = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/autos/${id}`);
      const autosActualizados = autos.filter((auto) => auto.id !== id);
      setAutos(autosActualizados);
      closeModal2();
    } catch (error) {
      console.error("Error al eliminar el auto", error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleModal1 = (auto) => {
    setAutoEditado(auto);
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
          <h1 className="font-bold text-gray-100 text-xl">Autos</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Autos</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleModal}
            className="bg-primary/90 text-black hover:bg-primary flex items-center gap-4 py-2 px-4 rounded-lg transition-colors"
          >
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
                        No° Vehiculo
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Marca
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Modelo
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Placa
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Estatus
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {autos.map((auto) => (
                      <tr key={auto.id}>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {auto.id}
                        </td>
                        <td className="px-6 py-4">{auto.marca}</td>
                        <td className="px-6 py-4">{auto.modelo}</td>
                        <td className="px-6 py-4">{auto.placa}</td>
                        <td className="px-6 py-4">{auto.estatus}</td>
                        <td className="px-6 py-4 flex gap-4">
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl"
                            onClick={() => toggleModal1(auto)}
                          >
                            <RiFileEditFill />
                          </button>
                          <button
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl"
                            onClick={() => handleDeleteAuto(auto.id)}
                          >
                            <RiDeleteBin4Fill />
                          </button>
                        </td>
                      </tr>
                    ))}
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
                  Registrar Auto
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
                      htmlFor="Marca"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Marca
                    </label>
                    <input
                      type="text"
                      id="Marca"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Marca"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Modelo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Modelo
                    </label>
                    <input
                      type="text"
                      id="Modelo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Modelo"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Placa"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Placa
                    </label>
                    <input
                      type="text"
                      id="Placa"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Placa"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Año"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Año
                    </label>
                    <input
                      type="date"
                      id="Año"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Color"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Color
                    </label>
                    <input
                      type="color"
                      id="Color"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Color"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Combustible"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Combustible
                    </label>
                    <input
                      type="text"
                      id="Combustible"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Combustible"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Kilometraje"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Kilometraje
                    </label>
                    <input
                      type="number"
                      id="Kilometraje"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Kilometraje"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Estatus"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Estatus
                    </label>
                    <input
                      type="text"
                      id="Estatus"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Estatus"
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
                  Editar Auto
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
                      htmlFor="Placa"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Placa
                    </label>
                    <input
                      type="text"
                      id="Placa"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Placa"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Color"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Color
                    </label>
                    <input
                      type="color"
                      id="Color"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Color"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Combustible"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Combustible
                    </label>
                    <input
                      type="text"
                      id="Combustible"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Combustible"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Estatus"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Estatus
                    </label>
                    <input
                      type="text"
                      id="Estatus"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Estatus"
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
  );
};

export default Autos;
