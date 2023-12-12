<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pago;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PagoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $data=Pago::with('estado_cuenta')->get();
            if(!$data){
                return response()->json(['message'=>'No se encontraron datos'],404);
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
            $id_estado_cuenta=$request->input('id_estado_cuenta');
            $monto=$request->input('monto');
            $query= DB::statement('CALL RealizarPago(?,?)',[$id_estado_cuenta,$monto]);

            if($query){
                return response()->json(['message'=>'Pago realizado con exito'],200);
            }else{
                return response()->json(['message'=>'No se realizo el pago'],404);
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
            $data=Pago::with('estado_cuenta')->find($id);
            if(!$data){
                return response()->json(['message'=>'No se encontraron datos'],404);
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
