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
        Schema::create('materiales', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_proveedor')->nullable();
            $table->string('nombre',100)->nullable();
            $table->string('descripcion',255)->nullable();
            $table->integer('stock')->nullable();
            $table->string('tipo')->nullable();
            $table->timestamps();
            //definir fk
            $table->foreign("id_proveedor")->references("id")->on("proveedores");
        });

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('materiales');
    }
};
