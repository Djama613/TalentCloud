<?php

namespace App\Services\Validation;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

class PasswordCorrectRule implements Rule
{
    public function passes($attribute, $value)
    {
        return Hash::check($value, Auth::user()->getAuthPassword());
    }

    public function message()
    {
        return Lang::get('validation.custom.password_correct');
    }
}
