<?php

use App\Http\Controllers\BookingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/bookings',[BookingController::class, 'index']);

Route::post('/bookings/create', [BookingController::class, 'store']);

Route::get('/takendates', [BookingController::class, 'getTakenDates']);

Route::get('/widgets', [BookingController::class, 'getWidgets']);

Route::delete('/bookings/delete/{id}', [BookingController::class, 'destroy']);

Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});
