<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('clientes')) {
            Schema::create('clientes', function (Blueprint $table) {
                $table->id();
                $table->timestamps();
                $table->string('nombre', 100);
                $table->string('apellido_paterno', 100);
                $table->string('apellido_materno', 100);
                $table->string('telefono', 100);
                $table->string('correo', 100);
                $table->date('fecha_registro');
                $table->string('ine', 100)->nullable();
                $table->string('calle', 50);
                $table->string('num_ext');
                $table->string('num_int')->nullable();
                $table->string('colonia', 50);
                $table->string('cp');
                $table->string('municipio', 50);
                $table->string('estado', 50);
                $table->string('comprobante_domicilio', 100)->nullable();
                $table->string('rfc', 20);
                $table->boolean('estatus');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clientes');
    }
};
