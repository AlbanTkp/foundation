<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\IdeaPage;
use App\Models\WorkPage;
use App\Models\AboutPage;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $about_pages = AboutPage::orderBy('created_at','ASC')->get();
        $work_pages = WorkPage::with('banner')->orderBy('created_at','DESC')->get();
        $idea_pages = IdeaPage::with('banner')->orderBy('created_at','ASC')->get();
        // dd($idea_pages);
        return Inertia::render('AppPages/Index', [
            'workPages' => $work_pages,
            'ideaPages' => $idea_pages,
            'aboutPages' => $about_pages,
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function create()
    {
        return Inertia::render('AppPages/Edit',[
            'pageCategories' => [
                PAGE_TYPE_WORK=>[WORK_CATEGORY_PLACES,WORK_CATEGORY_PROGRAM], 
                PAGE_TYPE_IDEA=>[IDEA_CATEGORY_FEATURED,IDEA_CATEGORY_POPULAR], 
            ],
        ]);
    }
}
