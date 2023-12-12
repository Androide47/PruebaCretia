import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { RiDraftFill, RiCoinsFill, RiDownloadFill, RiLogoutCircleRLine } from "react-icons/ri";
import { Tab } from "@headlessui/react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const Asistencia = () => {
  //se extrae la cookie  guardada
  const cookie= new Cookies();
  const token = cookie.get('auth');
  //url de la api
  let url='http://127.0.0.1:8000/api/empleados';
  //se declara el hook para mostrar los datos
  const [data,setData]=useState([]);
    //declarar la autorización del token 
    const headers={
      Authorization: `Bearer ${token}`
    };
    //traer los datos de la api 
    useEffect(()=>{
      const list = async()=>{
        try{
          const response=await axios.get(url,{headers});
          setData(response.data.data);
        }catch(error){
          console.log(error);
        }
      }
  
      list(); 
  
    },[]);

    //pasar asistencia
    let urlAsistencia= 'http://127.0.0.1:8000/api/asistencias';
     //se declara el hook para las variables del formulario
  const[formData,setFormData]=useState({
    id_tipo:''
  });
  const [idEmpleado,setIdEmpleado]= useState(null);
    //se cambia la variable segun el valor
    const handleChange=(event)=>{
    
      setFormData({
        ...formData,
        [event.target.name]:event.target.value
      });
    }

      // Función para manejar la selección de un empleado
  const handleSeleccionEmpleado = (idEmpleado) => {
    // Puedes hacer algo con el ID del empleado si es necesario
    

    // Actualiza el estado del hook con el ID del empleado seleccionado
    setIdEmpleado(idEmpleado);
    
  };
    
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Se extraen los valores del formulario
    const  id_tipo  = formData.id_tipo;
    const id_empleado = idEmpleado;
    
   
    try {

      const responseAsistencia = await axios.post(
        urlAsistencia,
        { id_empleado, id_tipo },
        { headers }
      );
  
      // Si la solicitud fue exitosa, muestra el mensaje de éxito
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: responseAsistencia.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Si hay un error, muestra el mensaje de error
      const messageError = error.responseAsistencia?.data?.message || 'Error desconocido';
  
      Swal.fire({
        position: 'top-end',
        title: 'Error!',
        text: messageError,
        icon: 'error',
        confirmButtonText: 'Continuar',
      });
    }
  };




  //funcion de pasar salida 
  const EmployeeExit = async () => {
    let urlSalida= 'http://127.0.0.1:8000/api/asistencias';
   
    try {
      let  id_empleado=idEmpleado;
      console.log(id_empleado);
      const responseSalida = await axios.patch(
        urlSalida,{id_empleado},
        { headers }
      );
  
      // Si la solicitud fue exitosa, muestra el mensaje de éxito
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: responseSalida.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Si hay un error, muestra el mensaje de error
      const messageError = error.responseSalida?.data?.message || 'Error desconocido';
  
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
          <h1 className="font-bold text-gray-100 text-xl">Asistencias</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Asistencias</span>
          </div>
        </div>
      </div>
      <Tab.Group>
        <Tab.Panels className="mt-8">
          <Tab.Panel>
            <div className="bg-secondary-100 p-8 rounded-lg">
              <h1 className="text-3xl mb-8">Resultados</h1>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No° Contrato
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(data) ? (
                data.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.numero_empleado}
                        </td>
                        <td className="px-6 py-4">
                        {item.nombre + " " +item.apellido_paterno + " " + item.apellido_materno}
                        </td>
                        <td className="px-6 py-4 flex gap-4 "> 
                            <button onClick={()=>{ toggleModal() ;  handleSeleccionEmpleado(item.id)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl">
                              <RiDraftFill /> 
                              
                            </button>
                            <button onClick={()=>{toggleModal1(), handleSeleccionEmpleado(item.id) } } className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl">
                              <RiLogoutCircleRLine/> 
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
                </table>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

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
                  Asistencia
                </h3>
                <form onSubmit={handleSubmit} method="post">
                  

                  <select   onChange={handleChange}  name="id_tipo" id="id_tipo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option  value=""></option>
                    <option  value="1">Prueba</option>
                  </select>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Registrar
                </button>

                </form>
                
              </div>
            </div>
          </div>
        </div>
      )}
      {modalVisible1 && (
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
                onClick={closeModal1}
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
                  Salida
                </h3>
                <button
                  onClick={EmployeeExit}
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
    </div>
  );
};

export default Asistencia;
