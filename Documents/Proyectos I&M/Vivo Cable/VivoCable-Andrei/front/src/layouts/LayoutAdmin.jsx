import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import Cookies from 'universal-cookie';

const LayoutAdmin = () => {
    /* se declara la cooki y se manda a traer la informacion
    * si no existe la cookie  se redirige al login
    */
    const cookies= new Cookies();
    const navigation= useNavigate();
    useEffect(()=>{
        if(!cookies.get('auth')){
            navigation("/login");
        }
    },[navigation]);

    return (
        <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
            <Sidebar/>
            <div className="xl:col-span-5">
            <Header/>
            <div className="h-[90vh] overflow-y-scroll p-8">
            <Outlet/>
            </div>
            </div>
        </div>
    )
}

export default LayoutAdmin