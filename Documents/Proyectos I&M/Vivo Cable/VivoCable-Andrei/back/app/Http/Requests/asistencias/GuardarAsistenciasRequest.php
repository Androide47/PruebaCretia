<?php

namespace App\Http\Requests\asistencias;

use Illuminate\Foundation\Http\FormRequest;

class GuardarAsistenciasRequest extends FormRequest
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
            'id_empleado'=>'required|integer',
            'id_tipo'=>'required|integer',
           // 'hora_entrada',
           // 'hora_salida',
           // 'fecha_asistencia',
           // 'horas_trabajadas'
        ];
    }
}
