import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  RiDraftFill,
  RiCoinsFill,
  RiMailSendLine,
  RiArrowDownCircleLine,
} from "react-icons/ri";
import { Tab } from "@headlessui/react";
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from "universal-cookie";
import jsPDF from 'jspdf';
import emailjs from 'emailjs-com';


const Caja = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [esEfectivo, setEsEfectivo] = useState(false);
  const [step, setStep] = useState(1);
  // Estado para controlar si se debe imprimir el comprobante
  const [debeImprimirComprobante, setDebeImprimirComprobante] = useState(false);


  const [relacionado, setRelacionado] = useState({
    cliente: {
      nombre: "",
      apellido: "",
      // Otros campos relevantes para el cliente
    },
    estadoCuenta: {
      id: null,
      monto_pago: 0,
      // Otros campos relevantes para el estado de cuenta
    },
    // Cualquier otro campo relevante
  });





  // Se extrae el token de la cookie
  const cookies = new Cookies();
  const token = cookies.get('auth');

  // URLs de la nueva API de contratos y estados de cuenta
  const contratosUrl = 'http://127.0.0.1:8000/api/contratos';
  const estadosCuentaUrl = 'http://127.0.0.1:8000/api/estados_cuenta';

  // Se declara el hook para mostrar los datos
  const [dataRelacionados, setDataRelacionados] = useState({});

  // Declarar la autorización del token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Traer los datos de contratos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contratosResponse = await axios.get(contratosUrl, { headers });
        const contratosData = contratosResponse.data; // Ajusta esto según la estructura de tus datos

        // Traer los datos de estados de cuenta
        const estadosCuentaResponse = await axios.get(estadosCuentaUrl, { headers });
        const estadosCuentaData = estadosCuentaResponse.data; // Ajusta esto según la estructura de tus datos

        const datosRelacionados = {};

        for (const estadoCuenta of estadosCuentaData.data) {
          const contratoId = estadoCuenta.id_contrato;
          const contrato = contratosData.data.find((c) => c.id === contratoId);

          if (contrato) {
            const cliente = contrato.cliente;
            const servicio = contrato.servicio;

            datosRelacionados[contratoId] = {
              estadoCuenta,
              cliente,
              servicio,
            };
          }
        }

        // Almacena los datos relacionados en el estado local
        setDataRelacionados(datosRelacionados);

        console.log(datosRelacionados);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const [clienteData, setClienteData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    telefono: '',
    correo: '',
    fecha_registro: '',
    ine: '',
    calle: '',
    num_ext: '',
    num_int: '',
    colonia: '',
    cp: '',
    municipio: '',
    estado: '',
    comprobante_domicilio: '',
    rfc: '',
  });
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setStep(1);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const [datosModalPago, setDatosModalPago] = useState(null);
  const toggleModal1 = (datos) => {
    setDatosModalPago(datos); // Establece los datos para el modal
    setModalVisible1(!modalVisible1);
  };
  const closeModal1 = () => {
    setModalVisible1(false);
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleChange = (event) => {
    setClienteData({
      ...clienteData,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit = async () => {
    const formData = new FormData();

    for (const key in clienteData) {
      formData.append(key, clienteData[key]);
    }

    try {
      const response = await axios.post(`${apiUrl}clientes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Swal.fire('¡Éxito!', 'Cliente creado con éxito', 'success');
        closeModal();
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Hubo un error al crear el cliente', 'error');
    }
  };
  const downloadInvoice = (estadoCuentaId) => {
    console.log('ID del estado de cuenta que se va a descargar:', estadoCuentaId);

    if (!estadoCuentaId) {
      console.error('ID de estado de cuenta no válido');
      return;
    }

    axios.get(`http://127.0.0.1:8000/api/estados_cuenta/${estadoCuentaId}`, { headers })
      .then((response) => {
        const estadoCuentaData = response.data.data;
        const doc = new jsPDF();
        doc.text('Estado de Cuenta', 10, 10);
        doc.text(`Estado de Cuenta ID: ${estadoCuentaData.id}`, 10, 20);
        // Más texto y datos...

        const pdfDataUri = doc.output('datauristring');

        // Crear un contenedor para el iframe
        const iframeContainer = document.createElement('div');
        iframeContainer.style.position = 'fixed';
        iframeContainer.style.top = '0';
        iframeContainer.style.left = '0';
        iframeContainer.style.width = '100%';
        iframeContainer.style.height = '100%';
        iframeContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        iframeContainer.style.display = 'flex';
        iframeContainer.style.justifyContent = 'center';
        iframeContainer.style.alignItems = 'center';
        iframeContainer.style.zIndex = '1000';

        // Crear el iframe
        const iframe = document.createElement('iframe');
        iframe.style.width = '70%'; // Ajusta esto según tus preferencias
        iframe.style.height = '80vh'; // Ajusta esto según tus preferencias
        iframe.src = pdfDataUri;

        // Eliminar el contenedor existente si ya hay uno
        const existingContainer = document.getElementById('pdfIframeContainer');
        if (existingContainer) {
          document.body.removeChild(existingContainer);
        }

        // Función para cerrar el iframe cuando se hace clic fuera
        const closeIframeOnClickOutside = (event) => {
          if (event.target === iframeContainer) {
            document.body.removeChild(iframeContainer);
          }
        };

        // Agregar detector de eventos al contenedor del iframe
        iframeContainer.addEventListener('click', closeIframeOnClickOutside);

        // Asignar ID y agregar el iframe al contenedor
        iframeContainer.id = 'pdfIframeContainer';
        iframeContainer.appendChild(iframe);

        // Agregar el contenedor al cuerpo del documento
        document.body.appendChild(iframeContainer);

      })
      .catch((error) => {
        console.error('Error al descargar el estado de cuenta', error);
      });
  };

  const [metodoPago, setMetodoPago] = useState(null);
  const [cantidadEfectivo, setCantidadEfectivo] = useState(0);
  const [cambio, setCambio] = useState(0);


  const calcularCambio = () => {
    const cantidadIngresada = parseFloat(document.getElementById('cantidad').value) || 0;
    const montoAPagar = parseFloat(datosModalPago.estadoCuenta.monto_pago) || 0;
    const cambioCalculado = cantidadIngresada - montoAPagar;

    // Actualiza el estado de cambio
    setCambio(cambioCalculado > 0 ? cambioCalculado : 0);
    setCantidadEfectivo(cantidadIngresada);

    // Actualiza el valor del input de cambio directamente
    document.getElementById('cambio').value = cambioCalculado > 0 ? cambioCalculado.toFixed(2) : '0.00';
  };



  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/pagos', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // Suponiendo que guardas tus datos en un estado llamado 'datos'
      setDatos(response.data);
    } catch (error) { 
      console.error('Error al cargar los datos', error);
    }
  };
  
  const handlePagoSubmit  = async (e) => {
    e.preventDefault(); 

  
    if (!esRegistroHabilitado()) {
      console.error('Método de pago no válido o cantidad insuficiente');
      return;
    }

    const montoPagado = datosModalPago.estadoCuenta.monto_pago; // Monto a pagar
    const estadoCuentaId = datosModalPago.estadoCuenta.id; // ID del estado de cuenta

    const datosPago = {
      id_estado_cuenta: estadoCuentaId,
      monto: montoPagado
    };

    try {
      // Asegúrate de que relacionado contiene los datos necesarios
    if (!relacionado || !relacionado.cliente || !relacionado.estadoCuenta) {
      console.error('Datos relacionados no están disponibles');
      return;
    }

    // Usa relacionado para obtener los datos necesarios
    const montoPagado = relacionado.estadoCuenta.monto_pago;
    const estadoCuentaId = relacionado.estadoCuenta.id;

      const response = await axios.post('http://127.0.0.1:8000/api/pagos', datosPago, { headers });
      setDatosPago({
        ...datosPago,
        montoPagado: response.data.montoPagado 
      });
      setModalVisible1(false);
      fetchData();
      console.log('Pago registrado:', response.data);

      const datosComprobante = {
        cliente: relacionado.cliente,
        datosPago: { montoPagado: datosModalPago.estadoCuenta.monto_pago },
        estadoCuenta: { id: relacionado.estadoCuenta.id },
        
      };
      setDatosSeleccionados(datosComprobante);
      imprimirComprobante();

    } catch (error) {
      console.error('Error al registrar el pago:', error);
      
    }
  };


  const handleSeleccionTDC = () => {
    setMetodoPago('TDC');
  };

  const handleSeleccionEfectivo = () => {
    setEsEfectivo(prevState => !prevState); // Cambia el estado basado en el estado anterior
    setMetodoPago('Efectivo');
  };

  const esRegistroHabilitado = () => {
    if (metodoPago === 'Efectivo') {
      return cantidadEfectivo >= datosModalPago.estadoCuenta.monto_pago;
    }
    return metodoPago !== null;
  };



  const imprimirComprobante = () => {
    const comprobanteElement = document.getElementById('comprobantePago');
    comprobanteElement.style.display = 'block';

    window.print();

    comprobanteElement.style.display = 'none';
  };


  const ComprobantePago = ({ datosPago, cliente, estadoCuenta }) => {
    // Asegurarse de que todos los datos necesarios estén presentes
    if (!datosPago || !cliente || !estadoCuenta) {
      return null;
    }

    // Calcula el cambio si es necesario
    const cambio = (datosPago.cantidadEfectivo && datosPago.montoPagado)
      ? datosPago.cantidadEfectivo - datosPago.montoPagado
      : 0;

    const fechaActual = new Date().toLocaleString(); // Obtiene la fecha y hora actual

    return (
      <div id="comprobantePago" style={{ fontSize: '12px', width: '80mm', padding: '10mm' }}>
        <h2>Comprobante de Pago</h2>
        <p>Fecha: {fechaActual}</p>
        <p>Nombre del Cliente: {cliente.nombre} {cliente.apellido_paterno} {cliente.apellido_materno}</p>
        <p>ID de Transacción: {estadoCuenta.id}</p>
        {/* Añadir más detalles de la transacción si es necesario */}
        <p>Monto Total: ${estadoCuenta.monto_pago}</p>
        <p>Método de Pago: {/* Método de pago aquí */}</p>
        <p>Monto Pagado: ${datosPago.montoPagado}</p>
        <p>Cambio: ${datosPago.cambio.toFixed(2)}</p>
        {/* Información de la empresa aquí */}
        {/* Mensaje de agradecimiento */}
      </div>
    );
  };







  useEffect(() => {
    if (debeImprimirComprobante) {
      imprimirComprobante();
      setDebeImprimirComprobante(false);
    }

    fetchData();
  }, [debeImprimirComprobante]);





  return (

    <div>
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10">
        <div>
          <h1 className="font-bold text-gray-100 text-xl">Sistema Caja</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Sistema Caja</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleModal}
            data-modal-target="popup-modal"
            className="bg-primary/90 text-black hover:bg-primary flex items-center gap-4 py-2 
                        px-4 rounded-lg transition-colors"
          >
            <RiDraftFill /> Crear
          </button>
        </div>
      </div>
      {/* Content  */}
      <div className="bg-secondary-100 p-8 rounded-tl-lg rounded-tr-lg grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="p-8">
          <h1 className="text-3xl mb-8">Busqueda</h1>
          <form>
            <div className="relative grid gap-6 mb-6 md:grid-cols-2">
              <input
                type="number"
                className="bg-secondary-900 outline-none py-2 pr-4 pl-10 rounded-lg
                                placeholder:text-gray-500 w-full"
                placeholder="No° Contrato"
              />
              <input
                type="text"
                className="bg-secondary-900 outline-none py-2 pr-4 pl-10 rounded-lg
                                placeholder:text-gray-500 w-full"
                placeholder="Nombre Cliente"
              />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
        {/* Image  */}
        <div className="flex justify-center">
          <img
            src="portada.svg"
            alt="Portada"
            className="w-72 h-72 object-cover"
          />
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
                        No° Contrato
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Cliente
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Pago
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(dataRelacionados).length > 0 ? (
                      Object.keys(dataRelacionados).map((contratoId) => {
                        const relacionado = dataRelacionados[contratoId];
                        return (
                          <tr
                            key={contratoId}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {contratoId}
                            </td>
                            <td className="px-6 py-4">
                              {relacionado.cliente.nombre} {relacionado.cliente.apellido_paterno} {relacionado.cliente.apellido_materno}
                            </td>
                            <td className="px-6 py-4">${relacionado.estadoCuenta.monto_pago}</td>
                            <td className="px-6 py-4 flex gap-4">

                              <button
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl"
                                onClick={() => toggleModal1(relacionado)}
                              >
                                <RiCoinsFill />
                              </button>

                              <button
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl"
                                onClick={() => {
                                  const estadoCuentaId = relacionado.estadoCuenta.id;
                                  if (estadoCuentaId) {
                                    downloadInvoice(estadoCuentaId);
                                  } else {
                                    console.error('ID de estado de cuenta no válido');
                                  }
                                }}
                              >
                                <RiArrowDownCircleLine />
                              </button>

                              <button
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-2xl"
                                onClick={() => {
                                  const estadoCuentaId = relacionado.estadoCuenta.id;
                                  const clienteEmail = relacionado.cliente.correo; // Reemplaza esto con la forma de obtener el correo del cliente
                                  if (estadoCuentaId && clienteEmail) {
                                    downloadInvoice(estadoCuentaId, (pdfDataUri) => {
                                      sendEmailInvoice(estadoCuentaId, clienteEmail, pdfDataUri);
                                    });
                                  } else {
                                    console.error('ID de estado de cuenta o correo de cliente no válido');
                                  }
                                }}
                              >
                                <RiMailSendLine />
                              </button>


                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4">No hay datos de clientes para mostrar</td>
                      </tr>
                    )}
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
                  Caja
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
                <li className={`flex flex-col items-center ${step === 1 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500'}`}>
                  <div className={`flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 ${step === 1 ? 'dark:bg-blue-800' : 'dark:bg-gray-700'}`}>
                    <svg
                      className={`w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 ${step === 1 ? 'dark:text-blue-300' : 'dark:text-gray-100'}`}
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
                  <span className="mt-2">Cliente</span>
                </li>
                <li className={`flex flex-col items-center ${step === 2 ? 'text-gray-500' : 'text-gray-500'}`}>
                  <div className={`flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 ${step === 2 ? 'dark:bg-gray-700' : 'dark:bg-gray-700'}`}>
                    <svg
                      className={`w-4 h-4 ${step === 2 ? 'dark:text-gray-100' : 'dark:text-gray-100'}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                    </svg>
                  </div>
                  <span className="mt-2">Dirección</span>
                </li>
                <li className={`flex flex-col items-center ${step === 3 ? 'text-gray-500' : 'text-gray-500'}`}>
                  <div className={`flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 ${step === 3 ? 'dark:bg-gray-700' : 'dark:bg-gray-700'}`}>
                    <svg
                      className={`w-4 h-4 ${step === 3 ? 'dark:text-gray-100' : 'dark:text-gray-100'}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                    </svg>
                  </div>
                  <span className="mt-2">Servicios</span>
                </li>
              </ol>

              <div className="p-4">
                {step === 1 && (
                  <form>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <input type="text" id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre" required />
                      </div>
                      <div>
                        <label htmlFor="ApellidoPaterno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido Paterno</label>
                        <input type="text" id="ApellidoPaterno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Apellido Paterno" required />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label htmlFor="ApellidoMaterno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido Materno</label>
                        <input type="text" id="ApellidoMaterno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Apellido Materno" required />
                      </div>
                      <div>
                        <label htmlFor="Telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
                        <input type="tel" id="Telefono" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Telefono" required />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label htmlFor="Correo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                        <input type="email" id="Correo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Correo" required />
                      </div>
                      <div>
                        <label htmlFor="FechaRegistro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Registro</label>
                        <input type="date" id="FechaRegistro" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Fecha Registro" required />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label htmlFor="INE" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">INE</label>
                        <input type="file" id="INE" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="INE" required />
                      </div>
                      <div>
                        <label htmlFor="RFC" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RFC</label>
                        <input type="text" id="RFC" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="RFC" required />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <button type="button" onClick={nextStep} className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                      Siguiente
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label htmlFor="calle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calle</label>
                        <input type="text" id="calle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Calle" required />
                      </div>
                      <div>
                        <label htmlFor="NumExterior" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Num Exterior</label>
                        <input type="number" id="NumInterior" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="NumExterior" required />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label htmlFor="NumExterior" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Num Interior</label>
                        <input type="number" id="NumExterior" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="NumInterior" required />
                      </div>
                      <div>
                        <label htmlFor="Colonia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Colonia</label>
                        <input type="text" id="Colonia" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Colonia" required />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label htmlFor="CP" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CP</label>
                        <input type="number" id="CP" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CP" required />
                      </div>
                      <div>
                        <label htmlFor="Municipio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Municipio</label>
                        <input type="text" id="Municipio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Municipio" required />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div>
                        <label htmlFor="Estado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                        <input type="text" id="Estado" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Estado" required />
                      </div>
                      <div>
                        <label htmlFor="Comprobante" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comprobante</label>
                        <input type="file" id="Comprobante" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Comprobante" required />
                      </div>
                      {/* Agrega los campos para Step 1 aquí */}
                    </div>
                    <div className="flex space-x-2">
                      <button type="button" onClick={prevStep} className="bg-gray-300 text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
                        Anterior
                      </button>
                      <button type="button" onClick={nextStep} className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                        Siguiente
                      </button>
                    </div>

                  </form>
                )}

                {step === 3 && (
                  <form>
                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Administrador">Servicios</option>
                        <option value="Cajero">TV</option>
                        <option value="Tecnico">Internet</option>
                      </select>
                      {/* Agrega los campos para Step 3 aquí */}
                    </div>
                    <div className="flex space-x-2">
                      <button type="button" onClick={prevStep} className="bg-gray-300 text-gray-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:text-white dark:hover-bg-gray-500">
                        Anterior
                      </button>
                      <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700">
                        Crear
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


      {modalVisible1 && datosModalPago && (
        <div
          id="extralarge-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full "
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600 mb-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                  Registrar Pago
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
              <form className="mx-4" onSubmit={handlePagoSubmit}>

                <div className="grid gap-6 mb-6 md:grid-cols-1">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No°
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Cliente
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Pago
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {datosModalPago.estadoCuenta.id}
                        </td>
                        <td className="px-6 py-4">{datosModalPago.cliente.nombre} {datosModalPago.cliente.apellido_paterno} {datosModalPago.cliente.apellido_materno}</td>
                        <td className="px-6 py-4">${datosModalPago.estadoCuenta.monto_pago}</td>
                      </tr>
                      {/* Rest of the table rows go here */}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center items-center gap-6 mb-6">
                  <button type="button" onClick={handleSeleccionTDC} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">T D C</button>
                  <button type="button" onClick={handleSeleccionEfectivo} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Efectivo</button>

                </div>
                {esEfectivo && (
                  <div>
                    <div className="mb-4">
                      <label htmlFor="cantidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ingresar cantidad:</label>
                      <input
                        type="number"
                        id="cantidad"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        onChange={calcularCambio}
                      />

                    </div>
                    <div className="mb-4">
                      <label htmlFor="cambio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cambio:</label>
                      <input type="text" id="cambio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readOnly />
                    </div>
                  </div>
                )}


                <button
                  type="submit"
                  disabled={!esRegistroHabilitado()}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-6"
                >
                  Registrar
                </button>

                {/* Comprobante de Pago - Visible temporalmente para pruebas */}
                <div style={{ display: 'block' }}>
                  <ComprobantePago
                    datosPago={{ montoPagado: cantidadEfectivo, cantidadEfectivo: cantidadEfectivo, cambio: cambio }}
                    cliente={datosModalPago.cliente}
                    estadoCuenta={datosModalPago.estadoCuenta}
                  />

                </div>


              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Caja;
