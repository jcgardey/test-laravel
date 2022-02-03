<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Retrieves the user with the email (if exists) or create and store a new user.
     *
     */
    public function store(Request $request)
    {
        return User::firstOrCreate(['email' => $request->input('email'), 'password' => $request->input('password'), 'name' => $request->input('email') ]);
    }
}