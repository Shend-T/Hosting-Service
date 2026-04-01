<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Abonimi (abonimi_id (PK), klienti_id (FK), paketa_id (FK), data_fillimit, data_skadimit, statusi, cmimi, periudha, auto_rinovim)
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('abonimi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('klienti_id')->constrained('klienti')->cascadeOnDelete();
            $table->foreignId('paketa_id')->constrained('paketa')->cascadeOnDelete();
            $table->date('data_fillimit');
            $table->date('data_skadimit');
            $table->enum('statusi', [
                'pritje',
                'aktiv',
                'suspenduar',
                'skaduar',
                'ndalur'
            ])->default('pritje');
            $table->decimal('cmimi', 10, 2)->default(0);
            $table->enum('periudha', ['mujore', 'vjetore']);
            $table->boolean('auto_rinovim')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abonimi');
    }
};
