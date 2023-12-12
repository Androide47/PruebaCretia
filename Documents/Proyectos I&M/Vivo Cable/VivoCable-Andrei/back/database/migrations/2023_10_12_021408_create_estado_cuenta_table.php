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
        if (!Schema::hasTable('estado_cuenta')) {
            Schema::create('estado_cuenta', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('id_contrato');
                $table->decimal('monto_pago', 10, 2);
                $table->date('fecha_limite');
                $table->date('periodo');
                $table->boolean('estatus');
                $table->date('fecha_pago')->nullable();
                $table->decimal('monto_pagado', 10, 2)->nullable();
                $table->timestamps();
                $table->foreign('id_contrato')->references("id")->on('contratos');
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
        Schema::dropIfExists('estado_cuenta');
    }
};
