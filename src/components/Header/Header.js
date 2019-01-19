const React = require('react');

import './Header.css'

const Header = () => {
  return (
    <div className='app-header'>
      <span className='logo-wrapper'>
        <img className='header-logo' src='../../images/logo.png' alt='Aviasales'></img>
      </span>
    </div>
  )
}

export default Header;