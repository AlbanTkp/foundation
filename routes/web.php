<?php

use App\Http\Controllers\AboutPageController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PaperController;
use App\Http\Controllers\AppPageController;
use App\Http\Controllers\IdeaPageController;
use App\Http\Controllers\NavMenuController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\WorkPageController;
use App\Models\IdeaPage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome2', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
Route::get('/about', [WelcomeController::class, 'about'])->name('about.index');
Route::get('/works', [WelcomeController::class, 'works'])->name('works.index');
Route::get('/ideas', [WelcomeController::class, 'ideas'])->name('ideas.index');
Route::get('/trendings', [WelcomeController::class, 'trendings'])->name('trendings.index');
Route::get('/about/{id}', [WelcomeController::class, 'showAbout'])->name('about.show');
Route::get('/works/{id}', [WelcomeController::class, 'showWork'])->name('works.show');
Route::get('/ideas/{id}', [WelcomeController::class, 'showIdea'])->name('ideas.show');
Route::get('/trendings/{id}', [WelcomeController::class, 'showTrending'])->name('trendings.show');

Route::middleware('auth')->group(function () {
    Route::resource('workPages', WorkPageController::class);
    Route::resource('aboutPages', AboutPageController::class);
    Route::resource('ideaPages', IdeaPageController::class);
    Route::resource('pages', PageController::class);
    Route::resource('papers', PaperController::class);
    Route::resource('files', FileController::class);
});

require __DIR__.'/auth.php';
