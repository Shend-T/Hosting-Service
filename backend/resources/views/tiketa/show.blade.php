<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <title>{{ $tiketi->titulli }}</title>
</head>
<body>
    <h1>{{ $tiketi->titulli }}</h1>
    <a href="/tiketa">← Kthehu</a>
    <a href="/tiketa/{{ $tiketi->id }}/edit">Edito</a>
    <hr>

    <table border="1">
        <tr><th>ID</th><td>{{ $tiketi->id }}</td></tr>
        <tr><th>Klienti</th><td>{{ $tiketi->klienti->emri ?? 'N/A' }}</td></tr>
        <tr><th>Pershkrimi</th><td>{{ $tiketi->pershkrimi }}</td></tr>
        <tr><th>Prioriteti</th><td>{{ $tiketi->prioriteti }}</td></tr>
        <tr><th>Statusi</th><td>{{ $tiketi->statusi }}</td></tr>
        <tr><th>Kategoria</th><td>{{ $tiketi->kategoria }}</td></tr>
        <tr><th>Data Hapjes</th><td>{{ $tiketi->data_hapjes }}</td></tr>
        <tr><th>Data Mbylljes</th><td>{{ $tiketi->data_mbylljes ?? 'Akoma hapur' }}</td></tr>
    </table>
    <hr>

    {{-- REPLIES SECTION --}}
    <h2>Pergjigjet</h2>

    @if($tiketi->pergjigjet->isEmpty())
        <p>Nuk ka pergjigje akoma.</p>
    @else
        @foreach($tiketi->pergjigjet as $pergjigja)
            <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                <strong>{{ $pergjigja->autori }}</strong>
                <small style="color: gray;">— {{ $pergjigja->data_hapjes }}</small>
                <p>{{ $pergjigja->pergjigja }}</p>

                @if($pergjigja->bashkengjitja)
                    <a href="{{ asset('storage/' . $pergjigja->bashkengjitja) }}" target="_blank">
                        📎 Shiko Bashkengjitjen
                    </a>
                @endif

                {{-- Delete reply --}}
                <form action="/pergjigja_tiketi/{{ $pergjigja->id }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" onclick="return confirm('Fshi pergjigjen?')">Fshi</button>
                </form>
                {{-- Edit reply --}}
                <form action="/pergjigja_tiketi/{{ $pergjigja->id }}/edit" method="GET" style="display:inline;">
                    @csrf
                    @method('GET')
                    <button type="submit" onclick="return confirm('Redakto pergjigjen?')">Edit</button>
                </form>
            </div>
        @endforeach
    @endif

    <hr>

    {{-- ADD REPLY FORM --}}
    <h3>Shto Pergjigje</h3>

    @if($errors->any())
        <div style="color: red;">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="/pergjigja_tiketi" method="POST" enctype="multipart/form-data">
        @csrf

        {{-- Hidden field — automatically links reply to this ticket --}}
        <input type="hidden" name="tiketi_id" value="{{ $tiketi->id }}">

        <div>
            <label>Autori:</label>
            <input type="text" name="autori" value="{{ old('autori') }}" required maxlength="100">
        </div>

        <div>
            <label>Mesazhi:</label>
            <textarea name="mesazhi" rows="3" required>{{ old('mesazhi') }}</textarea>
        </div>

        <div>
            <label>Pergjigja:</label>
            <textarea name="pergjigja" rows="5" required>{{ old('pergjigja') }}</textarea>
        </div>

        <div>
            <label>Bashkengjitja (opcional):</label>
            <input type="file" name="bashkengjitja" accept=".pdf,.jpg,.png,.docx">
        </div>

        <button type="submit" onclick="return confirm('Dërgo pergjigjen? Shiko per ndonje gabim')">Dërgo Pergjigjen</button>
    </form>

    <hr>

    {{-- DELETE TICKET --}}
    <form action="/tiketa/{{ $tiketi->id }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit" onclick="return confirm('Je i sigurt?')">Fshi Tiketin</button>
    </form>
</body>
</html>