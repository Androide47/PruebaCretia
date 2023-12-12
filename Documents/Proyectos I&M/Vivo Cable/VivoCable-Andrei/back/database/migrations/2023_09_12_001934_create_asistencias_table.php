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
        if (!Schema::hasTable('asistencias')) {
            Schema::create('asistencias', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('id_empleado');
                $table->unsignedBigInteger('id_tipo');
                $table->dateTime('hora_entrada')->nullable();
                $table->dateTime('hora_salida')->nullable();
                $table->date('fecha_asistencia')->nullable();
                $table->integer('horas_trabajadas')->nullable();
                $table->timestamps();
                //definir fk
                $table->foreign("id_empleado")->references("id")->on("empleados");
                $table->foreign("id_tipo")->references('id')->on('tipo_asistencias');
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
        Schema::dropIfExists('asistencias');
    }
};
