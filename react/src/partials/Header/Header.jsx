import React from 'react'
import styles from './header.css'

const Header = () => {
  return (
    <div className="header-container">
      <div className='header-items'>
        <div className="header-item header-phone">
          +38 (044) 299 27 66
        </div>
        <div className="header-item header-logo">
          Hotel Logo
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
