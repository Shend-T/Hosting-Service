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
    Schema::create('faturat', function (Blueprint $table) {
        $table->id();
        $table->foreignId('klienti_id')->constrained('klienti')->onDelete('cascade');
        $table->foreignId('abonimi_id')->constrained('abonimi')->onDelete('cascade');
        $table->decimal('shuma', 10, 2);
        $table->timestamp('data_leshimit')->useCurrent();
        $table->timestamp('data_skadimit')->nullable();
        $table->enum('statusi', ['paguar', 'papaguar', 'anuluar'])->default('papaguar');
        $table->text('pershkrimi')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fakturas');
    }
};
