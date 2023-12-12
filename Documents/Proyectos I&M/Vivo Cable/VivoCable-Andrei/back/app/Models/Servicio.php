<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    //definir tabla de la db
    protected $table="servicios";

    //asignar valores
    protected $fillable=[
        'nombre_servicio',
        'descripcion_servicio',
        'tipo_servicio',
        'renta_mensual',
        'pronto_pago',
        'megabytes',
        'costo_servicios',    
        'televisores',
        'costo_tvadicional',
        'imagen_principal',
        'imagen_1',
        'imagen_2',
        'comentario'
    ];

    public function contrato(){
        return $this->hasMany(Contrato::class,'id_servicio');
    }
}
