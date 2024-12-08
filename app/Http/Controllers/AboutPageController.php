<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\AboutPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class AboutPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            "title" => 'required|string',
            "content" => 'required|string',
        ]);

        $paper = AboutPage::create([
            'title'=>$data['title'],
            'content'=>$data['content'],
        ]);

        return Redirect::route('pages.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(AboutPage $aboutPage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AboutPage $aboutPage)
    {
        return Inertia::render('AppPages/Edit', [
            'page' => $aboutPage,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AboutPage $aboutPage)
    {
        $rules = [
            "title" => 'required|string',
            "content" => 'required|string',
        ];
        $data = $request->validate($rules);

        $aboutPage->fill([
            'title'=>$data['title'],
            'content'=>$data['content'],
        ]);
        $aboutPage->save();
        return Redirect::route('pages.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AboutPage $aboutPage)
    {
        $aboutPage->delete();
        return redirect()->route('pages.index');

    }
}
