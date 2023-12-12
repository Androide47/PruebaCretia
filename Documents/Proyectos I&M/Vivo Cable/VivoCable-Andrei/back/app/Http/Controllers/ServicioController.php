<?php

namespace App\Http\Controllers;

use App\Http\Requests\servicios\ActualizarServicioRequest;
use App\Http\Requests\servicios\GuardarServiciosRequest;
use App\Models\Servicio;
use Exception;
use Illuminate\Http\Request;

class ServicioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{

            $data=Servicio::all();
            if($data->count() > 0){
                return response()->json(['data'=>$data],200);
            }else{
                return response()->json(['message'=>'No se encuentran datos'],404);
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
    public function store(GuardarServiciosRequest $request)
    {
        try{

            //obtener los archivos
            if($request->hasFile('imagen_principal')){
                $imagen_principal=$request->file('imagen_principal');
                //generar nombre unico 
                $nombreImagen_principal=time().'_'.$imagen_principal->getClientOriginalName();
                //guardar imagenes en el servidor
                $imagen_principal->storeAs('servicios',$nombreImagen_principal,'public');
                $img_principal="uploads/servicios/".$nombreImagen_principal;
            }else{
                $img_principal="";
            }

            if($request->hasFile('imagen_1')){
                $imagen_1=$request->file('imagen_1');
                //generar nombre unico
                $nombreImagen_1=time().'_'.$imagen_1->getClientOriginalName();
                //guardar imagen en el servidor
                $imagen_1->storeAs('servicios',$nombreImagen_1,'public');
                $img_1="uploads/servicios/". $nombreImagen_1;
            }else{
                $img_1="";
            }

            if($request->hasFile('imagen_2')){
                $imagen_2=$request->file('imagen_2');
                //generar nombre unico
                $nombreImagen_2=time().'_'.$imagen_2->getClientOriginalName();
                //guardar imagen en el servidor
                $imagen_2->storeAs('servicios',$nombreImagen_2,'public');
                $img_2="uploads/servicios/". $nombreImagen_2;
            }else{
                $img_2="";
            }

            $servicio= new Servicio([
                'nombre_servicio'=>$request->input('nombre_servicio'),
                'descripcion_servicio'=>$request->input('descripcion_servicio'),
                'tipo_servicio'=>$request->input('tipo_servicio'),
                'renta_mensual'=>$request->input('renta_mensual'),
                'pronto_pago'=>$request->input('pronto_pago'),
                'megabytes'=>$request->input('megabytes'),
                'costo_servicios'=>$request->input('costo_servicios'),    
                'televisores'=>$request->input('televisores'),
                'costo_tvadicional'=>$request->input('costo_tvadicional'),
                'imagen_principal'=>$img_principal,
                'imagen_1'=>$img_1,
                'imagen_2'=>$img_2,
                'comentario'=>$request->input('comentario')
            ]);


            if($servicio->save()){
                return response()->json(['message'=>'Datos guardados correctamente'],200);
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
            $data= Servicio::find($id);
            if(!$data){
              return   response()->json(['message'=>'Datos no encontrados'],404);
            }else{
               return response()->json(['data'=>$data],200);
            }
            
        }catch(Exception $e){
            return response()->json(["message"=>'Oucurrio un error: '.$e->getMessage()],500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ActualizarServicioRequest $request, $id)
    {
        try{
            //obtener els ervicio existente
            $servicio=Servicio::find($id);
            //retorna mensaje por si no existen datos en la db con ese mensaje
            if(!$servicio){
                return response()->json(['message'=>'No se encuentran datos']);
            }
            //eliminar  archivos del servidor si existen
        
        

             //obtener los archivos
             if($request->hasFile('imagen_principal')){
                $imagen_principal=$request->file('imagen_principal');
                //generar nombre unico 
                $nombreImagen_principal=time().'_'.$imagen_principal->getClientOriginalName();
                //guardar imagenes en el servidor y eliminar
                if(file_exists(public_path($servicio->imagen_principal))){
                    unlink($servicio->imagen_principal);
                }
                $imagen_principal->storeAs('servicios',$nombreImagen_principal,'public');
                $servicio->imagen_principal="uploads/servicios/".$nombreImagen_principal;
            }

            if($request->hasFile('imagen_1')){
                $imagen_1=$request->file('imagen_1');
                //generar nombre unico
                $nombreImagen_1=time().'_'.$imagen_1->getClientOriginalName();
                //guardar imagen en el servidor
                  
                if(file_exists(public_path($servicio->imagen_1))){
                    unlink($servicio->imagen_1);
                }
                $imagen_1->storeAs('servicios',$nombreImagen_1,'public');
                $servicio->imagen_1="uploads/servicios/". $nombreImagen_1;
            }

            if($request->hasFile('imagen_2')){
                $imagen_2=$request->file('imagen_2');
                //generar nombre unico
                $nombreImagen_2=time().'_'.$imagen_2->getClientOriginalName();
                //guardar imagen en el servidor
                if(file_exists(public_path($servicio->imagen_2))){
                    unlink($servicio->imagen_2);
                }
                $imagen_2->storeAs('servicios',$nombreImagen_2,'public');
                $servicio->imagen_2="uploads/servicios/". $nombreImagen_2;
            }

            //parametros a actualizar
            $servicio->nombre_servicio=$request->input('nombre_servicio');
            $servicio->descripcion_servicio=$request->input('descripcion_servicio');
            $servicio->tipo_servicio=$request->input('tipo_servicio');
            $servicio->renta_mensual=$request->input('renta_mensual');
            $servicio->pronto_pago=$request->input('pronto_pago');
            $servicio->megabytes=$request->input('megabytes');
            $servicio->costo_servicios=$request->input('costo_servicios');    
            $servicio->televisores=$request->input('televisores');
            $servicio->costo_tvadicional=$request->input('costo_tvadicional');
            $servicio->comentario=$request->input('comentario');

            //devuelve una respuesta al actualizar en la db
            if($servicio->save()){
                return response()->json(['message'=>'Datos actualizados con exito'],200);
            }else{
                return response()->json(['message'=>'No se pudieron actualizar los datos'],404);
            }

        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()]);
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

            $servicio = Servicio::find($id);
            if(!$servicio){
                return response()->json(['message'=>'Datos no encontrados'],404);
            }
    
            //eliminar  archivos del servidor si existen
            if(file_exists(public_path($servicio->imagen_principal))){
                unlink($servicio->imagen_principal);
            }
            if(file_exists(public_path($servicio->imagen_1))){
                unlink($servicio->imagen_1);
            }
            if(file_exists(public_path($servicio->imagen_2))){
                unlink($servicio->imagen_2);
            }

            //elimiar datos de la db
            if($servicio->delete()){
               return response()->json(["message"=>"Datos eliminados correctamente"],200);
            }else{
                return response()->json(["message"=>"No se pudieron eliminar los datos"],404);
            }

        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()],500);
        }



    }
}
