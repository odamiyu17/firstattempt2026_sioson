import './ProfilePage.css';

function ProfilePage() {
  const profile = {
    name: 'Juan Dela Cruz',
    batch: 'Class of 2015',
    program: 'BS Computer Science',
    email: 'juan.delacruz@email.com',
    phone: '+63 912 345 6789',
    address: 'Davao City, Philippines',
    role: 'Software Engineer'
  };

  const personalInfo = [
    { label: 'First Name', value: 'Juan' },
    { label: 'Last Name', value: 'Dela Cruz' },
    { label: 'Email Address', value: 'juan.delacruz@email.com' },
    { label: 'Phone Number', value: '+63 912 345 6789' }
  ];

  const profileSections = [
    {
      title: 'Academic Records',
      subtitle: 'View your saved academic information',
      icon: '🎓'
    },
    {
      title: 'Career Milestones',
      subtitle: 'Resume, certificates & credentials',
      icon: '📄'
    },
    {
      title: 'Account Settings',
      subtitle: 'Privacy, security & preferences',
      icon: '⚙'
    }
  ];

  return (
    <div className="page profile-page">
      <div className="profile-topbar">
        <button className="profile-menu-button" type="button">
          ☰
        </button>

        <h1>My Profile</h1>

        <button className="edit-profile-button" type="button">
          ✎ Edit Profile
        </button>
      </div>

      <div className="profile-content">
        <section className="profile-hero-card">
          <div className="profile-avatar">JD</div>

          <div className="profile-hero-info">
            <h2>{profile.name}</h2>
            <p>
              {profile.batch} • {profile.program}
            </p>
          </div>

          <div className="profile-hero-divider"></div>

          <div className="profile-meta-grid">
            <div className="profile-meta-item">
              <span>✉</span>
              <p>{profile.email}</p>
            </div>

            <div className="profile-meta-item">
              <span>☎</span>
              <p>{profile.phone}</p>
            </div>

            <div className="profile-meta-item">
              <span>⌖</span>
              <p>{profile.address}</p>
            </div>

            <div className="profile-meta-item">
              <span>💼</span>
              <p>{profile.role}</p>
            </div>
          </div>
        </section>

        <section className="profile-card">
          <h3>Personal Information</h3>

          <div className="personal-info-grid">
            {personalInfo.map((item) => (
              <div className="info-field" key={item.label}>
                <label>{item.label}</label>
                <input type="text" value={item.value} readOnly />
              </div>
            ))}
          </div>

          <div className="info-field full-width">
            <label>Address</label>
            <input
              type="text"
              value="123 Main Street, Davao City, Philippines"
              readOnly
            />
          </div>
        </section>

        <section className="profile-links-card">
          {profileSections.map((section) => (
            <button className="profile-link-row" type="button" key={section.title}>
              <div className="profile-link-icon">{section.icon}</div>

              <div className="profile-link-text">
                <h4>{section.title}</h4>
                <p>{section.subtitle}</p>
              </div>

              <span className="profile-link-arrow">›</span>
            </button>
          ))}
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;