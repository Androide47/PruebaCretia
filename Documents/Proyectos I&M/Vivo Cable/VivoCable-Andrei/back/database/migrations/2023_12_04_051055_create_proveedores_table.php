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
        if (!Schema::hasTable('proveedores')) {
            Schema::create('proveedores', function (Blueprint $table) {
                $table->id();
                $table->string("nombre", 100)->nullable();
                $table->string("calle", 50)->nullable();
                $table->string("num_ext", 10)->nullable();
                $table->string("num_int", 10)->nullable();
                $table->string("colonia", 50)->nullable();
                $table->string("cp", 50)->nullable();
                $table->string("municipio", 50)->nullable();
                $table->string("estado", 50)->nullable();
                $table->string("telefono", 20)->nullable();
                $table->string("correo", 100)->nullable();
                $table->boolean("activo")->nullable();
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
        Schema::dropIfExists('proveedores');
    }
};
