<?php

namespace App\Http\Requests\automoviles;

use Illuminate\Foundation\Http\FormRequest;

class GuardarAtuomovilesRequest extends FormRequest
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
            'marca' =>'nullable|string|max:100' ,
            'modelo'  =>'nullable|string|max:100' ,
             'placa'  =>'nullable|string|max:20',
             'anio'  =>'nullable|numeric',
             'color'  =>'nullable|string|max:50' ,
             'tipo_combustible'  =>'nullable|string|max:50',
             'kilometraje'  =>'nullable|numeric',
             'estatus'  =>'nullable|boolean'
        ];
    }
}
