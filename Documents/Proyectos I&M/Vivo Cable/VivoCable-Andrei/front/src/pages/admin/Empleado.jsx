import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiDraftFill, RiFileEditFill, RiDeleteBin4Fill } from "react-icons/ri";
import { Tab } from "@headlessui/react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const Empleado = () => {
  //se extrae el token de la cookie
  const cookies = new Cookies();
  const token = cookies.get("auth");
  //url de la api
  let url = "http://127.0.0.1:8000/api/empleados";
  //se declara el hook para mostrar los datos
  const [data, setData] = useState([]);
  //paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // numero de elementos a mostrar por pagina

  //declarar la autorización del token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
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
    };

    list();
  }, []);
  //  funcion para enviar los datos del formulario a la api
  // Usar un objeto inicial para el estado
  const initialFormData = {
    rol_id: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    curp: "",
    nss: "",
    ine: "",
    rfc: "",
    fecha_nacimiento: "",
    numero_telefono: "",
    correo_electronico: "",
    fecha_ingreso: "",
    contrato: "",
    numero_empleado: "",
    password: "",
    calle: "",
    num_ext: "",
    num_int: "",
    colonia: "",
    cp: "",
    municipio: "",
    estado: "",
  };

  // Utilizar useState correctamente
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    // Si el campo es un archivo, actualiza el estado con el archivo
    if (event.target.type === "file") {
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
          timer: 1500,
        });
      }
    } catch (error) {
      const messageError = error.response?.data?.message || "Error desconocido";
      Swal.fire({
        position: "top-end",
        title: "Error!",
        text: messageError,
        icon: "error",
        confirmButtonText: "Continuar",
      });
    }
  };

  //funciones para  actualizar datos
  const [datos,setDatos]=useState({
    id:null,
    rol_id: null,
    ine: null,
    fecha_nacimiento: null,
    numero_telefono: null,
    correo_electronico: null,
    contrato: null,
    password: null,
    calle: null,
    num_ext: null,
    num_int: null,
    colonia: null,
    cp: null,
    municipio: null,
    estado: null
  });

  const  handleObtenerEmpleado=(datos)=>{
      setDatos(datos);
  }
  //estado inicial para  acctualizar datos
  const initialUpdateData = {
    rol_id:datos.rol_id,
   // ine: false,
    numero_telefono: datos.numero_telefono,
    correo_electronico:datos.correo_electronico,
   // contrato: false,
    calle: datos.calle,
    num_ext:datos.num_ext,
    num_int: datos.int,
    colonia:datos.colonia,
    cp: datos.cp,
    municipio: datos.municipio,
    estado: datos.estado
  };

  const [UpdateData, setUpdateData] = useState(initialUpdateData);

  const handleUpdateChange = (event) => {

    // Si el campo es un archivo, actualiza el estado con el archivo
    if (event.target.type === 'file') {
      setUpdateData({
        ...UpdateData,
        [event.target.name]: event.target.files[0], // Obtén el primer archivo seleccionado
      });
    } else {
      // Para otros campos, actualiza el estado normalmente
   
        setUpdateData({
          ...UpdateData,
          [event.target.name]: event.target.value,
        });
   
    }
  };

//funcion para  mandar los datosd actualizados a la api
  const handleUpdateSubmit = async (event) => {
    console.log(datos.id);
    event.preventDefault();
    let urlUpdate = 'http://127.0.0.1:8000/api/empleadoActualizar/'+datos.id;
    // Crea un objeto FormData para manejar archivos
    const formDataObj = new FormData();
    console.log(UpdateData);
    // Agrega campos al FormData
    Object.entries(UpdateData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    

    try {
      const response = await axios.post(urlUpdate, formDataObj, { headers });
      

      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          //showConfirmButton: false,
          confirmButtonText: 'Continuar',
         // timer: 1500
        });
      }
    } catch (error) {
      const messageError = error.response?.data?.message || 'Error desconocido';
     
      Swal.fire({
        position: 'top-end',
        title: 'Error!',
        text: messageError,
        icon: 'error',
        confirmButtonText: 'Continuar',

      });

      
    }
  };


  /*
  funcion para eliminar usuario
  */
 const deleteData=async ()=>{
  
  let urlDelete = 'http://127.0.0.1:8000/api/empleados/'+datos.id;
  try {
    const response = await axios.delete(urlDelete,{ headers });
    

    if (response.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        //showConfirmButton: false,
        confirmButtonText: 'Continuar',
       // timer: 1500
      });
    }
  } catch (error) {
    const messageError = error.response?.data?.message || 'Error desconocido';
   
    Swal.fire({
      position: 'top-end',
      title: 'Error!',
      text: messageError,
      icon: 'error',
      confirmButtonText: 'Continuar',

    });

    
  }

 };



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
          <h1 className="font-bold text-gray-100 text-xl">Empleados</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Empleados</span>
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
                        No° Empleado
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nombre Empleado
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Rol
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Telefono
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Correo
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(data) ? (
                      data.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.numero_empleado}
                          </td>

                          <td className="px-6 py-4">
                            {item.nombre +
                              " " +
                              item.apellido_paterno +
                              " " +
                              item.apellido_materno}
                          </td>
                          <td className="px-6 py-4">{item.roles.nombre}</td>
                          <td className="px-6 py-4">{item.numero_telefono}</td>
                          <td className="px-6 py-4">
                            {item.correo_electronico}
                          </td>
                        <td className="px-6 py-4 flex gap-4">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl">
                          <RiFileEditFill onClick={ ()=>{toggleModal1(); 
                            handleObtenerEmpleado({
                              id:item.id,
                              rol_id:item.rol_id,
                              calle:item.calle,
                              num_ext:item.num_ext,
                              num_int:item.num_int,
                              colonia:item.colonia,
                              cp:item.cp,
                              municipio:item.municipio,
                              estado:item.estado,
                              numero_telefono:item.numero_telefono,
                              correo_electronico:item.correo_electronico
                            }) } }/>
                        </button>
                        {
                        //modal para eliminar 

                        }
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl">
                              <RiDeleteBin4Fill onClick={ ()=>{toggleModal2(); handleObtenerEmpleado({id:item.id}) } } />
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
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full "
        >
          <div className="relative w-full max-w-7xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                  Registrar Empleado
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
              <form
                className="mx-4"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-6 mb-6 md:grid-cols-4">
                  <div>
                    <label
                      htmlFor="Rol"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Rol
                    </label>
                    <select
                      onChange={handleChange}
                      id="rol_id"
                      name="rol_id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="1">Administrador</option>
                      <option value="2">Cajero</option>
                      <option value="3">Tecnico</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="Nombre"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nombre
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="nombre"
                      name="nombre"
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
                      onChange={handleChange}
                      type="text"
                      id="apellido_paterno"
                      name="apellido_paterno"
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
                      onChange={handleChange}
                      type="text"
                      id="apellido_materno"
                      name="apellido_materno"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Apellido Materno"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="CURP"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      CURP
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="curp"
                      name="curp"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="CURP"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="NSS"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      NSS
                    </label>
                    <input
                      onChange={handleChange}
                      type="number"
                      id="nss"
                      name="nss"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="NSS"
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
                      onChange={handleChange}
                      type="text"
                      id="rfc"
                      name="rfc"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="RFC"
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
                      onChange={handleChange}
                      type="tel"
                      id="numero_telefono"
                      name="numero_telefono"
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
                      onChange={handleChange}
                      type="text"
                      id="calle"
                      name="calle"
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
                      onChange={handleChange}
                      type="number"
                      id="num_ext"
                      name="num_ext"
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
                      onChange={handleChange}
                      type="number"
                      id="num_int"
                      name="num_int"
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
                      onChange={handleChange}
                      type="text"
                      id="colonia"
                      name="colonia"
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
                      onChange={handleChange}
                      type="number"
                      id="cp"
                      name="cp"
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
                      onChange={handleChange}
                      type="text"
                      id="municipio"
                      name="municipio"
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
                      onChange={handleChange}
                      type="text"
                      id="estado"
                      name="estado"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Estado"
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
                      onChange={handleChange}
                      type="file"
                      id="ine"
                      name="ine"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Contrato"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contrato
                    </label>
                    <input
                      onChange={handleChange}
                      type="file"
                      id="contrato"
                      name="contrato"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Doe"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="fecha"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fecha de Nacimiento
                    </label>
                    <input
                      onChange={handleChange}
                      type="date"
                      id="fecha_nacimiento"
                      name="fecha_nacimiento"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="dd/mm/aaaa"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="fecha"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fecha de Ingreso
                    </label>
                    <input
                      onChange={handleChange}
                      type="date"
                      id="fecha_ingreso"
                      name="fecha_ingreso"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="dd/mm/aaaa"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email address
                    </label>
                    <input
                      onChange={handleChange}
                      type="email"
                      id="correo_electronico"
                      name="correo_electronico"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="john.doe@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      type="password"
                      id="password"
                      name="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="•••••••••"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Empleado"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      No° Empleado
                    </label>
                    <input
                      onChange={handleChange}
                      type="number"
                      id="numero_empleado"
                      name="numero_empleado"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="No° Empleado"
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
          <div className="relative w-full max-w-7xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">

                  Editar Empleado
                  
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
              <form className="mx-4"   onSubmit={handleUpdateSubmit} encType="multipart/form-data">
                <div className="grid gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="Rol"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Rol
                    </label>
                    <select
                      name="rol_id"
                      defaultValue={datos.rol_id}
                      id="countries"
                      onChange={handleUpdateChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      
                      <option value="2">Cajero</option>
                      <option value="1">Administrador</option>
                      <option value="3">Tecnico</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="INE"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      INE
                    </label>
                    <input
                      onChange={handleUpdateChange}
                      type="file"
                      id="INE"
                      name="ine"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Contrato"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contrato
                    </label>
                    <input
                      type="file"
                      id="Contrato"
                      onChange={handleUpdateChange}
                      name="contrato"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Doe"
                      
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
                      name="calle"
                      defaultValue={datos.calle}
                      type="text"
                      onChange={handleUpdateChange}
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
                      name="num_ext"
                      onChange={handleUpdateChange}
                      defaultValue={datos.num_ext}
                      id="NumExterior"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Num Exterior"
                     
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
                      name="num_int"
                      defaultValue={datos.num_int}
                      onChange={handleUpdateChange}
                      id="NumInterior"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Num Interior"
                      
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
                      name="colonia"
                      defaultValue={datos.colonia}
                      onChange={handleUpdateChange}
                      id="Colonia"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Colonia"
                      
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
                      name="cp"
                      defaultValue={datos.cp}
                      onChange={handleUpdateChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Codigo Postal"
                      
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
                      name="municipio"
                      defaultValue={datos.municipio}
                      onChange={handleUpdateChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Municipio"
                      
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
                      name="estado"
                      defaultValue={datos.estado}
                      onChange={handleUpdateChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Estado"
                      
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
                      name="numero_telefono"
                      defaultValue={datos.numero_telefono}
                      onChange={handleUpdateChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Telefono"
                      
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="correo_electronico"
                      defaultValue={datos.correo_electronico}
                      onChange={handleUpdateChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="john.doe@company.com"
                      
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
                  ¿Estás seguro de que deseas eliminar este elemento? {datos.id}
                </p>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                <button
                onClick={()=>{ deleteData() ; closeModal2() }}
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

export default Empleado;
