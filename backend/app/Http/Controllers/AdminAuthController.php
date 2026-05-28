<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('email', $request->email)->first();
        // if (!Auth::guard('admin')->attempt($request->only('email', 'password'))) {
        //     return response()->json(['message' => 'Email ose pass gabim!'], 401);
        // }
        if (!$admin || !\Hash::check($request->password, $admin->password)) {
            return response()->json(['message' => 'Email ose pass gabim!'], 401);
        }
        
        $token = $admin->createToken('admin_token', ['admin'])->plainTextToken;

        return response()->json([
            'admin' => $admin,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out me sukses']);
    }

    public function me(Request $request)
    {
        if ($request->user()->tokenCan("admin")) {
            return response()->json($request->user());
        } else {
            return response()->json(['message' => 'I pa autorizuar'], 403);
        }
    }
}
