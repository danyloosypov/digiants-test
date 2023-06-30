import React, {useEffect, useState} from 'react'
import './App.css'
import Header from './partials/Header/Header'
import Footer from './partials/Footer/Footer'
import { TrashIcon } from '@heroicons/react/24/outline'
import Service from './API/Service'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from './components/Loading/Loading'


function App() {
  const [bookings, setBookings] = useState([]);
  const [takenDates, setTakenDates] = useState([]);
  const [arrivalDate, setArrivalDate]= useState(null);
  const [departureDate, setDepartureDate]= useState(null);
  const [email, setEmail]= useState("");
  const [phone, setPhone]= useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      const result = await Service.getBookings();
      setBookings(result);
      setIsLoading(false);
    };
    const getTakeDates = async () => {
      setIsLoading(true);
      const result = await Service.getTakenDates();
      setTakenDates(result);
      setIsLoading(false);
    };
    getTakeDates();
    fetchBookings();
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
  
    return `${year}-${month}-${day}`;
  };

  const handleDeleteBooking = (bookingId) => {
    setIsLoading(true);
    Service.deleteBooking(bookingId)
      .then((response) => {
        // Handle the successful deletion
        if(response.status === 201) {
          setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking.id !== bookingId)
          );
          alert('Booking deleted');
        } else {
          console.log(response);
        }
        setIsLoading(false);
        // You may want to update the state or fetch the updated list of bookings
      })
      .catch((error) => {
        // Handle any errors
        alert('Something went wrong');
        console.error('Error deleting booking:', error);
        setIsLoading(false);
      });
  };
  
  

  const handleFormSubmit = (event) => {  
    event.preventDefault();
    setIsLoading(true);
    // Create a booking object with the necessary data
    const booking = {
      arrivalDate: formatDate(arrivalDate),
      departureDate: formatDate(departureDate),
      phoneNumber: phone,
      email: email
    };


    const newDates = [];
    const start = new Date(booking.arrivalDate);
    const end = new Date(booking.departureDate);
    const currentDate = new Date(start);

    while (currentDate <= end) {
      newDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const updatedTakenDates = [...takenDates, arrivalDate, departureDate, ...newDates];
  
    // Call the createBooking function from the service
    Service.createBooking(booking)
      .then((response) => {
        if(response.status === 201) {
          const newBooking = response.data;
          setBookings(prevBookings => [newBooking, ...prevBookings]);
          setTakenDates(updatedTakenDates);
          alert('Booking created');
          setEmail("");
          setPhone("");
          setArrivalDate(null);
          setDepartureDate(null);
        } else {
          console.log(response);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert('Error creating booking');
        setIsLoading(false);
      });

  };
  
  return (
    <div className='app'>
      <Header/>
      {isLoading && <Loading />}
        <div className='container'>
          <div className="logo-text">
            <div className='text-upper'>
              Забронюйте
            </div>
            <div className='text-lower'>
              Своє місце
            </div >
            <div className="shape">

            </div>
            <div className='shape-text'>
              в Hotel logo
            </div>
          </div>
          <div className="booking-form">
            <form method="POST" action="" onSubmit={handleFormSubmit}>
              <div className="form-items">
                <div className="form-item">
                  <label className="form-label" htmlFor="arrival-date">Дата заїзду:</label>
                  <DatePicker
                    className="form-input"
                    selected={arrivalDate}
                    onChange={date => setArrivalDate(date)}
                    filterDate={date => {
                      const selectedDate = new Date(date);
                      for (const takenDate of takenDates) {
                        const compareDate = new Date(takenDate);
                        if (
                          selectedDate.getFullYear() === compareDate.getFullYear() &&
                          selectedDate.getMonth() === compareDate.getMonth() &&
                          selectedDate.getDate() === compareDate.getDate()
                        ) {
                          return false; // Date should be disabled
                        }
                      }
                      return true; // Date should be enabled
                    }}
                  />

                </div>
                <div className="form-item">
                  <label className="form-label" htmlFor="departure-date">Дата виїзду:</label>
                  <DatePicker
                    className="form-input"
                    selected={departureDate}
                    onChange={date => setDepartureDate(date)}
                    filterDate={date => {
                      const selectedDate = new Date(date);
                      for (const takenDate of takenDates) {
                        const compareDate = new Date(takenDate);
                        if (
                          selectedDate.getFullYear() === compareDate.getFullYear() &&
                          selectedDate.getMonth() === compareDate.getMonth() &&
                          selectedDate.getDate() === compareDate.getDate()
                        ) {
                          return false; // Date should be disabled
                        }
                      }
                      return true; // Date should be enabled
                    }}
                  />
                </div>
                <div className="form-item">
                  <label className="form-label" htmlFor="phone-number">Номер телефону:</label>
                  <input className="form-input" type="text" id="phone-number" value={phone} onChange={handlePhoneChange} />
                </div>
                <div className="form-item">
                  <label className="form-label" htmlFor="email">Email:</label>
                  <input className="form-input" type="text" id="email" value={email} onChange={handleEmailChange} />
                </div>
              </div>
              <div className='book-div'>
                <input className="book-btn" type="submit" value="ЗАБРОНЮВАТИ" />
              </div>
            </form>
          </div>
          <div className='history-text'>
            <div className='history-text-upper'>
              Історія
            </div>
            <div className='history-text-lower'>
              Бронювань
            </div >
            <div className="history-shape">

            </div>
            <div className='history-shape-text'>
              ваших
            </div>
          </div>
          <div >
          <table className="history-table">
            <thead>
              <tr>
                <th>Дата заїзду з</th>
                <th>Дата виїзду до</th>
                <th>Статус</th>
                <th>Видалити бронювання</th>
              </tr>
            </thead>
            <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className='booking-row'>
                <td className="booking-item">{booking.arrivalDate}</td>
                <td className="booking-item">{booking.departureDate}</td>
                <td className='booking-status'>Успішно</td>
                <td className="booking-item">
                  <TrashIcon className="trash-icon" onClick={() => handleDeleteBooking(booking.id)} />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default App
