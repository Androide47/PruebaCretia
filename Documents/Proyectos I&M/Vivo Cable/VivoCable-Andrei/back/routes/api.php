<?php

use App\Http\Controllers\API\AutomovilController;
use App\Http\Controllers\API\ClienteController;
use App\Http\Controllers\API\ContratoController;
use App\Http\Controllers\API\EmpleadoController;
use App\Http\Controllers\API\EstadoCuentaController;
use App\Http\Controllers\API\GastoController;
use App\Http\Controllers\API\PagoController;
use App\Http\Controllers\API\ProveedorController;
use App\Http\Controllers\API\RolController;
use App\Http\Controllers\API\TipoAsistenciaController;
use App\Http\Controllers\AsignacionAutoController;
use App\Http\Controllers\AsistenciaController;
use App\Http\Controllers\ServicioController;
use App\Models\AsignacionAuto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [EmpleadoController::class, 'login']);
//prueba
Route::get('prueba', [EmpleadoController::class, 'prueba']);


Route::get('asignacionAutos', [AsignacionAutoController::class, 'index']);
Route::get('asignacionAutos/{id}', [AsignacionAutoController::class, 'show']);
Route::post('asignacionAutos', [AsignacionAutoController::class, 'store']);
Route::put('asignacionAutos/{id}', [AsignacionAutoController::class, 'update']);
Route::delete('asignacionAutos/{id}', [AsignacionAutoController::class, 'destroy']);
//rutas protegidas
Route::group(['middleware' => ['auth:sanctum']], function () {
    //cerrar sesion
    Route::get('logout', [EmpleadoController::class, 'logout']);

    //rutas para  el controlador roles
    Route::get('roles', [RolController::class, 'index']);
    Route::post('roles', [RolController::class, 'store']);
    Route::get('roles/{rol}', [RolController::class, 'show']);
    Route::put('roles/{rol}', [RolController::class, 'update']);
    Route::delete('roles/{rol}', [RolController::class, 'destroy']);

    //rutas para el controlador  empleados
   
    
    Route::get('empleados', [EmpleadoController::class, 'index']);
    Route::post('empleados', [EmpleadoController::class, 'store']);
    Route::get('empleados/{empleado}', [EmpleadoController::class, 'show']);
    Route::post('empleadoActualizar/{id}', [EmpleadoController::class, 'update']);
    Route::patch('passwordActualizar/{id}', [EmpleadoController::class, 'passwordUpdate']);
    Route::delete('empleados/{id}', [EmpleadoController::class, 'destroy']);

    //rutas para el controlador tipo asistencias
    Route::post('tipoAsistencia', [TipoAsistenciaController::class, 'store']);
    Route::get('tipoAsistencia', [TipoAsistenciaController::class, 'index']);
    Route::get('tipoAsistencia/{id}', [TipoAsistenciaController::class, 'show']);
    Route::patch('tipoAsistencia/{id}', [TipoAsistenciaController::class, 'update']);
    Route::delete('tipoAsistencia/{id}', [TipoAsistenciaController::class, 'destroy']);

    //rutas para el controllador de asistencias
    Route::get('asistencias', [AsistenciaController::class, 'index']);
    Route::post('asistencias', [AsistenciaController::class, 'store']);
    Route::patch('asistencias', [AsistenciaController::class, 'salida']);

    //rutas para servicios
    Route::get('servicios', [ServicioController::class, 'index']);
    Route::get('servicios/{id}', [ServicioController::class, 'show']);
    Route::post('servicios', [ServicioController::class, 'store']);
    Route::delete('servicios/{id}', [ServicioController::class, 'destroy']);
    Route::post('servicios/{id}', [ServicioController::class, 'update']);

    //rutas para clientes   
    Route::get('clientes', [ClienteController::class, 'index']);
    Route::post('clientes', [ClienteController::class, 'store']);
    Route::get('clientes/{id}', [ClienteController::class, 'show']);
    Route::post('clientes/{id}', [ClienteController::class, 'update']);
    Route::delete('clientes/{id}', [ClienteController::class, 'destroy']);

    //rutas para contratos
    Route::get('contratos', [ContratoController::class, 'index']);
    Route::get('contratos/{id}', [ContratoController::class, 'show']);
    Route::post('contratos', [ContratoController::class, 'store']);

    //rutas para estado de cuenta
    Route::get('estados_cuenta', [EstadoCuentaController::class, 'index']);
    Route::get('estados_cuenta/{id}', [EstadoCuentaController::class, 'show']);

    //rutas para pagos
    Route::get('pagos', [PagoController::class, 'index']);
    Route::get('pagos/{id}', [PagoController::class, 'show']);
    Route::post('pagos', [PagoController::class, 'store']);

    //rutas de gastos
    Route::get('gastos', [GastoController::class, 'index']);
    Route::get('gastos/{id}', [GastoController::class, 'show']);
    Route::post('gastos', [GastoController::class, 'store']);
    Route::put('gastos/{id}', [GastoController::class, 'update']);
    Route::delete('gastos/{id}', [GastoController::class, 'destroy']);

    //rutas para proveedores    
    Route::get('proveedores', [ProveedorController::class, 'index']);
    Route::get('proveedores/{id}', [ProveedorController::class, 'show']);
    Route::post('proveedores', [ProveedorController::class, 'store']);
    Route::put('proveedores/{id}', [ProveedorController::class, 'update']);
    Route::delete('proveedores/{id}', [ProveedorController::class, 'destroy']);

    //rutas para automoviles
    Route::get('automoviles', [AutomovilController::class, 'index']);
    Route::get('automoviles/{id}', [AutomovilController::class, 'show']);
    Route::post('automoviles', [AutomovilController::class, 'store']);
    Route::put('automoviles/{id}', [AutomovilController::class, 'update']);
    Route::delete('automoviles/{id}', [AutomovilController::class, 'destroy']);
});