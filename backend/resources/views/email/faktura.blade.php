<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faturë #{{ $faktura->id }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; background: #ffffff; color: #1a1a2e; }

        .header {
            background: #c8c8e8;
            padding: 30px 40px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .header .logo h1 { font-size: 28px; font-weight: bold; color: #1a1a2e; }
        .header .logo p { font-size: 13px; color: #444; margin-top: 4px; }
        .header .invoice-info { text-align: right; }
        .header .invoice-info .label { font-size: 11px; letter-spacing: 2px; color: #555; text-transform: uppercase; }
        .header .invoice-info .inv-number { font-size: 26px; font-weight: bold; color: #1a1a2e; }
        .status-badge {
            display: inline-block;
            margin-top: 8px;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            background: #1a1a2e;
            color: #fff;
        }

        .body { padding: 40px; }

        .info-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
        }
        .info-block { width: 48%; }
        .info-block .section-label {
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #888;
            margin-bottom: 12px;
        }
        .info-block h2 { font-size: 20px; margin-bottom: 4px; }
        .info-block p { font-size: 14px; color: #444; margin-bottom: 3px; }
        .info-block .detail-row {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            padding: 6px 0;
            border-bottom: 1px solid #eee;
        }
        .info-block .detail-row span:first-child { color: #888; }

        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        thead tr {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
        }
        thead th {
            padding: 12px 8px;
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #888;
            text-align: left;
        }
        thead th:last-child { text-align: right; }
        tbody tr { border-bottom: 1px solid #f0f0f0; }
        tbody td { padding: 16px 8px; font-size: 14px; vertical-align: top; }
        tbody td .service-name { font-weight: bold; font-size: 15px; }
        tbody td .service-desc { font-size: 12px; color: #888; margin-top: 3px; }
        tbody td:last-child { text-align: right; font-weight: bold; }

        .paketa-badge {
            display: inline-block;
            padding: 3px 12px;
            border-radius: 12px;
            font-size: 12px;
            border: 1px solid #ccc;
            color: #555;
        }

        .totals {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 40px;
        }
        .totals-box { width: 300px; }
        .totals-box .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 14px;
            border-bottom: 1px solid #eee;
            color: #555;
        }
        .totals-box .total-row.final {
            font-size: 18px;
            font-weight: bold;
            color: #7c6fcd;
            border-bottom: none;
            padding-top: 12px;
        }

        .footer {
            border-top: 1px solid #eee;
            padding-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .payment-methods .section-label {
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #888;
            margin-bottom: 12px;
        }
        .payment-methods .methods {
            display: flex;
            gap: 20px;
        }
        .payment-methods .methods span {
            font-size: 14px;
            color: #333;
        }
    </style>
</head>
<body>

    {{-- HEADER --}}
    <div class="header">
        <div class="logo">
            <h1>HostingPro</h1>
            <p>hosting.pro · support@hosting.pro</p>
            <p>Rr. Lidhja e Prizrenit 14, Prishtinë</p>
        </div>
        <div class="invoice-info">
            <div class="label">Faturë</div>
            <div class="inv-number">#INV-{{ str_pad($faktura->id, 7, '0', STR_PAD_LEFT) }}</div>
            <span class="status-badge">
                {{ ucfirst($faktura->statusi) }}
            </span>
        </div>
    </div>

    <div class="body">

        {{-- CLIENT + DETAILS --}}
        <div class="info-section">
            <div class="info-block">
                <div class="section-label">Faturuar për</div>
                <h2>{{ $faktura->klienti->emri }}</h2>
                <p>{{ $faktura->klienti->kompania ?? '' }}</p>
                <p>{{ $faktura->klienti->email }}</p>
                <p>{{ $faktura->klienti->telefoni ?? '' }}</p>
            </div>
            <div class="info-block">
                <div class="section-label">Detajet</div>
                <div class="detail-row">
                    <span>Data e faturës</span>
                    <span>{{ \Carbon\Carbon::parse($faktura->data_leshimit)->format('d M Y') }}</span>
                </div>
                <div class="detail-row">
                    <span>Data e pagesës</span>
                    <span>{{ \Carbon\Carbon::parse($faktura->data_skadimit)->format('d M Y') }}</span>
                </div>
                <div class="detail-row">
                    <span>Periudha</span>
                    <span>{{ ucfirst($faktura->abonimi->periudha ?? 'Mujore') }}</span>
                </div>
                <div class="detail-row">
                    <span>Abonimi ID</span>
                    <span>#AB-{{ str_pad($faktura->abonimi_id, 5, '0', STR_PAD_LEFT) }}</span>
                </div>
            </div>
        </div>

        {{-- SERVICES TABLE --}}
        <table>
            <thead>
                <tr>
                    <th>Shërbimi</th>
                    <th>Paketa</th>
                    <th>Periudha</th>
                    <th>Sasia</th>
                    <th>Çmimi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="service-name">{{ $faktura->abonimi->paketa->emri ?? 'Shërbim' }}</div>
                        <div class="service-desc">{{ $faktura->pershkrimi }}</div>
                    </td>
                    <td><span class="paketa-badge">{{ $faktura->abonimi->paketa->kategoria ?? '-' }}</span></td>
                    <td>{{ ucfirst($faktura->abonimi->periudha ?? '-') }}</td>
                    <td>1</td>
                    <td>€{{ number_format($faktura->shuma, 2) }}</td>
                </tr>
            </tbody>
        </table>

        {{-- TOTALS --}}
        @php
            $tvsh = $faktura->shuma * 0.18;
            $totali = $faktura->shuma + $tvsh;
        @endphp
        <div class="totals">
            <div class="totals-box">
                <div class="total-row">
                    <span>Nëntotali</span>
                    <span>€{{ number_format($faktura->shuma, 2) }}</span>
                </div>
                <div class="total-row">
                    <span>TVSH (18%)</span>
                    <span>€{{ number_format($tvsh, 2) }}</span>
                </div>
                <div class="total-row final">
                    <span>Totali</span>
                    <span>€{{ number_format($totali, 2) }}</span>
                </div>
            </div>
        </div>

        {{-- FOOTER --}}
        <div class="footer">
            <div class="payment-methods">
                <div class="section-label">Metoda e Pagesës</div>
                <div class="methods">
                    <span>Kartë krediti</span>
                    <span>PayPal</span>
                    <span>Transfer bankar</span>
                </div>
            </div>
        </div>

    </div>

</body>
</html>