<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('idea_pages', function (Blueprint $table) {
            $table->id();
            $table->integer('banner_id')->constrained('banners');;
            $table->enum('category',[IDEA_CATEGORY_FEATURED, IDEA_CATEGORY_POPULAR]);
            $table->string('title');
            $table->longtext('description');
            $table->longText('content');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
             });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('idea_pages');
    }
};
