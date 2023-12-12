<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\clientes\ActualizarClienteRequets;
use App\Http\Requests\clientes\GuardarClientesRequest;
use App\Models\Cliente;
use Exception;
use Illuminate\Http\Request;
use Carbon\Carbon ;
use GuzzleHttp\Client;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            //mostrar todos los datos
            $data=Cliente::all();
            if($data->count() > 0){
                return response()->json(['message'=>$data],200);
            }else{
                return response()->json(['message'=>'No se encuentran datos'],404);
            }

        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GuardarClientesRequest $request)
    {
        try{
            /*
            *se obtienen los datos de los archivos enviados
            *se valida que sean correspondientes al formato requerido
            *se guarda en el servidor
            *se guarda la ruta para enviarla a la db
            */
            if($request->hasFile("ine")){
                $ine=$request->file('ine');
                $nombreIne=time()."_".$ine->getClientOriginalName();
                $ine->storeAs('clientes',$nombreIne,'public');
                $ineRuta='uploads/clientes/'.$nombreIne;

            }else{
                $ineRuta="";
            }
            if($request->hasFile('comprobante_domicilio')){
                $comprobante_domicilio=$request->file('comprobante_domicilio');
                $nombreComprobante=time()."_".$comprobante_domicilio->getClientOriginalName();
                $comprobante_domicilio->storeAs('clientes',$nombreComprobante,'public');
                $comprobanteRuta="uploads/clientes/".$nombreComprobante;
            }else{
                $comprobanteRuta="";
            }
            /*
            *despues de la validacion se obtienen los demas datos del request
            *se asocial a un array del modelo cliente
            *se guardan los datos en la db
            *se retorna una respuesta
            */
            $fecha=Carbon::today();
            $cliente=new Cliente([
                'nombre'=>$request->input('nombre') ,
                'apellido_paterno'=>$request->input('apellido_paterno'),
                'apellido_materno'=>$request->input('apellido_materno') ,
                'telefono'=>$request->input('telefono'),
                'correo'=>$request->input('correo') ,
                'fecha_registro'=> $fecha ,
                'ine'=>$ineRuta,
                'calle' =>$request->input('calle'),
                'num_ext' =>$request->input('num_ext'),
                'num_int'=>$request->input('num_int') ,
                'colonia'=>$request->input('colonia'),
                'cp' =>$request->input('cp'),
                'municipio'=>$request->input('municipio'),
                'estado'=>$request->input('estado') ,
                'comprobante_domicilio'=>$comprobanteRuta ,
                'rfc' =>$request->input("rfc"),
                'estatus'=> 1

            ]);


            if($cliente->save()){
                return response()->json(['message'=>'Datos guardados con exito'],200);
            }else{
                return response()->json(['message'=>'No se guardaron los datos'],404);
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
            $data=Cliente::find($id);
            if($data->count()<0){
                return response()->json(['message'=>'No se encuentran datos'],404);
            }else{
                return response()->json(["message"=>$data],200);
            }

        }catch(Exception $e){
            return response()->json(['message'=>"ocurrio un error: ".$e->getMessage()],500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ActualizarClienteRequets $request, $id)
    {
        
        try{
            /*
            *se obtiene  los datos de los archivos
            *se compara para ver si existen en el servidor
            *se eliminan los viejos archivos
            *se actualizan a los nuevos
            * se guarda todo los parametros del request en la db 
            */
            $cliente=Cliente::find($id);
            if(!$cliente){
                return response()->json(['message'=>'No se encuetran datos'],404);
            }

            if($request->hasFile('ine')){
                if(file_exists(public_path($cliente->ine))){
                    unlink($cliente->ine);
                }
                $ine=$request->file('ine');
                $nombreIne=time()."_".$ine->getClientOriginalName();
                $ineRuta='uploads/clientes/'.$nombreIne;
                $ine->storeAs('clientes',$nombreIne,'public');
                $cliente->ine=$ineRuta;
            }

            if($request->hasFile('comprobante_domicilio')){
                if(file_exists(public_path($cliente->comprobante_domicilio))){
                    unlink($cliente->comprobante_domicilio);
                }
                $comprobante_domicilio=$request->file('comprobante_domicilio');
                $nombreComprobante=time()."_".$comprobante_domicilio->getClientOriginalName();
                $comprobante_domicilio->storeAs('clientes',$nombreComprobante,'public');
                $comprobanteRuta="uploads/clientes/".$nombreComprobante;
                $cliente->comprobante_domicilio=$comprobanteRuta;
            }

            $cliente->nombre=$request->input('nombre');
            $cliente->apellido_paterno=$request->input('apellido_paterno');
            $cliente->apellido_materno=$request->input('apellido_materno');
            $cliente->telefono=$request->input('telefono');
            $cliente->correo=$request->input('correo') ;
            $cliente->calle =$request->input('calle');
            $cliente->num_ext =$request->input('num_ext');
            $cliente->num_int=$request->input('num_int') ;
            $cliente->colonia=$request->input('colonia');
            $cliente->cp =$request->input('cp');
            $cliente->municipio=$request->input('municipio');
            $cliente->estado=$request->input('estado');
            $cliente->rfc =$request->input("rfc");
            $cliente->estatus= $request->input('estatus');


            if($cliente->save()){
                return response()->json(['message'=>'Se actualizaron los datos'],200);
            }else{
                return response()->json(['message'=>'No se actualizaron los datos'],404);
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
            $cliente=Cliente::find($id);
            if(!$cliente){
                return response()->json(['message'=>'No se encuetran datos'],404);
            }

            if(file_exists(public_path($cliente->ine))){
                unlink($cliente->ine);
            }

            if(file_exists(public_path($cliente->comprobante_domicilio))){
                unlink($cliente->comprobante_domicilio);
            }

            if($cliente->delete()){
                return response()->json(['message'=>'Datos eliminados correctamente'],200);
            }else{
                return response()->json(['message'=>'No se pudieron eliminar los datos'],404);
            }



        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()],500);
        }
    }
}
