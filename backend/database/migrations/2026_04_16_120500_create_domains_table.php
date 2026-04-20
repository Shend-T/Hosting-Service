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
            $table->foreignId('klienti_id')->constrained('klienti')->cascadeOnDelete();

            $table->string('emri_domainit');
            $table->string('tld')->default(".ubt"); // Top-Level Domain
            $table->string('nameserverat');

            $table->enum('statusi', ['aktiv', 'jo-aktiv', 'suspenduar'])->default('aktiv');

            $table->date('data_regjistrimit');
            $table->date('data_skadimit');
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

