import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useLocation } from 'react-router-dom'

function Navbar() {
    let location = useLocation();
    console.log(location, 'locat')
    return (
        <nav className='navbar'>
            <div className="navbar__container">
                <div className='navbar__current'>
                    {location.pathname === '/' ? "🗺️ Map" : "📈 Charts"}
                </div>
                <div className='navbar__items'>
                    <Link to="/">Map</Link>
                    <Link to="/chart">Charts</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar