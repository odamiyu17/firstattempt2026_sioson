import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AcademicRecordsPage.css';
import adduLogo from '../../assets/images/addu-logo.png';
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaNewspaper,
  FaBriefcase,
  FaHeart,
  FaFileAlt,
  FaCog
} from 'react-icons/fa';

function AcademicRecordsPage() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';

    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

const sidebarMenu = [
  { title: 'Home', icon: <FaHome />, action: () => navigate('/home') },
  { title: 'News & Updates', icon: <FaNewspaper />, action: () => navigate('/news-updates') },
  { title: 'My Profile', icon: <FaUser />, action: () => navigate('/profile') },
  {
  title: 'Alumni Calendar',
  icon: <FaCalendarAlt />,
  action: () => {
    resetEventFilters();
    navigate('/calendar');
  }
},
  { title: 'Networking & Events', icon: <FaCalendarAlt />, action: () => navigate('/events') },
  { title: 'Document Request', icon: <FaFileAlt />, action: () => {} },
  { title: 'Job Opportunities', icon: <FaBriefcase />, action: () => {} },
  { title: 'Donation', icon: <FaHeart />, action: () => {} }
];

  const student = {
    name: loggedInUser ? loggedInUser.name : 'Juan C. Dela Cruz',
    studentId: 'ADDU-2015-03247',
    program: loggedInUser?.program || 'Bachelor of Science in Computer Science'
  };

  const savedInfo = [
    {
      label: 'Student ID',
      value: student.studentId,
      badge: 'Read-only',
      icon: '#'
    },
    {
      label: 'Degree Program',
      value: student.program,
      badge: 'Read-only',
      icon: '🎓'
    }
  ];

  const honors = ['Cum Laude', "Dean's Lister (6 semesters)"];
  const initials = getInitials(student.name);

  return (
    <div className="page academic-page">
      {isSidebarOpen && (
        <>
          <div
            className="sidebar-backdrop"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <aside className="page-sidebar">
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
                onClick={() => setIsSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="sidebar-menu">
              {sidebarMenu.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className={
                    item.title === 'Academic Records'
                      ? 'sidebar-menu-item active'
                      : 'sidebar-menu-item'
                  }
                  onClick={() => {
                    item.action();
                    setIsSidebarOpen(false);
                  }}
                >
                  <span className="sidebar-menu-icon">{item.icon}</span>
                  <span className="sidebar-menu-text">{item.title}</span>
                  {item.title === 'Academic Records' && (
                    <span className="sidebar-active-dot"></span>
                  )}
                </button>
              ))}
            </nav>

            <div className="sidebar-footer">
              <div className="sidebar-user-card">
                <div className="sidebar-user-avatar">
                  {getInitials(loggedInUser?.name)}
                </div>

                <div className="sidebar-user-info">
                  <h4>{loggedInUser?.name || 'User'}</h4>
                  <p>Alumni</p>
                </div>
              </div>

              <div className="sidebar-footer-actions">
                <button
                  type="button"
                  className="sidebar-footer-btn"
                  onClick={() => {
                    navigate('/profile');
                    setIsSidebarOpen(false);
                  }}
                >
                  ⚙ Settings
                </button>

                <button
                  type="button"
                  className="sidebar-footer-btn"
                  onClick={handleLogout}
                >
                  ⇥ Sign Out
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      <div className="academic-header">
        <div className="academic-topbar">
          <button
            className="academic-icon-button"
            type="button"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>

          <h1>Academic Records</h1>

          <button
            className="academic-icon-button"
            type="button"
            onClick={() => navigate('/profile')}
          >
            ✎
          </button>
        </div>

        <div className="academic-student-card">
          <div className="academic-avatar">{initials}</div>

          <div className="academic-student-info">
            <h2>{student.name}</h2>
            <p>#{student.studentId}</p>
            <p>🎓 {student.program}</p>
          </div>
        </div>
      </div>

      <div className="academic-content">
        <section className="academic-card">
          <div className="academic-section-title">
            <div className="academic-section-icon">📘</div>
            <div>
              <h3>Saved Academic Information</h3>
              <p>Auto-synced from university records</p>
            </div>
          </div>

          <div className="saved-info-list">
            {savedInfo.map((item) => (
              <div className="saved-info-item" key={item.label}>
                <div className="saved-info-left">
                  <div className="saved-info-icon">{item.icon}</div>

                  <div className="saved-info-text">
                    <span>{item.label}</span>
                    <h4>{item.value}</h4>
                  </div>
                </div>

                <span className="readonly-badge">{item.badge}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="academic-card">
          <div className="academic-section-title">
            <div className="academic-section-icon gold">🏅</div>
            <div>
              <h3>Honors &amp; Awards</h3>
            </div>
          </div>

          <div className="honors-list">
            {honors.map((honor) => (
              <div className="honor-item" key={honor}>
                <div className="honor-icon">🏅</div>
                <p>{honor}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="academic-note">
          <span>ⓘ</span>
          <p>
            This information will be automatically used when applying for alumni
            services.
          </p>
        </div>

        <button className="academic-primary-button" type="button">
          ⤴ Use This Information for Applications
        </button>

        <button className="academic-link-button" type="button">
          ✎ Request a Record Update
        </button>
      </div>
    </div>
  );
}

export default AcademicRecordsPage;