<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking; // Assuming you have a Booking model
use Carbon\Carbon;
use Illuminate\Http\Response;


class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::orderBy('id', 'desc')->paginate(10);
        return response()->json($bookings);
    }

    public function getTakenDates() {
        $bookings = Booking::all();
        $disabledDates = [];

        foreach ($bookings as $booking) {
            $startDate = Carbon::parse($booking->arrivalDate);
            $endDate = Carbon::parse($booking->departureDate);

            $datesInRange = [];

            while ($startDate <= $endDate) {
                $datesInRange[] = $startDate->toDateString();
                $startDate->addDay();
            }

            $disabledDates = array_merge($disabledDates, $datesInRange);
        }
        return response()->json($disabledDates);
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
        $booking = Booking::create($request->all());

        $response = new Response($booking, 201);
        
        // Return the JSON response
        return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $booking = Booking::findOrFail($id);
        return response()->json($booking);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update($request->all());
        return response()->json($booking);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();
        return response()->json(null, 204);
    }
}
