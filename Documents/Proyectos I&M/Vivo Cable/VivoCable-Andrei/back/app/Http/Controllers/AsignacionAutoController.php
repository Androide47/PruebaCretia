<?php

namespace App\Http\Controllers;

use App\Http\Requests\asignacionAutos\GuardarAsignacionesRequest;
use App\Models\AsignacionAuto;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class AsignacionAutoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       try {
       
        if(AsignacionAuto::exists()){
            $data=AsignacionAuto::with('empleados','autos')->get();
            return response()->json(['data'=>$data],200);
        }else{
            return response()->json(['message'=>'No se encuentran datos'],404);
        }

       } catch (Exception $e) {
        return response()->json(['message'=>'Ocurrio un error '.$e->getMessage()],500);
       }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GuardarAsignacionesRequest $request)
    {
        try {
            $asignacion= new AsignacionAuto([
                "id_empleado"=>$request->input('id_empleado') ,
                "id_automovil"=>$request->input('id_automovil') ,
                "fecha_asignacion"=>Carbon::parse($request->get('fecha_asignacion'))->format('Y-m-d'),
                "observaciones"=>$request->input('observaciones') 
            ]);

            if($asignacion->save()){
                return response()->json(['message'=>'Datos guardados'],200);
            }else{
                return response()->json(['message'=>'No se  guardaron datos'],404);
            }

        } catch (Exception $e) {
            return response()->json(['message'=>'Ocurrio un error '.$e->getMessage()],500);
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
        try {
            $data=AsignacionAuto::with('empleados','autos')->find($id);
            if(!$data){
                return response()->json(['message'=>'No se encuentran datos'],404);
            }else{
                return response()->json(['data'=>$data],200);
            }
        } catch (Exception $e) {
            return response()->json(['message'=>'Ocurrio un error '.$e->getMessage()],500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(GuardarAsignacionesRequest $request, $id)
    {
        try {
            $asignacion=AsignacionAuto::find($id);
            $asignacion->id_empleado=$request->input('id_empleado');
            $asignacion->id_automovil=$request->input('id_automovil');
            $asignacion->fecha_asignacion=Carbon::parse($request->get('fecha_asignacion'))->format('Y-m-d');
            $asignacion->observaciones=$request->input('observaciones');
        

        if($asignacion->save()){
            return response()->json(['message'=>'Datos actualizados'],200);
        }else{
            return response()->json(['message'=>'No se  actualizaron datos'],404);
        }

        } catch (Exception $e) {
            return response()->json(['message'=>'Ocurrio un error '.$e->getMessage()],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $asignacion=AsignacionAuto::find($id);
            if($asignacion->delete()){
                return response()->json(['message'=>'Se eliminaron los datos'],200);
            }else{
                return response()->json(['message'=>'No se eliminaron los datos'],404);
            }
        } catch (Exception $e) {
            return response()->json(['message'=>'Ocurrio un error '.$e->getMessage()],500);
        }
    }
}
