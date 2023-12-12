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
        if (!Schema::hasTable('empleados')) {
            Schema::create('empleados', function (Blueprint $table) {
                //se definen  los datos de la tabla
                $table->id();
                $table->unsignedBigInteger("rol_id");
                $table->string('nombre', 50)->nullable();
                $table->string("apellido_paterno", 50)->nullable();
                $table->string("apellido_materno", 50)->nullable();
                $table->string("curp", 18)->nullable();
                $table->string("nss", 20)->nullable();
                $table->string("ine", 250)->nullable();
                $table->string("rfc", 15)->nullable();
                $table->date("fecha_nacimiento")->nullable();
                $table->string("numero_telefono", 15)->nullable();
                $table->string("correo_electronico", 80)->nullable();
                $table->date("fecha_ingreso")->nullable();
                $table->string("contrato", 250)->nullable();
                $table->string("numero_empleado", 100)->nullable();
                $table->string("password", 250)->nullable();
                $table->string("calle", 50)->nullable();
                $table->string("num_ext", 50)->nullable();
                $table->string("num_int", 10)->nullable();
                $table->string("colonia", 50)->nullable();
                $table->string("cp", 50)->nullable();
                $table->string("municipio", 50)->nullable();
                $table->string("estado", 50)->nullable();
                $table->boolean("estatus")->nullable();
                $table->timestamps();

                //definir fk
                $table->foreign("rol_id")->references("id")->on("roles");
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
        Schema::dropIfExists('empleados');
    }
};
