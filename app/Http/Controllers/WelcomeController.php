<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Paper;
use App\Models\IdeaPage;
use App\Models\WorkPage;
use App\Models\AboutPage;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'papers' => Paper::with('banner')->orderBy('created_at', 'DESC')->limit(3)->get(),
        ]);
    }

    public function trendings()
    {
        return Inertia::render('Trendings/Index', [
            'papers' => Paper::with('banner')->orderBy('created_at', 'DESC')->get(),
        ]);
    }

    public function about()
    {
        return Inertia::render('About/Index', [
            'pages' => AboutPage::orderBy('created_at', 'DESC')->get(),
        ]);
    }

    public function works()
    {
        return Inertia::render('Works/Index', [
            'pages' => WorkPage::with('banner')->orderBy('created_at', 'DESC')->get(),
        ]);
    }

    public function ideas()
    {
        return Inertia::render('Ideas/Index', [
            'pages' => IdeaPage::with('banner')->orderBy('created_at', 'DESC')->get(),
        ]);
    }

    public function showTrending($id)
    {
        $paper = Paper::with('banner')->find($id);
        return Inertia::render('Trendings/Show', [
            'paper' => $paper,
            'otherPapers' => Paper::where('id', '!=', $id)->get()
        ]);
    }

    public function showAbout($id)
    {
        $page = AboutPage::find($id);
        return Inertia::render('About/Show', [
            'page' => $page,
        ]);
    }

    public function showWork($id)
    {
        $page = WorkPage::with('banner')->find($id);
        return Inertia::render('Works/Show', [
            'page' => $page,
        ]);
    }

    public function showIdea($id)
    {
        $page = IdeaPage::with('banner')->find($id);
        return Inertia::render('Ideas/Show', [
            'page' => $page,
        ]);
    }
}
