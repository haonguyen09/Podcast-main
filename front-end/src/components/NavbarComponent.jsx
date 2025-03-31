import React from 'react'
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const NavbarComponent = ({ Icon, text, href, active, onClick }) => {


    return (
        <Nav.Link as={Link} to={href} className={`menu-link width-full text-start ${active ? 'active' : ''}`} onClick={onClick}>
            <span className='menu-icon'><Icon /></span>
            {text}
        </Nav.Link>
    )
}

export default NavbarComponent
