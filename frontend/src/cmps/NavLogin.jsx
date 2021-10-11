import React from 'react'
import logo from '../assets/imgs/home-logo.svg';

export function NavLogin() {
  return (
    <section className='home-header'>
      <nav className='flex justify-space-between'>
        <div className='logo'>
          <img src={logo} alt='' />
          <a href='/#'>Trellops</a>
        </div>
      </nav>
    </section>
  );
}
