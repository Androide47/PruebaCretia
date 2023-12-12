<?php

namespace App\Http\Requests\tipoAsistencias;

use Illuminate\Foundation\Http\FormRequest;

class GuardarTipoAsistenciaRequest extends FormRequest
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
            'nombre'=>'required|string|max:50',
            'estatus'=>'required|boolean'
        ];
    }
}
