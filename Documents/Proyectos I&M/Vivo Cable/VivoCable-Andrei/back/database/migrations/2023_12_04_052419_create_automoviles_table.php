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
        if (!Schema::hasTable('automoviles')) {
            Schema::create('automoviles', function (Blueprint $table) {
                $table->id();
                $table->string("marca", 100)->nullable();
                $table->string("modelo", 100)->nullable();
                $table->string("placa", 20)->nullable();
                $table->integer("anio")->nullable();
                $table->string("color", 50)->nullable();
                $table->string("tipo_combustible", 50)->nullable();
                $table->integer("kilometraje")->nullable();
                $table->boolean("estatus")->nullable();
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
        Schema::dropIfExists('automoviles');
    }
};
