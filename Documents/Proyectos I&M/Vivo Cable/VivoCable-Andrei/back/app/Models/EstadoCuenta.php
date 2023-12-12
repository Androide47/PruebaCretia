<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstadoCuenta extends Model
{
    use HasFactory;
    protected $table='estado_cuenta';
    protected $fillable=[
        'id_contrato' ,
        'monto_pago' ,
        'fecha_limite' ,
        'periodo' ,
        'estatus' ,
        'fecha_pago' ,
        'monto_pagado' ,
    ];

    public function contrato(){
        return $this->belongsTo(Contrato::class,'id_contrato');
    }

    public function  pago(){
        return $this->hasMany(Pago::class,'id_estado_cuenta');
    }
}
