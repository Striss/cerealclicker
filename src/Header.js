import React from 'react';
import './Header.css';
import dollarImage from './dollar.png';

function Header({ money }) {
    return (
        <div className="header">
            <div className="header-left-content">
                <img src={dollarImage} alt='Money' className='coin-image' />
                <h2 className='money-amount'>{money}</h2>
            </div>
            <div className="header-right-content">
                <h2>Cereal Clicker</h2>
            </div>
        </div>
    );
}

export default Header;