import React from "react";
import { RiNotification3Line, RiArrowDownSLine, RiSettings3Line, RiLogoutCircleLine, RiThumbUpLine, RiChat1Fill } from 'react-icons/ri';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from "universal-cookie";

const Header = () => { 
    //extraer el token de la cookie
    const url='http://127.0.0.1:8000/api/logout';
    const cookies =new Cookies();
    const navigation=  useNavigate();
    const  token = cookies.get('auth');
    //declarar la autorización del token 
    const headers={
    Authorization: `Bearer ${token}`
  };
  //funcion para   cerrar sesion
   const logOut= async (event)=>{
        event.preventDefault();
        const response= await axios.get(url,{headers});
        if(response.status === 200){
            cookies.remove('auth');
            navigation('/Login');
        }

    }

    return (
        <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-cenhter
        justify-end">
            <nav className="flex items-center gap-2">
                <Menu menuButton={ 
                    <MenuButton className="relative hover:bg-secondary-100 p-2 rounded-lg transition-colors"> 
                    <RiNotification3Line/>
                    <span className="absolute -top-0.5 right-0 bg-primary py-0.5 px-[5px] box-content 
                    text-black rounded-full text-[8px] font-bold">2</span>
                </MenuButton>
                } 
                align="end"
                arrow
                transition 
                arrowClassName="bg-secondary-100 m-20"
                menuClassName="bg-secondary-100 p-8">

                    <h1 className="text-gray-300 text-center font-medium">Notificaciones (2)</h1>
                    <hr className="my-6 border-gray-500"/>
                    <MenuItem className="p-0 hover:bg-transparent">
                        <Link to="/" className="text-gray-300 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 
                        transition-colors rounded-lg">
                            <img src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=740&t=st=1695714880~exp=1695715480~hmac=c8b614cfeb459700a7bca30cbad9d51d8b69dc7179822c3e12048ff8ce4f9cf4"
                            className="w-8 h-8 object-cover rounded-full"/>
                            <div className="text-sm flex flex-col">
                                <div className="flex items-center justify-between gap-4">
                                    <span>Daniel Izazaga</span> 
                                    <span className="text-[8px]">21/10/2023</span>
                                </div>
                                <p className="text-gray-500 text-xs">
                                    Lorem ipsun dolor sit amet...
                                </p>
                            </div>
                        </Link>
                    </MenuItem>
                    <MenuItem className="p-0 hover:bg-transparent">
                        <Link to="/" className="text-gray-300 flex items-center gap-4 py-2 px-4 hover:bg-secondary-900 
                        transition-colors rounded-lg">
                            <RiThumbUpLine className="p-2 bg-blue-200 text-blue-700 box-content rounded-full "/>
                            <div className="text-sm flex flex-col">
                                <div className="flex items-center justify-between gap-4">
                                    <span>Nuevo Like</span> 
                                    <span className="text-[8px]">21/10/2023</span>
                                </div>
                                <p className="text-gray-500 text-xs">A Daniel Izazaga le gusta tu pub...</p>
                            </div>
                        </Link>
                    </MenuItem>
                    <MenuItem className="p-0 hover:bg-transparent">
                        <Link to="/" className="text-gray-300 flex items-center gap-4 py-2 px-4 hover:bg-secondary-900 
                        transition-colors rounded-lg">
                            <RiChat1Fill className="p-2 bg-yellow-200 text-yellow-700 box-content rounded-full "/>
                            <div className="text-sm flex flex-col">
                                <div className="flex items-center justify-between gap-4">
                                    <span>Nuevo Comentario</span> 
                                    <span className="text-[8px]">21/10/2023</span>
                                </div>
                                <p className="text-gray-500 text-xs">A Daniel Izazaga le gusta tu pub...</p>
                            </div>
                        </Link>
                    </MenuItem>
                    <hr className="my-4 border-gray-500"></hr>
                    <MenuItem className="p-0 hover:bg-transparent flex justify-center cursor-default">
                        <Link to="/" className="text-gray-500 text-sm hover:text-white transition-colors">Todas las Notificaciones</Link>
                    </MenuItem>
                </Menu>
                <Menu menuButton={<MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors"> 
                    <img src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=740&t=st=1695714880~exp=1695715480~hmac=c8b614cfeb459700a7bca30cbad9d51d8b69dc7179822c3e12048ff8ce4f9cf4" 
                    className="w-6 h-6 object-cover rounded-full"/>
                    <span>Daniel Izazaga</span>
                    <RiArrowDownSLine/>
                </MenuButton>
                } 
                align="end"
                transition 
                arrow
                arrowClassName="bg-secondary-100"
                menuClassName="bg-secondary-100 p-4"
                >
                    <MenuItem className="p-0 hover:bg-transparent">
                        <Link to="/perfil" className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex 
                        items-center gap-x-4 py-2 px-6 flex-1">
                            <img src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=740&t=st=1695714880~exp=1695715480~hmac=c8b614cfeb459700a7bca30cbad9d51d8b69dc7179822c3e12048ff8ce4f9cf4" 
                            className="w-8 h-8 object-cover rounded-full"/>
                            <div className="flex flex-col text-sm">
                                <span className="text-sm">Daniel Izazaga</span>
                                <span className="text-xs text-gray-500">Dizazagamtz@gmail.com</span>
                            </div>
                        </Link>
                    </MenuItem>
                    <hr className="my-4 border-gray-500"/>
                    <MenuItem className="p-0 hover:bg-transparent">
                        <Link to="/configuracion" className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex 
                        items-center gap-x-4 py-2 px-6 flex-1">
                            <RiSettings3Line/> Configuracion
                        </Link>
                    </MenuItem>
                    <MenuItem className="p-0 hover:bg-transparent">
                        <Link  onClick={logOut}  className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex 
                        items-center gap-x-4 py-2 px-6 flex-1">
                            <RiLogoutCircleLine /> Cerrar Sesion
                        </Link>
                    </MenuItem>
                </Menu>
            </nav>
        </header>
    )
}

export default Header