<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;
    //poner el nombre correcto
    protected $table = 'roles';


    protected $fillable =[
        'nombre'
    ];

    public function empleados(){
        return $this->hasMany(Empleado::class,'rol_id');
    }
}
