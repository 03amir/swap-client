import React from 'react';
import './footer.css';
import { Link, useNavigate } from "react-router-dom";


function Footer(props) {
    return (
        <div className='footerFrame'>
        <div className="hr"></div>
        
         <h1 className='footerLogo'>Swap </h1>
         <p className='small'>Ⓒ 2022 Swap</p>
        <Link className='footerLink' to="/">How to use</Link>
        <Link className='footerLink' to="/">About Project</Link>
        <Link className='footerLink' to="/">Typewriter</Link>
       <Link  className='footerLink'to="/">Contact</Link>
       <Link className='footerLink'to="/">Donate</Link>
       <Link className='footerLink' to="/">FAQ</Link>
        </div>
    );
}



export default Footer;