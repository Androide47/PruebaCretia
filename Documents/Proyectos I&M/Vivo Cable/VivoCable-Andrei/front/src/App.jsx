import {BrowserRouter, Routes, Route} from 'react-router-dom';

//Layout
import LayoutAdmin from './layouts/LayoutAdmin';
import LayoutAuth from './layouts/LayoutAuth';

// Pages auth
import Login from './pages/auth/login';
import ForgetPassword from './pages/auth/ForgetPassword';
import AsistenciaTecnico from './pages/auth/AsistenciaTecnico';
import AsistenciaCajero from './pages/auth/AsistenciaCajero';

// Pages Admin
import Home from './pages/admin/Home';
import Perfil from './pages/admin/Perfil';
import Caja from './pages/admin/Caja';
import Asistencia from './pages/admin/Asistencia';
import Empleado from './pages/admin/Empleado';
import Servicios from './pages/admin/Servicios';
import Clientes from './pages/admin/Clientes';
import Finanzas from './pages/admin/Finanzas';
import Inventario from './pages/admin/Inventario';
import Autos from './pages/admin/Autos';
import Roles from './pages/admin/Roles';
import Potenciales from './pages/admin/Potenciales';
import Tickets from './pages/admin/Tickets';

//Pages Cajero

//Pages Tecnico

import Error404 from './pages/Error404';
import Provedores from './pages/admin/Provedores';

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Olvide-password' element={<ForgetPassword />}></Route>
        <Route path='/AsistenciaTecnico' element={<AsistenciaTecnico />}></Route>
        <Route path='/AsistenciaCajero' element={<AsistenciaCajero />}></Route>

        <Route path='/' element={<LayoutAdmin />}>
          <Route index element ={<Home />}></Route>
          <Route path='Perfil' element ={<Perfil />}></Route>
          <Route path='Caja' element ={<Caja />}></Route>
          <Route path='Asistencia' element ={<Asistencia />}></Route>
          <Route path='Empleado' element ={<Empleado />}></Route>
          <Route path='Servicios' element ={<Servicios />}></Route>
          <Route path='Clientes' element ={<Clientes />}></Route>
          <Route path='Provedores' element ={<Provedores />}></Route>
          <Route path='Finanzas' element ={<Finanzas/>}></Route>
          <Route path='Inventario' element ={<Inventario />}></Route>
          <Route path='Autos' element ={<Autos />}></Route>
          <Route path='Roles' element ={<Roles />}></Route>
          <Route path='Potenciales' element ={<Potenciales />}></Route>
          <Route path='Tickets' element ={<Tickets />}></Route>
        </Route>
        <Route path='*' element={<Error404 />}></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
