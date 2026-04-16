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
            $table->string('emri');
            $table->enum('statusi', ['aktiv', 'jo-aktiv', 'suspenduar'])->default('aktiv');
            $table->unsignedInteger('hapesira_disk_gb');

            $table->foreignId('klienti_id')->constrained('klienti')->cascadeOnDelete();
            $table->foreignId('paketa_id')->constrained('paketa')->cascadeOnDelete();
            $table->foreignId('server_id')->constrained('servers')->cascadeOnDelete();

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

