import React, { useState } from 'react'
import logo from '../../asset/images/Logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarComponent from '../../components/NavbarComponent'
import HomeIcon from '../../asset/icons/HomeIcon'
import ChartIcon from '../../asset/icons/ChartIcon'
import CubeIcon from '../../asset/icons/CubeIcon'
import PlayIcon from '../../asset/icons/PlayIcon'
import SubIcon from '../../asset/icons/SubIcon'
import DashboardIcon from '../../asset/icons/DashboardIcon'
import EpisodesIcon from '../../asset/icons/EpisodesIcon'
import TeamIcon from '../../asset/icons/TeamIcon'
import UserIcon from '../../asset/icons/UserIcon'
import MedalIcon from '../../asset/icons/MedalIcon'

const Sidebar = () => {

    const [activeIndex, setActiveIndex] = useState({ menu: 1, index: 0 });

    const handleSetActive = (menu, index) => {
        setActiveIndex({ menu, index });
    };

    const menu1 = [
        {text: "Home", icon: HomeIcon, href: "/"},
        {text: "Trending", icon: ChartIcon, href: "/trending"},
        {text: "Explore Topics", icon: CubeIcon, href: "/explore-topics"},
        {text: "Playlist", icon: PlayIcon, href: "/playlist"},
        {text: "Subscriptions", icon: SubIcon, href: "/subscriptions"}
    ]

    const menu2 = [
        {text: "Dashboard", icon: DashboardIcon, href: "/"},
        {text: "Episodes", icon: EpisodesIcon, href: "/episodes"},
        {text: "Team", icon: TeamIcon, href: "/team"},
        {text: "Subscribers", icon: UserIcon, href: "/subscribers"}
    ]

    const menu3 = [
        {text: "Leaderboard", icon: MedalIcon, href: "/leaderboard"}
    ]

    const renderMenu = (menu, menuIndex) => {
        return menu.map((item, index) => (
            <NavbarComponent
                key={index}
                Icon={item.icon}
                text={item.text}
                href={item.href}
                active={activeIndex.menu === menuIndex && activeIndex.index === index}
                onClick={() => handleSetActive(menuIndex, index)}
            />
        ));
    };

    return (
        <div className='sidebar'>
            <a className='logo' href='/'>
                <img srcSet={`${logo} 2x`} alt='gocastUI'/> 
            </a>
            <Navbar className='menu d-flex flex-column'>
                <Container fluid>
                    <Nav className="me-auto d-flex flex-column align-items-start width-full">
                        {renderMenu(menu1, 1)}
                    </Nav>
                </Container>
            </Navbar>
            <Navbar className='menu d-flex flex-column'>
                <Container fluid className=' d-flex flex-column align-items-start width-full'>
                    <Navbar.Brand className='menu-header'>Podcasters</Navbar.Brand>
                    <Nav className="me-auto  d-flex flex-column align-items-start width-full">
                        {renderMenu(menu2, 2)}
                    </Nav>
                </Container>
            </Navbar>
            <Navbar className='menu d-flex flex-column'>
                <Container fluid className=' d-flex flex-column align-items-start width-full'>
                    <Navbar.Brand className='menu-header'>Community</Navbar.Brand>
                    <Nav className="me-auto  d-flex flex-column align-items-start width-full">
                        {renderMenu(menu3, 3)}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Sidebar
