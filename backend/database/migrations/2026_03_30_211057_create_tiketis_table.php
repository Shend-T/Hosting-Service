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
    Schema::create('tiketis', function (Blueprint $table) {
        $table->id();
        $table->foreignId('klienti_id')->constrained('klienti')->onDelete('cascade');
        $table->unsignedBigInteger('llogaria_id')->nullable();
        $table->string('titulli');
        $table->text('pershkrimi');
        $table->enum('prioriteti', ['i_ulet', 'normal', 'i_larte', 'urgjent'])->default('normal');
        $table->enum('statusi', ['hapur', 'ne_proces', 'mbyllur'])->default('hapur');
        $table->timestamp('data_hapjes')->useCurrent();
        $table->timestamp('data_mbylljes')->nullable();
        $table->string('kategoria');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tiketis');
    }
};
