<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    //defir la tabla
    protected $table='clientes';

    //asignar valores
    protected $fillable=[
        'nombre' ,
        'apellido_paterno' ,
        'apellido_materno' ,
        'telefono' ,
        'correo' ,
        'fecha_registro' ,
        'ine' ,
        'calle' ,
        'num_ext' ,
        'num_int' ,
        'colonia' ,
        'cp' ,
        'municipio',
        'estado' ,
        'comprobante_domicilio' ,
        'rfc' ,
        'estatus'
    ];

    public function contrato(){
        return $this->hasMany(Contrato::class,'id_cliente');
    }
}
