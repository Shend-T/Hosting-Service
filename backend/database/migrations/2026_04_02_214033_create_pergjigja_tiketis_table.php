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
        Schema::create('pergjigja_tiketis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tiketi_id')->constrained('tiketis')->onDelete('cascade');
            $table->string('autori');
            $table->text('mesazhi');
            $table->timestamp('data_hapjes')->useCurrent();
            $table->timestamp('data_mbylljes')->nullable();
            //$table->enum('statusi', ['hapur', 'ne_proces', 'mbyllur'])->default('hapur'); -- nese na duhet spe sho tnevojshme niher. 
            $table->enum('lloji', ['klient', 'admin'])->default('klient'); 
            $table->text('pergjigja');
            $table->string('bashkengjitja')->nullable(); // Mund te ruajme path-in e file-it te bashkengjitur nese ka nevoje per bashkengjitje (p.sh. screenshot, dokument, etj.) pse ne string sepse mund te jete file i madh dhe nuk eshte e nevojshme te ruhet ne database, por vetem path-i i tij. por mund ta ruajme edhe me byte.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pergjigja_tiketis');
    }
};
