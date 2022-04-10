import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { links } from './data';
import logo from './logo.png';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    let isAuthenticated = localStorage.getItem('isAuthenticated');

    setIsAuthenticated(isAuthenticated);
  })

  
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);
  
  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {links.map((link) => {
              const { id, url, text, needsAuthentication } = link;

              if((needsAuthentication && isAuthenticated) || (!needsAuthentication && !isAuthenticated)) {
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
