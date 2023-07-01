import React from 'react'
import styles from './footer.css'
import { PhoneIcon } from '@heroicons/react/24/solid'
import { MapPinIcon } from '@heroicons/react/24/solid'


const Footer = ({phone, logo, address}) => {
  return (
    <div className="footer-container">
      <div className='footer-items'>
        <div className="footer-item footer-logo">
        {logo?.body}
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
                <p>{phone?.body}</p>
            </li>
            <li className='footer-list-item'>
              <MapPinIcon className='footer-icon' />
              <p>{address?.body}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
