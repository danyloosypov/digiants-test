import { useState } from 'react'
import './App.css'
import Header from './partials/Header/Header'
import Footer from './partials/Footer/Footer'
import { TrashIcon } from '@heroicons/react/24/outline'


function App() {

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
                  <input className="form-input" type="text" id="arrival-date" />
                </div>
                <div className="form-item">
                  <label className="form-label" htmlFor="departure-date">Дата виїзду:</label>
                  <input className="form-input" type="text" id="departure-date" />
                </div>
                <div className="form-item">
                  <label className="form-label" htmlFor="phone-number">Номер телефону:</label>
                  <input className="form-input" type="text" id="phone-number" />
                </div>
                <div className="form-item">
                  <label className="form-label" htmlFor="email">Email:</label>
                  <input className="form-input" type="text" id="email" />
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
            <tr>
              <td className='booking-item'>2023-06-30</td>
              <td className='booking-item'>2023-07-05</td>
              <td className='booking-status'>Успішно</td>
              <td className='booking-item'>
                <TrashIcon className='trash-icon' />
              </td>
            </tr>
            </tbody>
          </table>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default App
