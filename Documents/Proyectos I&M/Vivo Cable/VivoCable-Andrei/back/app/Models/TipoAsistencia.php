<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoAsistencia extends Model
{
    use HasFactory;
    //poner nombre de la tabla
    protected $table='tipo_asistencias';

    protected $fillable =[
        'nombre',
        'estatus'
    ];

    public function asistencias()
    {
        return $this->hasMany(Asistencias::class, 'id_tipo');
    }



}
