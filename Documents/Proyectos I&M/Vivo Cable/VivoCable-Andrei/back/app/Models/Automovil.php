<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Automovil extends Model
{
    use HasFactory;

    protected $table='automoviles';

    protected $fillable=[
       'marca'  ,
       'modelo'  ,
        'placa' ,
        'anio' ,
        'color' ,
        'tipo_combustible' ,
        'kilometraje' ,
        'estatus' 
    ];

    public function autos(){
        return $this->hasMany(AsignacionAuto::class,'id_automovil');
    }
}
