<?php

namespace App\Http\Requests\servicios;

use Illuminate\Foundation\Http\FormRequest;

class ActualizarServicioRequest extends FormRequest
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
            'nombre_servicio'=>'required|string|max:100',
            'descripcion_servicio'=>'required|string|max:255',
            'tipo_servicio'=>'required|string|max:100',
            'renta_mensual'=>'required|numeric',
            'pronto_pago'=>'required|numeric',
            'megabytes'=>'nullable|numeric',
            'costo_servicios'=>'nullable|numeric',    
            'televisores'=>'nullable|numeric',
            'costo_tvadicional'=>'nullable|numeric',
            'imagen_principal'=>'nullable|image|mimes:jpeg,png,jpg,gif|max:4048',
            'imagen_1'=>'nullable|image|mimes:jpeg,png,jpg,gif|max:4048',
            'imagen_2'=>'nullable|image|mimes:jpeg,png,jpg,gif|max:4048',
            'comentario'=>'nullable|string'
        ];
    }
}
