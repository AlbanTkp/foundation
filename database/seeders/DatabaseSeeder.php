<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Sale;
use App\Models\User;
use App\Models\Client;
use App\Models\Supply;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\PriceRange;
use App\Models\PaymentStep;
use App\Models\SaleProduct;
use App\Models\Notification;
use App\Models\SupplyProduct;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call([
        // ]);

        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => 'admin@gmail.com'
        ]);

    }
}
