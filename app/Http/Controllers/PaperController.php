<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Inertia\Inertia;
use App\Models\Paper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class PaperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Papers/Index', [
            'papers' => Paper::with('banner')->orderBy('created_at','DESC')->get(),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Papers/Edit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'banner' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            "title" => 'required|string',
            "content" => 'required|string',
        ]);

        if ($request->file('banner')->isValid()) {
            $banner = $request->file('banner');
            // $banner_path = $banner->store('uploads');
            $banner_path = $banner->store('uploads', 'public');
            $b = Banner::create([
                'path'=>url(Storage::url($banner_path)),
                'type'=>'IMAGE'
            ]);
        }else{
            return response()->json(['message' => 'File upload failed'], 400);
        }

        $paper = Paper::create([
            'banner_id'=>$b->id,
            'title'=>$data['title'],
            'content'=>$data['content'],
        ]);

        // Session::put('notification', [
        //     'status'=>'success',
        //     'message'=>'Article enrégistré avec succès',
        // ]);
        return Redirect::route('papers.index');

        // return redirect()->route('papers.edit', $paper['id']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Paper $paper)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paper $paper)
    {
        $paper->load('banner');
        return Inertia::render('Papers/Edit', [
            'paper' => $paper,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paper $paper)
    {
        return $request->all();
        $rules = [
            "title" => 'required|string',
            "content" => 'required|string',
        ];
        if($request->hasFile('banner')){
            $rules['banner'] = 'required|file|mimes:jpg,jpeg,png,pdf|max:2048';
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
                $paper->banner_id = $b->id;
            }else{
                return response()->json(['message' => 'File upload failed'], 400);
            }
        }

        $paper->fill([
            'title'=>$data['title'],
            'content'=>$data['content'],
        ]);
        $paper->save();
        return Redirect::route('papers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paper $paper)
    {
        $paper->delete();
        return redirect()->route('papers.index');
    }
}
