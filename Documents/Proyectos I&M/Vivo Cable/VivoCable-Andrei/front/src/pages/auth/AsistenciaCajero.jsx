import React from "react";

const AsistenciaCajero = () => {

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
      Registra Tu Entrada
      </h1>
      <form className="mb-8">
        <div>
            <button type="submit" className="bg-secondary-900 w-full py-3 px-4 rounded-lg hover:text-gray-100 
            transition-color">Registrar</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AsistenciaCajero;