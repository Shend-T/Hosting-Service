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
            $table->foreignId('server_id')->constrained('servers')->cascadeOnDelete();

            $table->decimal('cpu_usage', 10, 2);
            $table->decimal('ram_usage', 10, 2);
            $table->decimal('disk_usage', 10, 2);

            $table->enum('statusi', ['normal', 'warning', 'kritik'])->default('normal');
            $table->timestamp('checked_at');
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

