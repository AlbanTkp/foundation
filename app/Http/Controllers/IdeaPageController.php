<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Banner;
use App\Models\IdeaPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class IdeaPageController extends Controller
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
            'banner' => 'required|file|mimes:jpg,jpeg,png,mp4,mov,avi|max:20480',
            "title" => 'required|string',
            "description" => 'required|string',
            "content" => 'required|string',
            "category" => "required|in:".IDEA_CATEGORY_FEATURED.",".IDEA_CATEGORY_POPULAR,
        ]);

        if ($request->file('banner')->isValid()) {
            $banner = $request->file('banner');
            // $banner_path = $banner->store('uploads');
            $banner_path = $banner->store('uploads', 'public');
            $mime = $banner->getMimeType();
            $type = str_contains($mime, 'image') ? 'image' : (str_contains($mime, 'video') ? 'video' : '');
            $b = Banner::create([
                'path'=>url(Storage::url($banner_path)),
                'type'=>$type
            ]);

        }else{
            return response()->json(['message' => 'File upload failed'], 400);
        }

        $page = IdeaPage::create([
            'banner_id'=>$b->id,
            'title'=>$data['title'],
            'description'=>$data['description'],
            'content'=>$data['content'],
            'category'=>$data['category'],
        ]);

        return Redirect::route('pages.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(IdeaPage $ideaPage)
    {
        return Inertia::render('AppPages/Edit', [
            'pageCategories' => [
                PAGE_TYPE_IDEA=>[IDEA_CATEGORY_FEATURED,IDEA_CATEGORY_POPULAR], 
            ],
            'page' => $ideaPage,
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(IdeaPage $ideaPage)
    {
        $ideaPage->load('banner');
        return Inertia::render('AppPages/Edit', [
            'pageCategories' => [
                PAGE_TYPE_IDEA=>[IDEA_CATEGORY_FEATURED,IDEA_CATEGORY_POPULAR], 
            ],
            'page' => $ideaPage,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, IdeaPage $ideaPage)
    {
        // dd($request->all());
        $rules = [
            "title" => 'required|string',
            "description" => 'required|string',
            "content" => 'required|string',
            "category" => "required|in:".IDEA_CATEGORY_FEATURED.",".IDEA_CATEGORY_POPULAR,
        ];
        if($request->hasFile('banner')){
            $rules['banner'] = 'file|mimes:jpg,jpeg,png,mp4,mov,avi|max:20480';
        }
        $data = $request->validate($rules);
        if($request->hasFile('banner')){
            if ($request->file('banner')->isValid()) {
                $banner = $request->file('banner');
                $banner_path = $banner->store('uploads', 'public');
                $mime = $banner->getMimeType();
                $type = str_contains($mime, 'image') ? 'image' : (str_contains($mime, 'video') ? 'video' : '');
                $b = Banner::create([
                    'path'=>url(Storage::url($banner_path)),
                    'type'=>$type
                ]);
                $ideaPage->banner_id = $b->id;
            }else{
                return response()->json(['message' => 'File upload failed'], 400);
            }
        }

        $ideaPage->fill([
            'title'=>$data['title'],
            'content'=>$data['content'],
            'description'=>$data['description'],
            'category'=>$data['category'],
        ]);
        $ideaPage->save();
        return Redirect::route('pages.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IdeaPage $ideaPage)
    {
        $ideaPage->delete();
        return redirect()->route('pages.index');
    }
}
