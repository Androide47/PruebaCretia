<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    use HasFactory;

    protected $table='asistencias';

    protected $fillable=[
        'id_empleado',
        'id_tipo',
        'hora_entrada',
        'hora_salida',
        'fecha_asistencia',
        'horas_trabajadas'
    ];

    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'id_empleado');
    }

    public function tipo()
    {
        return $this->belongsTo(TipoAsistencia::class, 'id_tipo');
    }


}
