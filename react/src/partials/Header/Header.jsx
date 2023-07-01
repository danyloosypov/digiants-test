import React from 'react'
import styles from './header.css'

const Header = ({phone, logo}) => {

  return (
    <div className="header-container">
      <div className='header-items'>
        <div className="header-item header-phone">
          {phone?.body}
        </div>
        <div className="header-item header-logo">
          {logo?.body}
        </div>
        <div className='header-item'>
          <button className="header-btn">
            Забронювати
          </button>
        </div>
      </div>
      <hr className='header-line' />
    </div>
  )
}

export default Header
