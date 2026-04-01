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
    <h2>Pergjigjet</h2>
    <p>Nuk ka pergjigje akoma.</p>
    <hr>
    <form action="/tiketa/{{ $tiketi->id }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit" onclick="return confirm('Je i sigurt?')">Fshi Tiketin</button>
    </form>
</body>
</html>