<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\tipoAsistencias\ActualizarTipoAsistenciaRequest;
use App\Http\Requests\tipoAsistencias\GuardarTipoAsistenciaRequest;
use App\Models\TipoAsistencia;
use Exception;
use Illuminate\Http\Request;

class TipoAsistenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TipoAsistencia:: all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GuardarTipoAsistenciaRequest $request)
    {
        try{

            $tipoAsistencia= new TipoAsistencia([
                'nombre'=>$request->input('nombre'),
                'estatus'=>$request->input('estatus')
            ]);

            if($tipoAsistencia->save()){
                return response()->json(['message'=>'Datos guardados'],200);
            }else{
                return response()->json(['message'=>'No se guardaron datos'],500);
            }

        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()],500);
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
        try{
            $data=TipoAsistencia::find($id);

            if(!$data){
                return response()->json(['message'=>'No se encontraron datos'],404);
            }
            return response()->json(['data'=>$data],200);

        }catch(Exception $e){
            return  response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()],500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ActualizarTipoAsistenciaRequest $request, $id)
    {
        try{
            $tipoAsistencia=TipoAsistencia::find($id);
            $tipoAsistencia->nombre=$request->input('nombre');
            $tipoAsistencia->estatus=$request->input('estatus');
    
            if($tipoAsistencia->save()){
                return response()->json(['message'=>'Datos actualizados'],200);
            }else{
                return response()->json(['message'=>'No se actualizaron los datos'],500);
            }

        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()],500);
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
        try{
            $tipoAsistencia=TipoAsistencia::find($id);

            if($tipoAsistencia->delete()){
                return response()->json(['message'=>'Datos eliminados'],200);
            }else{
                return response()->json(['message'=>'No se eliminaron los datos'],404);
            }

        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()],500);
        }
    }
}
