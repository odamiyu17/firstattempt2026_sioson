import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobsPage.css';
import api from '../../api/api';

function JobsPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page jobs-page">
      <div className="jobs-header">
        <div className="jobs-topbar">
          <button onClick={() => navigate('/home')}>←</button>
          <h1>Job Opportunities</h1>
        </div>

        <input
          type="text"
          placeholder="Search job, company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="jobs-search"
        />
      </div>

      <div className="jobs-content">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-top">
                <div className="job-avatar">
                  {job.company[0]}
                </div>

                <div className="job-info">
                  <h3>{job.title}</h3>
                  <p className="job-company">{job.company}</p>
                  <p className="job-meta">
                    {job.location} • {job.type}
                  </p>
                </div>
              </div>

              <p className="job-desc">{job.description}</p>

              <div className="job-actions">
                <button
                  className="apply-btn"
                  onClick={() => window.open(job.link, '_blank')}
                >
                  Apply Now
                </button>

           <button
  className="details-btn"
  onClick={() => navigate(`/jobs/${job.id}`)}
>
  View Details
</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-jobs">No jobs found</p>
        )}
      </div>
    </div>
  );
}

export default JobsPage;