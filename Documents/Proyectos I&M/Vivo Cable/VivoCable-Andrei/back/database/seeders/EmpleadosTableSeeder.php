<?php

namespace Database\Seeders;

use App\Models\Empleado;
use App\Models\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmpleadosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $admin= Rol::create(['nombre'=>'Administrador']);
        Rol::create(['nombre'=>'Cajero']);
        Rol::create(['nombre'=>'Técnico']);
        $password=Hash::make("administrador");

        Empleado::create([
            'rol_id'=>$admin->id,
            'nombre'=>"administrador",
            'apellido_paterno'=>"administrador",
            'apellido_materno'=>"administrador",
            'curp'=>"administrador",
            'nss'=>"1",
            'ine'=>NULL,
            'rfc'=>"1",
            'fecha_nacimiento'=>"2023-01-01",
            'numero_telefono'=>"1",
            'correo_electronico'=>"administrador@vivocable.com",
            'fecha_ingreso'=>"2023-01-01",
            'contrato'=>NULL,
            'numero_empleado'=>"1",
            'password'=>$password,
            'calle'=>"administrador",
            'num_ext'=>"1r",
            'num_int'=>"1",
            'colonia'=>"administrador",
            'cp'=>"1",
            'municipio'=>"administrador",
            'estado'=>"administrador",
            'estatus'=>1
        ]);
    }
}
