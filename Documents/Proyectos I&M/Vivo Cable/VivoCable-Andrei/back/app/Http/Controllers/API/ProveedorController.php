<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\proveedores\GuardarProveedoresRequest;
use App\Models\Proveedor;
use Exception;
use Illuminate\Http\Request;

class ProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        

        if(Proveedor::exists()){
            $data= Proveedor::all();

            return response()->json(['data'=>$data],200);
        }else{
            return response()->json(['message'=>'No se encontraron datos'],404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GuardarProveedoresRequest $request)
    {
        try{
            $proveedor= new Proveedor([
                "nombre" =>$request->input('nombre') ,
                "calle" =>$request->input('calle')  ,
                "num_ext"  =>$request->input('num_ext') ,
                "num_int"  =>$request->input('num_int') ,
                "colonia"  =>$request->input('colonia') ,
                "cp" =>$request->input('cp') ,
                "municipio"  =>$request->input('municipio') ,
                "estado"  =>$request->input('estado') ,
                "telefono"  =>$request->input('telefono') ,
                "correo"  =>$request->input('correo') ,
                "activo" => '1'

            ]);

            if($proveedor->save()){
                return response()->json(['message'=>'Datos guardados'],200);
            }else{
                return response()->json(['message'=>'No se guardaron datos'],404);
            }
        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error'.$e->getMessage()],500);
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
            $data=Proveedor::find($id);
            if(!$data){
                return response()->json(['message'=>'No se encuentran datos'],404);
            }else{
                return response()->json(['data'=>$data],200);
            }
        } catch (Exception $e) {
            return response()->json(['message'=>'Ocurrio un error'.$e->getMessage()],500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(GuardarProveedoresRequest $request, $id)
    {
        try {
            $proveedor=Proveedor::find($id);
            $proveedor->nombre=$request->input('nombre');
            $proveedor->calle=$request->input('calle');
            $proveedor->num_ext=$request->input('num_ext');
            $proveedor->num_int=$request->input('num_int');
            $proveedor->colonia=$request->input('colonia');
            $proveedor->cp=$request->input('cp');
            $proveedor->municipio=$request->input('municipio');
            $proveedor->estado=$request->input('estado');
            $proveedor->telefono=$request->input('telefono');
            $proveedor->correo=$request->input('correo');
    
            if($proveedor->save()){
                return response()->json(['message'=>'Datos actualizados'],200);
            }else{
                return response()->json(['message'=>'No se actualizaron los datos'],404);
            }
           
        } catch (Exception $e) {
            return response()->json(['message'=>'Ocurrio un error'.$e->getMessage()],500);
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
            $proveedor=Proveedor::find($id);
            if($proveedor->delete()){
                return response()->json(['message'=>'Datos eliminados'],200);
            }else{
                return response()->json(['message'=>'No se eliminaron datos'],404);
            }
        } catch (Exception $e) {
            return response()->json(['message'=>'Ocurrio un error'.$e->getMessage()],500);
        }
    }
}
