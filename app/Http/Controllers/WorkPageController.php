<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Banner;
use App\Models\WorkPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class WorkPageController extends Controller
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
            "category" => "required|in:".WORK_CATEGORY_PLACES.",".WORK_CATEGORY_PROGRAM,
        ]);

        if ($request->file('banner')->isValid()) {
            $banner = $request->file('banner');
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

        $page = WorkPage::create([
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
    public function show(WorkPage $workPage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WorkPage $workPage)
    {
        $workPage->load('banner');
        return Inertia::render('AppPages/Edit', [
            'pageCategories' => [
                PAGE_TYPE_WORK=>[WORK_CATEGORY_PLACES,WORK_CATEGORY_PROGRAM], 
            ],
            'page' => $workPage,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WorkPage $workPage)
    {   
        // dd($request->all());
        $rules = [
            "title" => 'required|string',
            "description" => 'required|string',
            "content" => 'required|string',
            "category" => "required|in:".WORK_CATEGORY_PLACES.",".WORK_CATEGORY_PROGRAM,
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
                $workPage->banner_id = $b->id;
            }else{
                return response()->json(['message' => 'File upload failed'], 400);
            }
        }

        $workPage->fill([
            'title'=>$data['title'],
            'content'=>$data['content'],
            'description'=>$data['description'],
            'category'=>$data['category'],
        ]);
        $workPage->save();
        return Redirect::route('pages.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkPage $workPage)
    {
        $workPage->delete();
        return redirect()->route('pages.index');
    }
}
