<?php

namespace App\Providers;

use Inertia\Inertia;
use App\Models\IdeaPage;
use App\Models\WorkPage;
use App\Models\AboutPage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        app()->usePublicPath(base_path('public_html'));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'allPages'=>[
                PAGE_TYPE_ABOUT => AboutPage::all(),
                PAGE_TYPE_IDEA => IdeaPage::with('banner')->get(),
                PAGE_TYPE_WORK => WorkPage::with('banner')->get(),
            ]
        ]);
    }
}
