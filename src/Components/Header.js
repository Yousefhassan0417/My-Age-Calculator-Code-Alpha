import React  from 'react';
import item from "../Images/logon1x.png";
import {Link} from "react-scroll";
function Header() {
 
  return (
    <header className="header">
      <div className='row'>
        <div className='col-header-img'>
          <a href='/' title='Age Calculator'>
            <img src={item} className='img' alt='Age Calculator' />
          </a>
        </div>
        <div className='col-header-nav'>
          <span className="toggle" id='toggle'></span>
          <nav id='menu'>
            <ul id='navmenu' className='headnav'>
              <li> <Link to="Age-Calculator" smooth={true} duration={500} title='Age Calculator'>  Age Calculator </Link></li>
              <li><Link to="how" smooth={true} duration={500}  title="How to use my Age Calculator">How to use my Age Calculator </Link></li>
              <li><Link to="about" smooth={true} duration={500} title="About Age">About Age </Link></li>
              
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;



