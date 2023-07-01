<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

         \App\Models\User::factory()->create([
             'name' => 'Test User',
             'email' => 'test@example.com',
             'password' => 'qwertyui'
         ]);

         DB::table('widgets')->insert([
            [
                'title' => 'phone',
                'body' => '+38 (044) 299 27 66',
            ],
            [
                'title' => 'hotelLogo',
                'body' => 'Hotel logo',
            ],
            [
                'title' => 'address',
                'body' => 'пр-т. В. Лобановського 25/16 Київ, Україна',
            ]
        ]);
    }
}
