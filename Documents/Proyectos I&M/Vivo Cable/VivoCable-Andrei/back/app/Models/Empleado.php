<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Empleado extends Model  
{
    use HasFactory;

      //poner el nombre correcto
      protected $table = 'empleados';

      //asignar valores en masa
      protected $fillable =[
        'rol_id',
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'curp',
        'nss',
        'ine',
        'rfc',
        'fecha_nacimiento',
        'numero_telefono',
        'correo_electronico',
        'fecha_ingreso',
        'contrato',
        'numero_empleado',
        'password',
        'calle',
        'num_ext',
        'num_int',
        'colonia',
        'cp',
        'municipio',
        'estado',
        'estatus'
    ];


    public function roles(){
      return $this->belongsTo(Rol::class,'rol_id');
    }

    public function asistencias()
    {
        return $this->hasMany(Asistencias::class, 'id_empleado');
    }

    public function autos(){
      return $this->hasMany(AsignacionAuto::class,'id_empleado');
    }
}
