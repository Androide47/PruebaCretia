import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {
  RiDraftFill,
  RiFileEditFill,
  RiInformationFill,
  RiDeleteBin4Fill,
} from "react-icons/ri";
import { Tab } from "@headlessui/react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const Servicios = () => {

    //se extrae el token de la cookie
    const cookies = new Cookies();
    const token = cookies.get('auth');
    //url de la api
    let url = 'http://127.0.0.1:8000/api/servicios';
     //declarar la autorización del token 
  const headers = {
    Authorization: `Bearer ${token}`
  };
    //se declara el hook para mostrar los datos
    const [data, setData] = useState([]);

      //traer los datos de la api 
  useEffect(() => {
    const list = async () => {
      try {
        const response = await axios.get(url, { headers });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    list(); 

  }, []);

    //  funcion para enviar los datos del formulario a la api 
  // Usar un objeto inicial para el estado
  const initialFormData = {
    nombre_servicio:'',
    descripcion_servicio:'',
    tipo_servicio:'',
    renta_mensual:'',
    pronto_pago:'',
    megabytes:'',
    costo_servicios:'',
    televisores:'',
    costo_tvadcional:'',
    imagen_principal:'',
    imagen_1:'',
    imagen_2:'',
    comentario:''
  };

  // Utilizar useState correctamente
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (event) => {
    // Si el campo es un archivo, actualiza el estado con el archivo
    if (event.target.type === 'file') {
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0], // Obtén el primer archivo seleccionado
      });
    } else {
      // Para otros campos, actualiza el estado normalmente
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crea un objeto FormData para manejar archivos
    const formDataObj = new FormData();

    // Agrega campos al FormData
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    try {
      const response = await axios.post(url, formDataObj, { headers });

      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }else if(response.status === 404){
        Swal.fire({
          position: 'top-end',
          title: 'Error!',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Continuar'
        });

      }
    } catch (error) {
      const messageError = error.response?.data?.message || 'Error desconocido';
      Swal.fire({
        position: 'top-end',
        title: 'Error!',
        text: messageError,
        icon: 'error',
        confirmButtonText: 'Continuar'
      });
    }
  };


  /* 
  *funcion para elimiar datos
  */

    //funciones para  actualizar datos
    const [datos,setDatos]=useState({
      id:null,
    });
  
    const  handleObtenerEmpleado=(datos)=>{
        setDatos(datos);
    }

  const DeleteData= async ()=>{
    let urlDelete = 'http://127.0.0.1:8000/api/servicios/'+datos.id;
    try {
      const response = await axios.delete(urlDelete, { headers });

      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }else if(response.status === 404){
        Swal.fire({
          position: 'top-end',
          title: 'Error!',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Continuar'
        });

      }
    } catch (error) {
      const messageError = error.response?.data?.message || 'Error desconocido';
      Swal.fire({
        position: 'top-end',
        title: 'Error!',
        text: messageError,
        icon: 'error',
        confirmButtonText: 'Continuar'
      });
    }

  }

















  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [step, setStep] = useState(1);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setStep(1); // Al abrir el modal, mostramos el primer paso.
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleModal1 = () => {
    setModalVisible1(!modalVisible1);
    setStep(1); // Al abrir el modal, mostramos el primer paso.
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

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const nextStep1 = () => {
    setStep(step + 1);
  };

  const prevStep1 = () => {
    setStep(step - 1);
  };

  return (
    <div>
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10">
        <div>
          <h1 className="font-bold text-gray-100 text-xl">Servicios</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Servicios</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleModal}
            className="bg-primary/90 text-black hover:bg-primary flex items-center gap-4 py-2 
                    px-4 rounded-lg transition-colors"
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
                        No° Servicio
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nombre Servicio
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Renta Mensual
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {Array.isArray(data) ? (
                      data.map((item, index) => (
                    <tr  key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.id}
                      </td>
                      <td className="px-6 py-4">{item.nombre_servicio}</td>
                      <td className="px-6 py-4">{item.renta_mensual}</td>
                      <td className="px-6 py-4 flex gap-4">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl">
                          <RiInformationFill />
                        </button>
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl">
                          <RiFileEditFill onClick={toggleModal1}/>
                        </button>
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl">
                          <RiDeleteBin4Fill onClick={()=>{toggleModal2(); handleObtenerEmpleado({id:item.id}) }}/>
                        </button>
                      </td>
                    </tr>
                        ))
                        ) : (
                          <tr>
                            <td colSpan="3">No hay datos para mostrar</td>
                          </tr>
                        )}
                    {/* Rest of the table rows go here */}
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
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
        >
          <div className="w-full max-w-3xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center w-full">
                  Registrar Servicio
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
              <ol className="flex items-center justify-between w-full px-4 mt-4">
                <li
                  className={`flex flex-col items-center ${
                    step === 1
                      ? "text-blue-600 dark:text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 ${
                      step === 1 ? "dark:bg-blue-800" : "dark:bg-gray-700"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 ${
                        step === 1 ? "dark:text-blue-300" : "dark:text-gray-100"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </div>
                  <span className="mt-2">Datos</span>
                </li>
                <li
                  className={`flex flex-col items-center ${
                    step === 2 ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 ${
                      step === 2 ? "dark:bg-gray-700" : "dark:bg-gray-700"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        step === 2 ? "dark:text-gray-100" : "dark:text-gray-100"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                    </svg>
                  </div>
                  <span className="mt-2">Extras</span>
                </li>
                <li
                  className={`flex flex-col items-center ${
                    step === 3 ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 ${
                      step === 3 ? "dark:bg-gray-700" : "dark:bg-gray-700"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        step === 3 ? "dark:text-gray-100" : "dark:text-gray-100"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                    </svg>
                  </div>
                  <span className="mt-2">Imagenes</span>
                </li>
              </ol>

              <div className="p-4">
              <form onSubmit={handleSubmit} encType="multipart/form-data"  method="post" >
                {step === 1 && (
                  
                    <>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="nombre"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre_servicio"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Nombre"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="descripcion"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Descripción
                        </label>
                        <input
                          type="text"
                          id="descripcion"
                          name="descripcion_servicio"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Descripción"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="tipo"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Tipo
                        </label>
                        <input
                          type="text"
                          id="tipo"
                          name="tipo_servicio"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Tipo"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="RentaMensual"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Renta Mensual
                        </label>
                        <input
                          type="number"
                          id="RentaMensual"
                          name="renta_mensual"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Renta Mensual"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="ProntoPago"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Pronto Pago
                        </label>
                        <input
                          type="number"
                          id="ProntoPago"
                          name="pronto_pago"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="pronto Pago"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="CostoServicio"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Costo Servicio
                        </label>
                        <input
                          type="number"
                          id="CostoServicio"
                          name="costo_servicios"
                          onChange={handleChange}
                          value='100.00'
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Costo Servicio"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Siguiente
                    </button>
                    </>
                )}

                {step === 2 && (
                  <>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="Megas"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Megas
                        </label>
                        <input
                          type="number"
                          id="Megas"
                          name="megabytes"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Megas"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="TV"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          TV
                        </label>
                        <input
                          type="number"
                          id="TV"
                          name="televisores"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="TV"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="CostoTV"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Costo TV
                        </label>
                        <input
                          type="number"
                          id="CostoTV"
                          name="costo_tvadicional"
                          onChange={handleChange}
                          value="100.00"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Costo TV"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Comentario"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Comentario
                        </label>
                        <input
                          type="text"
                          id="Comentario"
                          name="comentario"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Comentario"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-300 text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        Anterior
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Siguiente
                      </button>
                    </div>
                    </>
                )}

                {step === 3 && (
                  <>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="Principal"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Imagen Principal
                        </label>
                        <input
                          type="file"
                          id="Principal"
                          name="imagen_principal"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Imagen1"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Imagen 1
                        </label>
                        <input
                          type="file"
                          id="Imagen1"
                          name="imagen_1"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="flex justify-center">
                      <div>
                        <label
                          htmlFor="Imagen2"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Imagen 2
                        </label>
                        <input
                          type="file"
                          id="Imagen2"
                          name="imagen_2"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-300 text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        Anterior
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Guardar
                      </button>
                    </div>
                  </>

             
                )}
             </form>
              </div>
            </div>
          </div>
        </div>
      )}



      {modalVisible1 && (
        <div
          id="extralarge-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
        >
          <div className="w-full max-w-3xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center w-full">
                  Editar Servicio
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
              <ol className="flex items-center justify-between w-full px-4 mt-4">
                <li
                  className={`flex flex-col items-center ${
                    step === 1
                      ? "text-blue-600 dark:text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 ${
                      step === 1 ? "dark:bg-blue-800" : "dark:bg-gray-700"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 ${
                        step === 1 ? "dark:text-blue-300" : "dark:text-gray-100"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </div>
                  <span className="mt-2">Datos</span>
                </li>
                <li
                  className={`flex flex-col items-center ${
                    step === 2 ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 ${
                      step === 2 ? "dark:bg-gray-700" : "dark:bg-gray-700"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        step === 2 ? "dark:text-gray-100" : "dark:text-gray-100"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                    </svg>
                  </div>
                  <span className="mt-2">Extras</span>
                </li>
                <li
                  className={`flex flex-col items-center ${
                    step === 3 ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 ${
                      step === 3 ? "dark:bg-gray-700" : "dark:bg-gray-700"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        step === 3 ? "dark:text-gray-100" : "dark:text-gray-100"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                    </svg>
                  </div>
                  <span className="mt-2">Imagenes</span>
                </li>
              </ol>

              <div className="p-4">
                {step === 1 && (
                  <form>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="nombre"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Nombre"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="descripcion"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Descripción
                        </label>
                        <input
                          type="text"
                          id="descripcion"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Descripción"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="tipo"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Tipo
                        </label>
                        <input
                          type="text"
                          id="tipo"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Tipo"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="RentaMensual"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Renta Mensual
                        </label>
                        <input
                          type="number"
                          id="RentaMensual"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Renta Mensual"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="ProntoPago"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Pronto Pago
                        </label>
                        <input
                          type="number"
                          id="ProntoPago"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="pronto Pago"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="CostoServicio"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Costo Servicio
                        </label>
                        <input
                          type="number"
                          id="CostoServicio"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Costo Servicio"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <button
                      type="button"
                      onClick={nextStep1}
                      className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Siguiente
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="Megas"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Megas
                        </label>
                        <input
                          type="number"
                          id="Megas"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Megas"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="TV"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          TV
                        </label>
                        <input
                          type="number"
                          id="TV"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="TV"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="CostoTV"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Costo TV
                        </label>
                        <input
                          type="number"
                          id="CostoTV"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Costo TV"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Comentario"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Comentario
                        </label>
                        <input
                          type="text"
                          id="Comentario"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Comentario"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={prevStep1}
                        className="bg-gray-300 text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        Anterior
                      </button>
                      <button
                        type="button"
                        onClick={nextStep1}
                        className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Siguiente
                      </button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <form>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label
                          htmlFor="Principal"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Imagen Principal
                        </label>
                        <input
                          type="file"
                          id="Principal"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Imagen1"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Imagen 1
                        </label>
                        <input
                          type="file"
                          id="Imagen1"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="flex justify-center">
                      <div>
                        <label
                          htmlFor="Imagen2"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Imagen 2
                        </label>
                        <input
                          type="file"
                          id="Imagen2"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={prevStep1}
                        className="bg-gray-300 text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                      >
                        Anterior
                      </button>
                      <button
                        type="button"
                        onClick={nextStep1}
                        className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                )}
              </div>
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
                   onClick={()=>{ DeleteData(); closeModal2()}}
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

export default Servicios;
