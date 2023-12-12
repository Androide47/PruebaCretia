<?php

namespace App\Http\Requests\proveedores;

use Illuminate\Foundation\Http\FormRequest;

class GuardarProveedoresRequest extends FormRequest
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
            "nombre"=>'nullable|string|max:100' ,
            "calle"=>'nullable|string|max:50' ,
            "num_ext"=>'nullable|string|max:10' ,
            "num_int"=>'nullable|string|max:10' ,
            "colonia"=>'nullable|string|max:50' ,
            "cp"=>'nullable|string|max:50',
            "municipio"=>'nullable|string|max:50' ,
            "estado"=>'nullable|string|max:50' ,
            "telefono"=>'nullable|string|max:20' ,
            "correo"=>'nullable|string|max:100' ,
            "activo"=>'nullable|boolean'
        ];
    }
}
