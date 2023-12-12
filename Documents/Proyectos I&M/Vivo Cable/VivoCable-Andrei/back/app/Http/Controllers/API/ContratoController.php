<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contrato;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ContratoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $data=Contrato::with('cliente','servicio')->get();
            if(!$data){
                return response()->json(['message'=>'Datos no encontrados'],404);

            }else{
                return response()->json(['data'=>$data],200);
            }

        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()],500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $id_cliente=$request->input('id_cliente');
            $id_servicio=$request->input('id_servicio');
            $tv_adicional=$request->input('tv_adicional');

            $query= DB::statement('CALL AgregarContrato(?,?,?) ',[$id_cliente,$id_servicio,$tv_adicional]);
            if($query){
                return response()->json(['message'=>'Contrato creado'],200);
            }else{
                return response()->json(['message'=>'No se creo el contrato'],404);
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
            $data=Contrato::with('cliente','servicio')->find($id);
            if(!$data){
                return response()->json(['message'=>'Datos no encontrados'],404);

            }else{
                return response()->json(['data'=>$data],200);
            }

        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()],500);
        }
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
