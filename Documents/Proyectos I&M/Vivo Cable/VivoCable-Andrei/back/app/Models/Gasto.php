<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    use HasFactory;
    //definir tabla
    protected $table="gastos";

    //asignar valores
    protected $fillable=[
        'titulo',
        'comentario' ,
        'monto' ,
        'fecha',
    ];
}
