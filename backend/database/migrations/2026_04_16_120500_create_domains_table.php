<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Domain (id (PK), emri, ip_address, statusi, data_skadimit, klienti_id (FK))
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('domains', function (Blueprint $table) {
            $table->id();
            $table->string('emri');
            $table->string('ip_address');
            $table->enum('statusi', ['aktiv', 'jo-aktiv', 'suspenduar'])->default('aktiv');
            $table->date('data_skadimit');

            $table->foreignId('klienti_id')->constrained('klienti')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('domains');
    }
};

