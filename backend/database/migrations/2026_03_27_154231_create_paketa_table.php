<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Paketa (paketa_id (PK), emri, pershkrimi, hapesira_gb, bandwidth_gb, nr_domaineve, nr_emaileve, ssl, cmimi_mujor, cmimi_vjetor, statusi)
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paketa', function (Blueprint $table) {
            $table->id();
            $table->string('emri');
            $table->text('pershkrimi')->nullable();

            $table->integer('hapesira_gb');
            $table->integer('bandwidth_gb');
            $table->integer('nr_domaineve');
            $table->integer('nr_emaileve');

            $table->boolean('ssl')->default(true); // Secure Sockets Layer, a ka HTTPS siguri
            $table->decimal('cmimi_mujor', 10, 2);
            $table->decimal('cmimi_vjetor', 10, 2);

            $table->enum('statusi', ['aktiv', 'jo-aktiv'])->default('aktiv');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paketa');
    }
};
