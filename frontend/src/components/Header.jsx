
import { Link } from 'react-router-dom';


function Header() {
  return (
      <header className="header">
        <div className="container header-content">
          <div className="header-logo">
            Event<span>Booker</span>
          </div>
          <nav className="header-nav">
            <ul>
              <li><Link to='/' className="nav-link">Home</Link></li>
              <li><Link to='/' className="nav-link">Events</Link></li>
              <li><Link to='/Profile' className="nav-link">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>
  );
}

export default Header;