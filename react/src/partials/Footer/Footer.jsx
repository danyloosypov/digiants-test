import React from 'react'
import styles from './footer.css'
import { PhoneIcon } from '@heroicons/react/24/solid'
import { MapPinIcon } from '@heroicons/react/24/solid'


const Footer = () => {
  return (
    <div className="footer-container">
      <div className='footer-items'>
        <div className="footer-item footer-logo">
          Hotel Logo
        </div>
        <div>
          <button className="footer-item footer-btn">
            Забронювати
          </button>
        </div>
        <div className='footer-item footer-contacts'>
          <ul className="footer-list">
            <li className='footer-list-item'>
              <PhoneIcon className='footer-icon' />
                <p>+38 (044) 299-27-66</p>
              </li>
            <li className='footer-list-item'>
              <PhoneIcon className='footer-icon' />
              <p>+38 (044) 299-27-66</p>
              </li>
            <li className='footer-list-item'>
              <MapPinIcon className='footer-icon' />
              <p>пр-т. В. Лобановського 25/16 Київ, Україна</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
