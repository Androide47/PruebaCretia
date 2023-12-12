<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\automoviles\GuardarAtuomovilesRequest;
use App\Models\Automovil;
use Exception;
use Illuminate\Http\Request;

class AutomovilController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        if(Automovil::exists()){
            $data= Automovil::all();
            return response()->json(['data'=>$data],200);
        }else{
            return response()->json(['message'=>'No se encuetran datos'],404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GuardarAtuomovilesRequest $request)
    {
         try{

            $automovil= new Automovil([
                'marca' =>$request->input('marca') ,
                'modelo'   =>$request->input('modelo'),
                 'placa'  =>$request->input('placa'),
                 'anio'  =>$request->input('anio'),
                 'color'  =>$request->input('color'),
                 'tipo_combustible'  =>$request->input('tipo_combustible'),
                 'kilometraje'  =>$request->input('kilometraje'),
                 'estatus' => '1'
            ]);

            if($automovil->save()){
                return response()->json(['message'=>'Datos guardados'],200);
            }else{
                return response()->json(['message'=>'No se guardaron datos'],404);
            }

            
         }catch(Exception $e){
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
        try{
            $data=Automovil::find($id);
            if(!$data){
                return response()->json(['message'=>'No se encuetran datos'],404);
            }else{
                return response()->json(['data'=>$data],200);
            }

        }catch(Exception $e){
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
    public function update(GuardarAtuomovilesRequest $request, $id)
    {
        try {
            $automovil=Automovil::find($id);
            $automovil->marca=$request->input('marca',);
            $automovil->modelo=$request->input('modelo');
            $automovil->placa=$request->input('placa');
            $automovil->anio=$request->input('anio');
            $automovil->color=$request->input('color');
            $automovil->tipo_combustible=$request->input('tipo_combustible');
            $automovil->kilometraje=$request->input('kilometraje');

            if($automovil->save()){
                return response()->json(['message'=>'Datos actualizados'],200);
            }else{
                return response()->json(['message'=>'No se guardaron datos'],404);
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
        try{
            $automovil=Automovil::find($id);

            if($automovil->delete()){
                return response()->json(['message'=>'Datos eliminados'],200);
            }else{
                return response()->json(['message'=>'No se eliminaron los datos'],404);
            }


        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error '.$e->getMessage()],500);
        }
    }
}
