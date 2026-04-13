import './AcademicRecordsPage.css';

function AcademicRecordsPage() {
  const student = {
    name: 'Juan C. Dela Cruz',
    studentId: 'ADDU-2015-03247',
    program: 'Bachelor of Science in Computer Science'
  };

  const savedInfo = [
    {
      label: 'Student ID',
      value: 'ADDU-2015-03247',
      badge: 'Read-only',
      icon: '#'
    },
    {
      label: 'Degree Program',
      value: 'Bachelor of Science in Computer Science',
      badge: 'Read-only',
      icon: '🎓'
    }
  ];

  const honors = [
    'Cum Laude',
    "Dean's Lister (6 semesters)"
  ];

  return (
    <div className="page academic-page">
      <div className="academic-header">
        <div className="academic-topbar">
          <button className="academic-icon-button" type="button">
            ←
          </button>

          <h1>Academic Records</h1>

          <button className="academic-icon-button" type="button">
            ✎
          </button>
        </div>

        <div className="academic-student-card">
          <div className="academic-avatar">JD</div>

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
            This information will be automatically used when applying for alumni services.
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