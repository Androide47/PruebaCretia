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
        if (!Schema::hasTable('servicios')) {
            Schema::create('servicios', function (Blueprint $table) {
                $table->id();
                $table->string('nombre_servicio', 100);
                $table->string('descripcion_servicio', 255);
                $table->string('tipo_servicio', 100);
                $table->decimal('renta_mensual', 10, 2);
                $table->decimal('pronto_pago', 10, 2);
                $table->integer('megabytes')->nullable();
                $table->decimal('costo_servicios', 10, 2)->default(100.00)->nullable();
                $table->integer('televisores')->nullable();
                $table->decimal('costo_tvadicional', 10, 2)->nullable();
                $table->string('imagen_principal', 100)->nullable();
                $table->string('imagen_1', 100)->nullable();
                $table->string('imagen_2', 100)->nullable();
                $table->text('comentario')->nullable();
                $table->timestamps();
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
        Schema::dropIfExists('servicios');
    }
};
