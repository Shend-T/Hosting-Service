<?php

namespace App\Http\Controllers;

use App\Models\Klienti;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'emri'      => 'required|string|max:255',
            'mbiemri'   => 'required|string|max:255',
            'kompania'  => 'required|string|max:255',
            'email'     => 'required|email|unique:klienti,email',
            'password'  => 'required|min:8|confirmed', // qekjo 'confirmed' lyp qe prej frontend my dergu password edhe confirm_password
            'telefoni'  => 'required|string|max:20',
            'adresa'    => 'required|string|max:255',
            // statusi edhe bilanci by default caktohen( se user-i nuk mundet me shtu nbilanc kur e krijon account-in, ajo bohet mandej, edhe statusi nfillim esht aktiv, se nuk ka arsyje mos me qen qashtu)
        ]);

        $klienti = Klienti::create($data);

        $token = $klienti->createToken('auth_token')->plainTextToken;

        return response()->json([
            'klienti' => $klienti,
            'token'   => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::guard('web')->attempt([
            'email'    => $request->email,
            'password' => $request->password,
        ])) {
            return response()->json([
                'message' => 'Password-i per ket email eshte gabim'
            ], 401);
        }

        $klienti = Klienti::where('email', $request->email)->first();
        $token = $klienti->createToken('auth_token')->plainTextToken;

        return response()->json([
            'klienti' => $klienti,
            'token'   => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete(); // Fshin krejt tokenat per ket user( klient)

        return response()->json([
            'message' => 'Logged out successfully' // spo di shqip qysh thuhet
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
