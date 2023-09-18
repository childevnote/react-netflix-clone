
import React, {useEffect, useState} from 'react'
import '../styles/Nav.css'

export default function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(()=> {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 80){
        handleShow(true);
      }else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", ()=>{});
    };
  }, []);

  return (
    <nav className={`nav ${show && "nav-black"}`}>
      <img
        alt='Netflix Logo'
        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
        className='nav-logo'
        onClick={() => window.location.reload()}
      />
      <img
        alt='Avatar'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
        className='nav-avatar'
      />
    </nav>
  )
}
