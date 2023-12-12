<?php

namespace App\Http\Requests\gastos;

use Illuminate\Foundation\Http\FormRequest;

class GuardarGastosRequest extends FormRequest
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
            'titulo'=>'nullable|string|max:100',
            'comentario'=>'nullable|string' ,
            'monto' =>'nullable|numeric',
            'fecha'=>'nullable|date',
        ];
    }
}
