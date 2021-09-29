import logo from '../assets/imgs/home-logo.svg';
import { Link } from 'react-router-dom';

export function HomeHeader() {
  return (
    <section className='home-header'>
      <nav className='flex justify-space-between'>
        <div className='logo'>
          <img src={logo} alt='' />
          <a href='/#'>Trellops</a>
        </div>
        <div className='nav-btns'>
          <Link className='login-btn' to='/login'>
            Log in
          </Link>
          <a className='signup-btn' href='/'>
            Sign up
          </a>
        </div>
      </nav>
    </section>
  );
}
