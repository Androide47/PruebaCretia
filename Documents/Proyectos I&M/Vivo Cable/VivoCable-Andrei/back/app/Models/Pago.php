<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;
    protected $table='pagos';
    protected$fillable=[
        'id_pago',
        'id_estado_cuenta' ,
        'monto_pagado' ,
        'fecha_pago' 
    ];

    public function estado_cuenta(){
        return $this->belongsTo(EstadoCuenta::class,'id_estado_cuenta');
    }

}
