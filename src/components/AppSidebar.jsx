import { useNavigate } from 'react-router-dom';
import adduLogo from '../assets/images/addu-logo.png';
import './AppSidebar.css';

function AppSidebar({ isOpen, onClose, onLogout, userName }) {
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'U';

    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const menuItems = [
    { title: 'Home', icon: '⌂', path: '/home' },
    { title: 'My Profile', icon: '◌', path: '/profile' },
    { title: 'Academic Records', icon: '🎓', path: '/academic-records' },
    { title: 'Networking & Events', icon: '☰', path: '/events' },
    { title: 'My Registered Events', icon: '🗓', path: '/my-registrations' },
    { title: 'Admin Events', icon: '⚙', path: '/admin/events' }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-backdrop" onClick={onClose}></div>

      <aside className="app-sidebar">
        <div className="sidebar-phone-top">
          <span>9:41</span>
          <span>📶 📡 🔋</span>
        </div>

        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo">
              <img src={adduLogo} alt="Ateneo de Davao University logo" />
            </div>

            <div className="sidebar-brand-text">
              <h3>Alumni Portal</h3>
              <p>Ateneo de Davao</p>
            </div>
          </div>

          <button
            className="sidebar-close-btn"
            type="button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="sidebar-divider"></div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.title}
              type="button"
              className="sidebar-menu-item"
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
            >
              <span className="sidebar-menu-icon">{item.icon}</span>
              <span className="sidebar-menu-text">{item.title}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-card">
            <div className="sidebar-user-avatar">
              {getInitials(userName)}
            </div>

            <div className="sidebar-user-info">
              <h4>{userName || 'User'}</h4>
              <p>Alumni</p>
            </div>
          </div>

          <div className="sidebar-footer-actions">
            <button type="button" className="sidebar-footer-btn">
              ⚙ Settings
            </button>

            <button
              type="button"
              className="sidebar-footer-btn"
              onClick={onLogout}
            >
              ⇥ Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AppSidebar;