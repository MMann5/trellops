import logo from '../assets/imgs/home-logo.svg';
import { Link } from 'react-router-dom';

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
