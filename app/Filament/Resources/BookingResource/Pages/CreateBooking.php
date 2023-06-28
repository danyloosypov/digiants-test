<?php

namespace App\Filament\Resources\BookingResource\Pages;

use App\Filament\Resources\BookingResource;
use App\Models\Booking;
use Filament\Pages\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class CreateBooking extends CreateRecord
{
    protected static string $resource = BookingResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if($data['arrivalDate'] > $data['departureDate']) {
            $this->addError('arrivalDate', 'Arrival date must be before departure date.');
            throw ValidationException::withMessages(['arrivalDate' => 'Arrival date must be before departure date.']);
        }

        $existingRecord = Booking::where('arrivalDate', '<=', $data['departureDate'])->where('departureDate', '>=', $data['arrivalDate'])->first();

        if ($existingRecord) {
            $this->addError('arrivalDate', 'Dates overlap with an existing booking.');
            throw ValidationException::withMessages(['arrivalDate' => 'Dates overlap with an existing booking.']);
        }
    
        return $data;
    }



    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
