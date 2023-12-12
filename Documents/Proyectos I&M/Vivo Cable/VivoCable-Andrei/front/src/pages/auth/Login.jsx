import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {RiMailFill, RiLockFill, RiEyeFill, RiEyeOffFill, RiCollageLine,} from "react-icons/ri";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const url='http://127.0.0.1:8000/api/login';
  const cookies = new Cookies();
  const navigation=  useNavigate();
  //se declara el hook para las variables del formulario
  const[formData,setFormData]=useState({
    correo_electronico:'',
    password:''
  });
  //se cambia la variable segun el valor
  const handleChange=(event)=>{
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    });
  };

  //arroja los resultados despues de enviar los datos desde el formulario
  const handleSubmit=async(event)=>{
    event.preventDefault();
    //se extraen los valores del formulario
    const {correo_electronico,password}=formData;

    try{
      //se hace la peticion para el inicio de sesion 
      const response=await axios.post(url,{
        correo_electronico,
        password
      });

      if(response.status === 200){
        const token=response.data.token;
        cookies.set('auth',token,{path:'/'});
        //redirige al  home
        navigation('/');
      }else{
        Swal.fire({
          position: 'top-end',
          title: 'Error!',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Continuar'
        });
      }
      

    }catch(error){
      const messageError = error.response?.data?.message || 'Error desconocido';
      //const messageError = error.response.data.message;
      Swal.fire({
        position: 'top-end',
        title: 'Error!',
        text: messageError,
        icon: 'error',
        confirmButtonText: 'Continuar'
      });
    }
  };

  //valida que existe la cooki de auth para redirigirnos al home
  useEffect(()=>{
    if(cookies.get('auth')){
       navigation("/");
       
    }
   },[cookies,navigation]);





  const backgroundStyle = {
    backgroundImage: `url('https://img.freepik.com/foto-gratis/hombre-viendo-su-pelicula-favorita-television_23-2149047399.jpg?w=1060&t=st=1696106459~exp=1696107059~hmac=d5c18a7242ec97b185a4a78bca39e0e24ba812767f5e69d70f403d00f2a00b3f')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Asegura que el fondo cubra toda la altura de la pantalla
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

  return (
    <div style={backgroundStyle} className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-secondary-100 p-8 rounded-xl shadow-xl w-auto lg:w-[450px]">
      <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
        Iniciar Sesión
      </h1>
      <form className="mb-8"  onSubmit={handleSubmit} method="post" >
        <div className="relative mb-4">
          <RiMailFill className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
          onChange={handleChange}
            type="email"
            className="py-3 pl-8 pr-4 bg-seconday-900 w-full outline-none rounded-lg"
            placeholder="Correo Electronico"
            name="correo_electronico"
          ></input>
        </div>
        <div className="relative mb-4">
          <RiLockFill className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            className="py-3 px-8 bg-seconday-900 w-full outline-none rounded-lg"
            placeholder="Contraseña"
            name="password"
          ></input>
          {showPassword ? (
            <RiEyeOffFill
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"
            />
          ) : (
            <RiEyeFill
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"
            />
          )}
        </div>
        <div>
            <button type="submit" className="bg-secondary-900 w-full py-3 px-4 rounded-lg hover:text-gray-100 
            transition-color">Ingresar</button>
        </div>
      </form>
      <div className="felx flex-col items-center gap-4 text-gray-100">
        <Link to="/Olvide-password" className="hover:text-primary/50 transition-colors">
            ¿Olvidaste tu Contraseña?
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Login;