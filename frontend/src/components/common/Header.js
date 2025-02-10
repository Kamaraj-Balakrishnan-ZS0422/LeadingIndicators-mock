import i18n from '../../i18n';
import React, { useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import mainlogo from '../../assets/imgs/veolialogo.png';
import { useSelector } from 'react-redux';
import DropdownComponent from './DropdownComponent';

function Header() {
  const userData = useSelector((state) => state.login.user);
  const { email, isAdmin } = userData;
  const [language, setLanguage] = useState(localStorage.getItem('lng')||'en');

  // Function to handle language change
  const handleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('lng',newLanguage);
    i18n.changeLanguage(newLanguage); // Pass the new language directly
   
    
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-secondary">
      {/* Logo and Brand */}
      <Navbar.Brand href="#home" className="text-light px-3">
        <img
          alt=""
          src={mainlogo}
          width="200"
          height="120"
          className="d-inline-block"
        />{' '}
        Leading Indicators
      </Navbar.Brand>

      {/* Toggle for responsive navbar */}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        {/* Language Switch and Dropdown */}
        <div className="d-flex flex-column align-items-center text-center">
          <div className="switch mb-2">
            <input
              id="language-toggle"
              className="check-toggle check-toggle-round-flat"
              type="checkbox"
              checked={language === 'fr'}
              onChange={handleLanguage}
            />
            <label htmlFor="language-toggle"><i className="fa-solid fa-language" style={{fontSize:"25px",color:"whitesmoke",paddingTop:"6px",marginLeft:"110px"}}></i></label>
            <span className="on">EN</span>
            <span className="off">FR</span>
          </div>

          <Navbar.Text className="text-light px-3 nav-link stroke">
            <DropdownComponent btntext={email} isAdmin={isAdmin} />
          </Navbar.Text>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
