import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import './signupnav.css'

export function SignupNav(){
    return(
        <>
        <nav className='navbar navbar-expand'>
                <div className='me-auto p-2'>
                    <p className="navbrand"> Forum <FontAwesomeIcon icon="fa-brands fa-react" size="xl" className=''/></p>
                </div>
                <div className='ms-auto'>
                    <dl className='navbar-nav'>
                        <dd><Link to="/" className='loginnavLinks'>Login</Link></dd>
                    </dl>
                </div>
            </nav>
        </>
    );
}