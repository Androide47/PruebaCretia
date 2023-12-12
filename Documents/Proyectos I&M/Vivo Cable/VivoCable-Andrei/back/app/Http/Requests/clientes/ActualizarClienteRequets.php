<?php

namespace App\Http\Requests\clientes;

use Illuminate\Foundation\Http\FormRequest;

class ActualizarClienteRequets extends FormRequest
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
            'nombre' => 'required|string|max:100',
            'apellido_paterno' => 'required|string|max:100',
            'apellido_materno' => 'required|string|max:100',
            'telefono' => 'required|string|max:20',
            'correo' => 'required|string|max:100',
            'fecha_registro' => 'nullable|date', 
            'ine' => 'required|file|mimes:pdf|max:10240', 
            'calle' => 'required|string|max:50',
            'num_ext' => 'required|string|max:50',
            'num_int' => 'nullable|string|max:50',
            'colonia' => 'required|string|max:50',
            'cp' => 'required|string|max:50',
            'municipio' => 'required|string|max:50',
            'estado' => 'required|string|max:50',
            'comprobante_domicilio' => 'required|file|mimes:pdf|max:10240', 
            'rfc' => 'required|string|max:20',
            'estatus' => 'nullable|boolean', 
        ];
    }
}
