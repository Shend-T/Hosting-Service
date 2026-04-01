<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Klienti (klienti_id (PK), emri, mbiemri, kompania, email, telefoni, adresa, data_regjistrimit, statusi, bilanci)
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('klienti', function (Blueprint $table) {
            $table->id();
            $table->string('emri');
            $table->string('mbiemri');
            $table->string('kompania');
            $table->string('email')->unique();
            $table->string('telefoni'); // String pasi qe do te kerkohet qe nr i user-it m'ja nis me +000 
            $table->string('adresa');
            $table->timestamp('data_regjistrimit')->useCurrent();
            $table->enum('statusi', ['aktiv', 'jo-aktiv', 'suspenduar'])->default('aktiv');
            $table->decimal('bilanci', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('klienti');
    }
};
