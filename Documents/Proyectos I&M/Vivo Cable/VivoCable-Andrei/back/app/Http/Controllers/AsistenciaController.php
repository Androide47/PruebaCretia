<?php

namespace App\Http\Controllers;

use App\Http\Requests\asistencias\GuardarAsistenciasRequest;
use App\Http\Requests\asistencias\GuardarSalidaRequest;
use App\Models\Asistencia;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;


class AsistenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{

            $data=Asistencia::with('empleado','tipo')->get();
            if(!$data){
                return response()->json(['message'=>'Datos no encontrados'],404);
            }else{
                return response()->json(['data'=>$data],200);
            }

        }catch(Exception $e){
            return  response()->json(['message'=>'Ocurrio un error'.$e->getMessage() ],500);

        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     //funcion para registrar la entrada
    public function store(GuardarAsistenciasRequest $request)
    {
        try{

            $fecha_hoy= Carbon::today();
            $hora_entrada=Carbon::now();
            $asistencia=new Asistencia([
                'id_empleado'=>$request->input('id_empleado'),
                'id_tipo'=>$request->input('id_tipo'),
                'hora_entrada'=>$hora_entrada,
                'fecha_asistencia'=>$fecha_hoy
            ]);

            //se hace una consulta para ver si ya existe un registro con ese usuario en el mismo dia
            $validacion = Asistencia::where('id_empleado', $request->input('id_empleado'))
            ->whereDate('fecha_asistencia', Carbon::parse($fecha_hoy)->toDateString())
            ->exists();

            //se valida que si ya existe una hora de entrada en la fecha de hoy no se genere otro registro 
            if($validacion){
                return response()->json(['message'=>'Este usuario ya registro su entrada el día de hoy'],200);
            }else{

                if($asistencia->save()){
                    return response()->json(['message'=>'Asistencia registrada'],200);
                }else{
                    return response()->json(['message'=>'No se registro la asistencia',404]);
                }
            }



        }catch(Exception $e){
    
            return  response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()],500);
        }
    }


    //funcion para registrar la salida
    public function salida(GuardarSalidaRequest $request){

        try{
            $fecha_hoy= Carbon::today();
            $hora_salida= Carbon::now();
            $asistencia = Asistencia::where('id_empleado', $request->input('id_empleado'))
            ->whereDate('fecha_asistencia',$fecha_hoy)
            ->first();
            
            if($asistencia){
                
                
                $asistencia->hora_salida= $hora_salida;
                $horas_trabajadas= $hora_salida->diffInHours($asistencia->hora_entrada);
                $asistencia->horas_trabajadas= $horas_trabajadas;
                $asistencia->save();
                return response()->json(['message'=>'Hora de salida registrada'],200);
            }else{
                return response()->json(['message'=>'No ha pasado asistencia el día de hoy'],404);
            }

        }catch(Exception $e){
            return  response()->json(['message'=>'Ocurrio un error'.$e->getMessage()],500);
        }

    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
