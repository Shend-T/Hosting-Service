<?php

namespace App\Mail;

use App\Models\Faktura;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class FakturaEmail extends Mailable
{
    use Queueable, SerializesModels;

    public Faktura $faktura;

    public function __construct(Faktura $faktura)
    {
        $this->faktura = $faktura;
    }

    public function build()
    {
        return $this
            ->subject('Faturë #INV-' . str_pad($this->faktura->id, 7, '0', STR_PAD_LEFT))
            ->view('emails.faktura')
            ->with(['faktura' => $this->faktura]);
    }
}