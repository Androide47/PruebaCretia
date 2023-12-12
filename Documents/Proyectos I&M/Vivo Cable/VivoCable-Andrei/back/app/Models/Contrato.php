<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    use HasFactory;
    protected $table='contratos';
    protected $fillable=[
        'id_cliente' ,
        'id_servicio' ,
        'fecha_contrato' ,
        'televisores' ,
        'pago_inicial' ,
        'renta_mensual' ,
        'pronto_pago' ,
        'comentario' ,
        'borrado' ,

    ];

    public function cliente(){
        return $this->belongsTo(Cliente::class,'id_cliente');
    }

    public function servicio(){
        return $this->belongsTo(Servicio::class,'id_servicio');
    }

    public function estado_cuenta(){
        return $this->hasMany(EstadoCuenta::class,'id_contrato');
    }
}
