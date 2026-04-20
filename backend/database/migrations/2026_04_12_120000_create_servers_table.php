<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('servers', function (Blueprint $table) {
            $table->id();
            $table->string('emri');
            $table->string('ip_adresa')->unique();
            $table->enum('lloji', ['web', 'mail'])->default('web');
            $table->enum('sistemi_operativ', ['ubuntu', 'debian', 'rhel'])->default('ubuntu');
            $table->unsignedInteger('ram_gb');
            $table->integer('cpu_core');
            $table->integer('hapesira_tb');
            $table->string('lokacioni');
            $table->enum('statusi', ['aktiv', 'jo-aktiv', 'suspenduar'])->default('aktiv');
            $table->date('data_instalimit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('servers');
    }
};
