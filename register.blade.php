@extends('layouts.app')

@section('content')

    <section
        class="auth"
        style="background-image: url('/images/bg_crowd.jpg');">

        <div
            class="register">

            <a
                class="register-return-link"
                href="/"
                title="Return Home">
                <i class="fas fa-chevron-left"></i> Return Home/Retourner <!-- Added French -->
            </a>

            <div
                class="register-heading">

                <h1>Register for Talent Cloud                         Inscrivez-vous au Talent Cloud</h1> <!--Put some blank character's here for formatting. --> 

            </div>

            <form
                action="{{ $routes['register'] }}"
                class="form__wrapper"
                method="POST">

                {{ csrf_field() }}

                <div
                    class="register-content">

                    <div
                        class="register-scroll-wrapper">

                        <div
                            class="register-copy">

                            <div
                                class="flex-grid">

                                @if ($errors->any())
                                    <div class="box full register-alert">
                                        @foreach ($errors->all() as $error)
                                            <span class="help-block">
                                                <strong>{{ $error }}</strong>
                                            </span>
                                        @endforeach
                                    </div>
                                @endif

                                <div
                                    class="box full">

                                    <div
                                        class="form__input-wrapper--float @if (old('name'))active @endif">
                                        <label
                                            class="form__label"
                                            for="name">
                                            Name
                                        </label>
                                        <input
                                            class="form__input"
                                            id="name"
                                            name="name"
                                            required
                                            type="text"
                                            value="{{ old('name') }}" />
                                    </div>

                                </div>

                                <div
                                    class="box full">

                                    <div
                                        class="form__input-wrapper--float @if (old('email'))active @endif">
                                        <label
                                            class="form__label"
                                            for="email">
                                            E-Mail Address
                                        </label>
                                        <input
                                            class="form__input"
                                            id="email"
                                            name="email"
                                            required
                                            type="email"
                                            value="{{ old('email') }}" />
                                    </div>

                                </div>

                                <div
                                    class="box full">

                                    <p>Create a password that contains at least one character from the following categories: lower-case characters (a-z), upper-case characters (A-Z), digits (0-9), and non-alphanumeric symbols (%, $, !, etc.).</p>
                                    <p>Créez un mot de passe avec au moins un caractère dans ces catégories: minuscule (a-z), majuscule (A-Z), chiffres (0-9) et symboles non alphanumériques (%, $,!, Etc.).</p>
                                        <!-- French is not a 1-to-1 translation here, slightly rewritten for grammar way-->
                                </div>

                                <div
                                    class="box med-1of2">

                                    <div
                                        class="form__input-wrapper--float">
                                        <label
                                            class="form__label"
                                            for="password">
                                            Password
                                        </label>
                                        <input
                                            class="form__input"
                                            id="password"
                                            name="password"
                                            required
                                            type="password" />
                                    </div>

                                </div>

                                <div
                                    class="box med-1of2">

                                    <div
                                        class="form__input-wrapper--float">
                                        <label
                                            class="form__label"
                                            for="password-confirm">
                                            Confirm Password <!-- Could put more french here, and in similar spots but don't wan't to make it text overload, this is a language band-aid while I learn the laravel route-fix - MJ -->
                                        </label>
                                        <input
                                            class="form__input"
                                            id="password-confirm"
                                            name="password_confirmation"
                                            required
                                            type="password" />
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div
                    class="register-action-wrapper">

                    <div
                        class="flex-grid">

                        <div
                            class="box small-1of2">

                        </div>

                        <div
                            class="box small-1of2">

                            <button
                                class="button--blue light-bg"
                                type="submit">
                                Register/S'inscrire <!-- more french -->
                            </button>

                        </div>

                    </div>

                </div>

            </form>

        </div>

        <a
            class="register-logo"
            href="/"
            title="Return to Talent Cloud.">
            <img
                alt="The Talent Cloud Logo"
                class=""
                src="/images/logo_tc_colour.png">
        </a>

    </section>

@endsection
