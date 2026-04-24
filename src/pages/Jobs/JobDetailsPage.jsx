import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import './JobDetailsPage.css';

function JobDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!job) {
    return <div className="page job-details-page">Loading job...</div>;
  }

  return (
    <div className="page job-details-page">
      <div className="job-details-header">
        <button type="button" onClick={() => navigate('/jobs')}>
          ←
        </button>

        <h1>{job.title}</h1>
        <p>{job.company}</p>
      </div>

      <div className="job-details-content">
        <div className="job-details-card">
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Type:</strong> {job.type}</p>
          <p><strong>Description:</strong></p>
          <p>{job.description}</p>

          <button
            type="button"
            onClick={() => window.open(job.link, '_blank')}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;