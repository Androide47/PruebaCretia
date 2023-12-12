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
        if (!Schema::hasTable('gastos')) {
            Schema::create('gastos', function (Blueprint $table) {
                $table->id();
                $table->string("titulo", 100)->nullable();
                $table->text("comentario")->nullable();
                $table->decimal("monto", 10, 2)->nullable();
                $table->date("fecha")->nullable();
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
        Schema::dropIfExists('gastos');
    }
};