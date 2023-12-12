<?php

namespace App\Http\Requests\empleados;

use Illuminate\Foundation\Http\FormRequest;

class ActualizarEmpleadoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'rol_id'=>'nullable|integer',
            'nombre'=>'nullable|string|max:50',
            'apellido_paterno'=>'nullable|string|max:50',
            'apellido_materno'=>'nullable|string|max:50',
            'curp'=>'nullable|string|max:18',
            'nss'=>'nullable|string|max:20',
            'ine'=>'nullable|file|max:10080',
            'rfc'=>'nullable|string|max:15',
            'fecha_nacimiento'=>'nullable|date',
            'numero_telefono'=>'nullable|string|max:15',
            'correo_electronico'=>'nullable|string|max:80|unique:empleados',
            'fecha_ingreso'=>'nullable|date',
            'contrato'=>'nullable|file|max:10080',
            'numero_empleado'=>'nullable|string|max:100',
            'password'=>'nullable|string|max:250',
            'calle'=>'nullable|string|max:50',
            'num_ext'=>'nullable|string|max:50',
            'num_int'=>'nullable|string|max:10',
            'colonia'=>'nullable|string|max:50',
            'cp'=>'nullable|string|max:50',
            'municipio'=>'nullable|string|max:50',
            'estado'=>'nullable|string|max:50',
            'estatus'=>'nullable|boolean'
        ];
    }
}
