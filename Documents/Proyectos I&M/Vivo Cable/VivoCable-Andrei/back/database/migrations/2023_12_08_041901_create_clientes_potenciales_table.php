<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes_potenciales', function (Blueprint $table) {
            $table->id();
            $table->string('nombre',100)->nullable();
            $table->string('telefono',20)->nullable();
            $table->string('correo',100)->nullable();
            $table->string('servicio_deseado',100)->nullable();
            $table->string('comentario',255)->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clientes_potenciales');
    }
};
