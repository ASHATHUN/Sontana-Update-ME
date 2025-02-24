<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'category_id',
        'image', // ✅ เพิ่ม image ใน fillable
        'views',
        'status',
    ];

    /**
     * ✅ Accessor สำหรับเรียก URL ของรูปภาพ
     */
    public function getImageUrlAttribute()
    {
        return $this->image ? Storage::url($this->image) : asset('default-image.jpg');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
