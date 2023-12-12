<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsignacionAuto extends Model
{
    use HasFactory;
    protected $table='asignaciones_autos';
    protected $fillable=[
        "id_empleado" ,
        "id_automovil" ,
        "fecha_asignacion" ,
        "observaciones" ,
    ];

    public function empleados(){
        return $this->belongsTo(Empleado::class,'id_empleado');
    }

    public function autos(){
        return $this->belongsTo(Automovil::class,'id_automovil');
    }


}
