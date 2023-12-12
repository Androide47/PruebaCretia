import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
    const backgroundStyle = {
        backgroundImage: `url('https://www.merca2.es/wp-content/uploads/2017/07/netflix_foto.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Asegura que el fondo cubra toda la altura de la pantalla
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={backgroundStyle}>
            <Outlet/>
        </div>
    )
}

export default LayoutAuth;
