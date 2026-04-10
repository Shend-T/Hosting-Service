<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edito Tiketin</title>
</head>
<body>

    <h1>Edito Tiketin</h1>

    <a href="/tiketa">← Kthehu</a>

    @if($errors->any())
        <div style="color: red;">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="/tiketa/{{ $tiketi->id }}" method="POST">
        @csrf
        @method('PUT')

        <div>
            <label>Klienti:</label>
            <select name="klienti_id" required>
                <option value="">-- Zgjedh Klientin --</option>
                @foreach($klientet as $klienti)
                    <option value="{{ $klienti->id }}" 
                        {{ $tiketi->klienti_id == $klienti->id ? 'selected' : '' }}>
                        {{ $klienti->emri }}
                    </option>
                @endforeach
            </select>
        </div>

        <div>
            <label>Titulli:</label>
            <input type="text" name="titulli" value="{{ old('titulli', $tiketi->titulli) }}" required>
        </div>

        <div>
            <label>Pershkrimi:</label>
            <textarea name="pershkrimi" rows="5" required>{{ old('pershkrimi', $tiketi->pershkrimi) }}</textarea>
        </div>

        <div>
            <label>Prioriteti:</label>
            <select name="prioriteti" required>
                <option value="i_ulet" {{ $tiketi->prioriteti == 'i_ulet' ? 'selected' : '' }}>I ulet</option>
                <option value="normal" {{ $tiketi->prioriteti ==