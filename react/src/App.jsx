import React, {useEffect, useState} from 'react'
import './App.css'
import Header from './partials/Header/Header'
import Footer from './partials/Footer/Footer'
import { TrashIcon } from '@heroicons/react/24/outline'
import Service from './API/Service'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function App() {
  const [bookings, setBookings] = useState([]);
  const [takenDates, setTakenDates] = useState([]);
  const [arrivalDate, setArrivalDate]= useState(null);
  const [departureDate, setDepartureDate]= useState(null);
  const [email, setEmail]= useState("");
  const [phone, setPhone]= useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const result = await Service.getBookings();
      setBookings(result.data);
    };
    const getTakeDates = async () => {
      const result = await Service.getTakenDates();
      setTakenDates(result);
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
  
  return (
    <div className='app'>
      <Header/>
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
            <form method="POST" action="">
              <div className="form-items">
                <div className="form-item">
                  <label className="form-label" htmlFor="arrival-date">Дата заїзду:</label>
                  <DatePicker className="form-input" selected={arrivalDate} 
                    onChange={date => setArrivalDate(date)}
                    filterDate={date => !takenDates.includes(date.toISOString().split('T')[0])}
                    />
                </div>
                <div className="form-item">
                  <label className="form-label" htmlFor="departure-date">Дата виїзду:</label>
                  <DatePicker className="form-input" selected={departureDate} 
                  onChange={date => setDepartureDate(date)}
                  filterDate={date => !takenDates.includes(date.toISOString().split('T')[0])}
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
                  <TrashIcon className="trash-icon" />
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
