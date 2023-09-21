
import React, {useEffect, useState} from 'react'
import '../styles/Nav.css'
import { useNavigate} from 'react-router-dom';

export default function Nav() {
  const [show, handleShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  return (
    <nav className={`nav ${show && "nav-black"}`}>
      <img
        alt='Netflix Logo'
        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
        className='nav-logo'
        onClick={() => navigate('/')}
      />

      <input value={searchValue} onChange={handleChange} placeholder="영화를 검색해주세요." className="nav__input" type='text' />

      <img
        alt='Avatar'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
        className='nav-avatar'
      />
    </nav>
  )
}
