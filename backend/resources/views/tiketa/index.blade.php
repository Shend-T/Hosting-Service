<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tiketa e Suportit</title>
</head>
<body>

    <h1>Tiketa e Suportit</h1>

    <a href="/tiketa/create">+ Shto Tiket te Ri</a>

    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Titulli</th>
                <th>Klienti</th>
                <th>Prioriteti</th>
                <th>Statusi</th>
                <th>Data Hapjes</th>
                <th>Veprimet</th>
            </tr>
        </thead>
        <tbody>
            @foreach($tiketa as $tiketi)
            <tr>
                <td>{{ $tiketi->id }}</td>
                <td>{{ $tiketi->titulli }}</td>
                <td>{{ $tiketi->klienti->emri ?? 'N/A' }}</td>
                <td>{{ $tiketi->prioriteti }}</td>
                <td>{{ $tiketi->statusi }}</td>
                <td>{{ $tiketi->data_hapjes }}</td>
                <td>
                    <a href="/tiketa/{{ $tiketi->id }}">Shiko</a>
                    <a href="/tiketa/{{ $tiketi->id }}/edit">Edito</a>
                    <form action="/tiketa/{{ $tiketi->id }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Je i sigurt?')">Fshi</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>