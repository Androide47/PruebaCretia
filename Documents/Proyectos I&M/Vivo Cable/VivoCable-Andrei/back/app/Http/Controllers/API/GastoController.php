<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\gastos\GuardarGastosRequest;
use App\Models\Gasto;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class GastoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        if(Gasto::exists()){
            $data=Gasto::all();
            return response()->json(['data'=>$data],200);
        }else{
            return response()->json(['message'=>'No se encuentran datos'],404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GuardarGastosRequest $request)
    {
        
        try {
            $gasto=new Gasto([
                'titulo'=>$request->input("titulo"),
                'comentario'=>$request->input("comentario") ,
                'monto'=>$request->input("monto") ,
                'fecha'=> Carbon::parse($request->get('fecha'))->format('Y-m-d'),
            ]);
            if($gasto->save()){
                return response()->json(['message'=>'Datos guardados'],200);
            }else{
                return response()->json(['message'=>'No se guardaron los datos'],404);
            }
        } catch (Exception $e) {
            return response()->json(['message'=>'ocurrio un error '.$e->getMessage()],500);
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
            $data=Gasto::find($id);
            if(!$data){
                return response()->json(['message'=>'No se encuetran datos'],404);
            }else{
                return response()->json(['data'=>$data],200);
            }
        } catch (Exception $e) {
            return response()->json(['message'=>'ocurrio un error '.$e->getMessage()],500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(GuardarGastosRequest $request, $id)
    {
        try {
            $gasto=Gasto::find($id);
            $gasto->titulo=$request->input("titulo");
            $gasto->comentario=$request->input("comentario");
            $gasto->monto=$request->input("monto");
            $gasto->fecha= Carbon::parse($request->get('fecha'))->format('Y-m-d');

            if($gasto->save()){
                return response()->json(['message'=>'Datos actualizados'],200);
            }else{
                return response()->json(['message'=>'No se guardaron datos'],404);
            }

        } catch (Exception $e) {
            return response()->json(['message'=>'ocurrio un error '.$e->getMessage()],500);
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
            $gasto=Gasto::find($id);
            if($gasto->delete()){
                return response()->json(['message'=>'Datos eliminados'],200);
            }else{
                return response()->json(['message'=>'No se eliminaron los datos'],404);
            }
        } catch (Exception $e) {
            return response()->json(['message'=>'ocurrio un error '.$e->getMessage()],500);
        }
    }
}
