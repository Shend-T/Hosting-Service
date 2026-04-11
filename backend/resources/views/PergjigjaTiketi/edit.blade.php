<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <title>Edito Pergjigjen</title>
</head>
<body>
    <h1>Edito Pergjigjen</h1>
    <a href="/tiketa/{{ $pergjigjaTiketi->tiketi_id }}">← Kthehu</a>
    <hr>

    @if($errors->any())
        <div style="color: red;">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="/pergjigja_tiketi/{{ $pergjigjaTiketi->id }}" method="POST">
        @csrf
        @method('PUT')

        <div>
            <label>Autori:</label>
            <input type="text" name="autori" value="{{ old('autori', $pergjigjaTiketi->autori) }}" required maxlength="100">
        </div>

        <div>
            <label>Mesazhi:</label>
            <textarea name="mesazhi" rows="3" required>{{ old('mesazhi', $pergjigjaTiketi->mesazhi) }}</textarea>
        </div>

        <div>
            <label>Pergjigja:</label>
            <textarea name="pergjigja" rows="5" required>{{ old('pergjigja', $pergjigjaTiketi->pergjigja) }}</textarea>
        </div>

        <button type="submit">Ruaj Ndryshimet</button>
    </form>
</body>
</html>