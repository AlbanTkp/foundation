<?php

namespace App\Models;

use App\Models\Page;
use App\Models\Banner;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class IdeaPage extends Page
{
    use HasFactory;
    protected $fillable = ['banner_id', 'description', 'content', 'title', 'category'];
}
