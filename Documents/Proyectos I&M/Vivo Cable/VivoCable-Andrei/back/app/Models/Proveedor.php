<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    use HasFactory;

    protected $table='proveedores';

    protected $fillable=[
        "nombre" ,
        "calle" ,
        "num_ext" ,
        "num_int" ,
        "colonia" ,
        "cp",
        "municipio" ,
        "estado" ,
        "telefono" ,
        "correo" ,
        "activo"
    ];
}
