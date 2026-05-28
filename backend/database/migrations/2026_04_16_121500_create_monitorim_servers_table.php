<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// MonitorimServer (id (PK), server_id (FK), cpu_usage, ram_usage, disk_usage, statusi, checked_at)
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('monitorim_servers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('serveri_id')->constrained('servers')->cascadeOnDelete();
            $table->decimal('cpu_perdorim', 5, 2)->default(0);
            $table->decimal('ram_perdorim', 5, 2)->default(0);
            $table->decimal('disk_perdorim', 5, 2)->default(0);
            $table->integer('bandwidth')->default(0);
            $table->enum('statusi', ['monitoron', 'nuk monitoron'])->default('nuk monitoron');
            $table->boolean('alarmi')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitorim_servers');
    }
};

