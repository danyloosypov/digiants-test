<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Filament\Resources\BookingResource\RelationManagers;
use App\Models\Booking;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\Column;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\Facades\DB;
use Filament\Resources\Forms\Components\DatePicker;
use Carbon\Carbon;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        //$takenDates = Booking::pluck('arrivalDate', 'departureDate')->toArray();

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

        return $form
            ->schema([
                Forms\Components\DatePicker::make('arrivalDate')
                    ->required()
                    ->disabledDates($disabledDates),
                Forms\Components\DatePicker::make('departureDate')
                    ->required()
                    ->disabledDates($disabledDates),
                Forms\Components\TextInput::make('phoneNumber')->required(),
                Forms\Components\TextInput::make('email')->email()->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->searchable()->sortable(),
                TextColumn::make('arrivalDate')->searchable()->sortable(),
                TextColumn::make('departureDate')->searchable()->sortable(),
                TextColumn::make('phoneNumber')->searchable()->sortable(),
                TextColumn::make('email')->searchable()->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    
    public static function getRelations(): array
    {
        return [
            //
        ];
    }
    
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }    
}
