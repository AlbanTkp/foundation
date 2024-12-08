<?php

namespace App\Models;

use App\Models\Banner;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Paper extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'banner_id', 'title'];


    /**
     * Get the banner associated with the Page
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function banner(): HasOne
    {
        return $this->hasOne(Banner::class, 'id', 'banner_id');
    }
}
