<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\empleados\ActualizarEmpleadoRequest;
use App\Http\Requests\empleados\GuardarEmpleadoRequest;
use App\Http\Requests\login\LoginRequest;
use App\Models\Empleado;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     //funcion para mostrar todos los datos
    public function index()
    {

        $data=Empleado::with('roles')->get();
        
        if(!$data){
            return response()->json(['message'=>'Datos no encontrados'],404);
        }else{
            return response()->json(['data'=>$data],200);
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */



     //iniciar session
    public function login(LoginRequest $request){
       $empleado= User::where("correo_electronico","=",$request->input('correo_electronico') )->first();

       try{

       if( isset($empleado->id) ){
        if(Hash::check( $request->input('password'), $empleado->password  )){
            //se crea el token
            $token = $empleado->createToken("auth_token")->plainTextToken;
            
          return response()->json([
            "status"=>true,
            "message"=>"Usuario logeado ",
            "token"=>$token
        ],200);
        }else{
            return response()->json([
                "status"=>false,
                "message"=>"la contraseña es incorrecta"
            ],401);
        }

       }else{

        return response()->json([
            "status"=>false,
            "message"=>"Usuario no registrado"
        ],404);

       }

    }catch(Exception $e){
        return response()->json(["message"=>"Ocurrio un error: ".$e->getMessage()]);
    }

    }

    //cerrar sesion
    public function logout(){
        try{
            auth()->user()->tokens()->delete();

            return  response()->json(['message'=>'Sesión cerrada '],200);


        }catch(Exception $e){
            return  response()->json(['message'=>'Ocurrio un error: '.$e->getMessage()],500);
        }
    }


    public function store(GuardarEmpleadoRequest $request)
    {
        try{

            
            //se obtienen los archivos del formulario 
            $ine=$request->file('ine');
            $contrato=$request->file('contrato');
            //generar nombre unico para los archivos
            $nombreIne= time().'_'.$ine->getClientOriginalName();
            $nombreContrato=time().'_'.$contrato->getClientOriginalName();

            //almacenar los archivos en la carpeta  'pulbic/uploads' 
            $ine->storeAs('ine',$nombreIne,'public');
            $contrato->storeAs('contratos',$nombreContrato,'public');

            //encriptar la contaseña 
            $password=Hash::make($request->input('password'));

            //se crea un empleado con los datos del formulario 
            $empleado=new Empleado([
                'rol_id'=>$request->input('rol_id'),
                'nombre'=>$request->input('nombre'),
                'apellido_paterno'=>$request->input('apellido_paterno'),
                'apellido_materno'=>$request->input('apellido_materno'),
                'curp'=>$request->input('curp'),
                'nss'=>$request->input('nss'),
                'ine'=>'uploads/ine/'.$nombreIne,
                'rfc'=>$request->input('rfc'),
                'fecha_nacimiento'=>$request->input('fecha_nacimiento'),
                'numero_telefono'=>$request->input('numero_telefono'),
                'correo_electronico'=>$request->input('correo_electronico'),
                'fecha_ingreso'=>$request->input('fecha_ingreso'),
                'contrato'=>'uploads/contratos/'.$nombreContrato,
                'numero_empleado'=>$request->input('numero_empleado'),
                'password'=>$password,
                'calle'=>$request->input('calle'),
                'num_ext'=>$request->input('num_ext'),
                'num_int'=>$request->input('num_int'),
                'colonia'=>$request->input('colonia'),
                'cp'=>$request->input('cp'),
                'municipio'=>$request->input('municipio'),
                'estado'=>$request->input('estado'),
                'estatus'=>1
            ]);

            //se guarda la data en la base 
            
            if($empleado->save()){
            //retorna la respuesta al servidor
                return response()->json([
                    'res'=>true,
                    'message'=>'Datos guardados con exito'
                ],200);
        

            }else{
                return response()->json([
                    'res'=>false,
                    'message'=>'No se guardaron los datos'
                ],404);
            }

   
        }catch(Exception $e){
            return response()->json([
                'res'=>false,
                'message'=>'Ocurrio un error'.$e->getMessage()
            ],500);

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
        //hace la consulta a la base de datos
        $data=Empleado::with('roles')->find($id);
        //validacion por si no encuentra datos
        if(!$data){
            return response()->json(['message'=>'Datos no encontrados'],404);
        }else{
            return response()->json(['data'=>$data],200);
        }

        }catch(Exception $e){
            return response()->json(['message'=>"Ocurrio un error: ".$e->getMessage()]);
        }
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ActualizarEmpleadoRequest $request, $id)
{
    try {
        // Obtener el empleado existente
        $empleado = Empleado::find($id);
        if(!$empleado){
            return response()->json(['message'=>'Datos no encontrados'],404);
        }
        
        // Validar y actualizar los archivos (si es necesario)
        if ($request->hasFile('ine')) {
            $ine =$request->file('ine');
            $ineAnterior=$empleado->ine;
            // Generar nombre único para el archivo
            $nombreIne = time() . '_' . $ine->getClientOriginalName();
            // Almacenar el archivo en la carpeta 'public/uploads'
            $ine->storeAs('ine',$nombreIne,'public');
            // Eliminar el archivo anterior (si existe)
            if(file_exists(public_path($ineAnterior))){
                unlink($ineAnterior);
            }
            //agregar el nuevo path donde se guardo el archivo
            $empleado->ine='uploads/ine/' . $nombreIne;
        }
        if($request->hasFile('contrato')){
            $contrato= $request->file("contrato");
            $contratoAnterior=$empleado->contrato;
            //generar nombre unico
            $nombreContrato=time().'_'.$contrato->getClientOriginalName();
            //almacenar el archivo en la carpeta
            $contrato->storeAs('contratos',$nombreContrato,'public');
            //eliminar el archivo anterior (si existe)
            if(file_exists(public_path($contratoAnterior))){
                unlink($contratoAnterior);
            }
            //agregar el nuevo path donde se guardo el archivo
            $empleado->contrato='uploads/contratos/'.$nombreContrato;
        }
        
        $empleado->rol_id=$request->input('rol_id');
        //$empleado->nombre=$request->input('nombre'); 
       // $empleado->apellido_materno=$request->input('apellido_materno');
        //$empleado->curp=$request->input('curp');
        //$empleado->nss=$request->input('nss');
        //$empleado->rfc=$request->input('fecha_nacimiento');
        $empleado->numero_telefono=$request->input('numero_telefono');
        $empleado->correo_electronico=$request->input('correo_electronico');
        //$empleado->fecha_ingreso=$request->input('fecha_ingreso');
        //$empleado->numero_empleado=$request->input('numero_empleado');
        $empleado->calle=$request->input('calle');
        $empleado->num_ext=$request->input('num_ext');
        $empleado->num_int=$request->input('num_int');
        $empleado->colonia=$request->input('colonia');
        $empleado->cp=$request->input('cp');
        $empleado->municipio=$request->input('municipio');
        $empleado->estado=$request->input('estado');
        //$empleado->estatus=$request->input('estatus');
        

        //validar y actualizar  los datos
        if($empleado->save()){
            return response()->json(['message' => 'Datos actualizados'], 200);
        }else{
            return response()->json(['message' => 'Datos NO actualizados'], 200);
        }
    } catch (Exception $e) {
        return response()->json(['message' => 'Ocurrió un error: ' . $e->getMessage()]);
    }
}

    //funcion para actualizar contraseña
    public function passwordUpdate(ActualizarEmpleadoRequest $request,$id){
        try{
        // Obtener el empleado existente
        $empleado = Empleado::find($id);
        if(!$empleado){
            return response()->json(['message'=>'Datos no encontrados'],404);
        }
        $password= Hash::make($request->input('password')) ;
        $empleado->password=$password;
      

        if($empleado->save()){
            return response()->json(['message'=>'Contraseña actualizada'],200);
        }else{
            return response()->json(['message'=>'No se pudo actualizar lac contraseña'],500);
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
                    // Obtener el empleado existente
        $empleado = Empleado::find($id);
        if(!$empleado){
            return response()->json(['message'=>'Datos no encontrados'],404);
        }

          // Eliminar el archivo  (si existe)
          if(file_exists(public_path($empleado->ine))){
            unlink($empleado->ine);
        }
        // Eliminar el archivo  (si existe)
         if(file_exists(public_path($empleado->contrato))){
            unlink($empleado->contrato);
        }

        
        if($empleado->delete()){
            return response()->json(['message'=>'Se  eliminaron los datos'],200);
        }else{
            return response()->json(['message'=>'No se eliminaron los datos'],500);
        }
            

        }catch(Exception $e){
            return response()->json(['message'=>'Ocurrio un error'.$e->getMessage()]);
        }
    }
}
