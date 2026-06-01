<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;

use App\Models\Abonimi;
use App\Models\LlogariHostings;

#[Signature('app:check-abonimi-skaduar')]
#[Description('Kontrollo abonimet e skaduara, \n Ne rast se abonimi ka `auto_rinovim = true` ateher provojm te marrim nga klienti fonded e duhura per ta vazhduar abonimin. Nese fonded nuk mjaftojne abonimi ndalet. \n Ne rast se abonimi ka `auto_rinovim = false` ateher abonimi skadohet')]
class CheckAbonimiSkaduar extends Command
{
    /**
     * Execute the console command.
     */

    // Rrnoft qeky dokumentim: https://laravel.com/docs/13.x/artisan#writing-commands
    public function handle()
    {
        // $abonimet = Abonimi::where('data_skadimit' < now())->get();
        $abonimet = Abonimi::where('data_skadimit', '<', now())
            ->whereNotIn('statusi', ['skaduar', 'ndalur', 'suspenduar'])
            ->with('klienti')
            ->get();
            
        if ($abonimet->isEmpty()) {
            $this->info("Asnje abonim nuk u gjet.");
            return 0;
        }

        $this->info("Gjeta " . $abonimet->count() . " abonime te skaduara");

        DB::transaction(function () use ($abonimet) {
            foreach ($abonimet as $a) {
                $klienti = $a->klienti;
                $this->info("Procesojm abonimin me id: {$a->id}");

                if ($a->auto_rinovim) {
                    if ($klienti && $klienti->bilanci >= $a->cmimi) {
                        $klienti->bilanci -= $a->cmimi;
                        $klienti->save();

                        if ($a->periudha == "mujore") {
                            $a->data_skadimit = now()->addMonth();
                        } else {
                            $a->data_skadimit = now()->addYear();
                        }
                        $a->statusi = 'aktiv';
                        $a->save();

                        $this->info("Abonimi i rinovua per klientin {$klienti->id}. Bilanci tash: {$klienti->bilanci}");

                        $llogariHosting = LlogariHostings::where('abonimi_id', $a->id)->first();
                        if($llogariHosting) {
                            $llogariHosting->statusi = 'aktiv';
                            $llogariHosting->save();
                        }
                    } else {
                        $a->statusi = 'skaduar';
                        $a->save();

                        $this->info("Klienti {$klienti->id}. Nuk ka bilanc te mjaftueshem: {$klienti->bilanci}");

                        $llogariHosting = LlogariHostings::where('abonimi_id', $a->id)->first();
                        if($llogariHosting) {
                            $llogariHosting->statusi = 'jo-aktiv';
                            $llogariHosting->save();
                        }
                    }
                } else {
                    $a->statusi = 'skaduar';
                    $a->save();

                    $this->info("Abonimi {$a->id} skadoi per klientin {$klienti->id}");

                    $llogariHosting = LlogariHostings::where('abonimi_id', $a->id)->first();
                    if($llogariHosting) {
                        $llogariHosting->statusi = 'jo-aktiv';
                        $llogariHosting->save();
                    }
                }
            }
        });

        $this->info("Procesimi perfundoi!");
    }
}
