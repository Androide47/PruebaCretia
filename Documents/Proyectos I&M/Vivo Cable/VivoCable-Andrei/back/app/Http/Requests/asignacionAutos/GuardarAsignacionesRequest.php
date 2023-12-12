<?php

namespace App\Http\Requests\asignacionAutos;

use Illuminate\Foundation\Http\FormRequest;

class GuardarAsignacionesRequest extends FormRequest
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
            "id_empleado"=>"nullable|numeric",
            "id_automovil"=>"nullable|numeric" ,
            "fecha_asignacion"=>"nullable|date",
            "observaciones"=>"nullable|string" ,
        ];
    }
}
