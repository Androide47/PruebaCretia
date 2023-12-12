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
        if (!Schema::hasTable('contratos')) {
            Schema::create('contratos', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('id_cliente');
                $table->unsignedBigInteger('id_servicio');
                $table->date('fecha_contrato');
                $table->integer('televisores');
                $table->decimal('pago_inicial');
                $table->decimal('renta_mensual');
                $table->decimal('pronto_pago');
                $table->text('comentario');
                $table->boolean('borrado');
                $table->timestamps();

                //definir fk
                $table->foreign("id_cliente")->references("id")->on("clientes");
                //definir fk
                $table->foreign("id_servicio")->references("id")->on("servicios");
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
        Schema::dropIfExists('contratos');
    }
};
