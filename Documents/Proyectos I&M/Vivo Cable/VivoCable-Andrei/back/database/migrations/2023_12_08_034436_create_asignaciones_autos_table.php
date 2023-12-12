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
        Schema::create('asignaciones_autos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_empleado')->nullable();
            $table->unsignedBigInteger('id_automovil')->nullable();
            $table->date('fecha_asignacion')->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamps();

            //definir fk
            $table->foreign("id_empleado")->references("id")->on("empleados");
            $table->foreign("id_automovil")->references("id")->on("automoviles");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('asignaciones_autos');
    }
};
