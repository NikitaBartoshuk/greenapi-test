import './navsection.css'
import React from 'react';
import { BsChatDots } from "react-icons/bs";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { GrChannel } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";

const navList = [{id: 1, icon: <BsChatDots className='nav-icon'/>, title: 'Chat'},
    {id: 2, icon: <HiOutlineStatusOnline className='nav-icon'/>, title: 'Status'},
    {id: 3, icon: <GrChannel className='nav-icon'/>,
    title: 'Channels'}]

const NavSection = () => {
    return (
        <nav className='nav-section-container'>
            <section className='upper-nav'>
                <ul className='upper-nav-list'>
                    {navList.map(el => {
                        return <li key={el.id} title={el.title}>{el.icon}</li>
                    })}
                </ul>
            </section>
            <section className='lower-nav'>
                <IoSettingsOutline className='nav-icon'/>
            </section>
        </nav>
    );
};

export default NavSection;