<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shto Tiket te Re</title>
</head>
<body>

    <h1>Shto Tiket te Re</h1>

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

    <form action="/tiketa" method="POST">
        @csrf

        <div>
            <label>Klienti:</label>
            <select name="klienti_id" required>
                <option value="">-- Zgjedh Klientin --</option>
                @foreach($klientet as $klienti)
                    <option value="{{ $klienti->id }}">{{ $klienti->emri }}</option>
                @endforeach
            </select>
        </div>

        <div>
            <label>Titulli:</label>
            <input type="text" name="titulli" value="{{ old('titulli') }}" required>
        </div>

        <div>
            <label>Pershkrimi:</label>
            <textarea name="pershkrimi" rows="5" required>{{ old('pershkrimi') }}</textarea>
        </div>

        <div>
            <label>Prioriteti:</label>
            <select name="prioriteti" required>
                <option value="i_ulet">I ulet</option>
                <option value="normal" selected>Normal</option>
                <option value="i_larte">I larte</option>
                <option value="urgjent">Urgjent</option>
            </select>
        </div>

        <div>
            <label>Kategoria:</label>
            <input type="text" name="kategoria" value="{{ old('kategoria') }}" required>
        </div>

        <button type="submit">Ruaj Tiketin</button>
    </form>

</body>
</html>