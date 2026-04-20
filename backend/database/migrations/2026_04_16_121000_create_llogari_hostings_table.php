<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// LlogariHosting (id (PK), emri, statusi, hapesira_disk_gb, klienti_id (FK), paketa_id (FK), server_id (FK))
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('llogari_hostings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('abonimi_id')->constrained('abonimi')->cascadeOnDelete();
            $table->foreignId('server_id')->constrained('servers')->cascadeOnDelete();

            $table->string('username');
            $table->integer('hapesira_perdorur');
            $table->integer('bandwith_perdorur');
            $table->date('data_krijimit');

            $table->enum('statusi', ['aktiv', 'jo-aktiv'])->default('aktiv');
            $table->string('ip_dedikuar')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('llogari_hostings');
    }
};

