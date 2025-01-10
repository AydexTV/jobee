import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const data = await api.applications.getApplications();
      setApplications(data);
    } catch (err) {
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {applications.map((application) => (
        <div key={application.id} className="card mb-3 shadow-sm" style={{ maxWidth: "500px" }}> 
          <div className="card-body">
            <p className="text-muted small">
              <strong>Applied on:</strong> {new Date(application.createdAt).toLocaleDateString()}
              <br />
              <span className="badge bg-primary">{application.job.type}</span>
            </p>
            <h5 className="card-title font-weight-bold">{application.name}</h5>
            <p className="card-text">{application.email}</p>
            <div className="d-flex justify-content-between">
              <span>
                <strong>Salary:</strong> ${application.job.salary.toLocaleString()}
              </span>
            </div>
            <div className="mt-2">
              <p>
                <strong>Applied Position:</strong> {application.job.title}
              </p>
              <p>
                <strong>Experience:</strong> {application.cv}
              </p>
            </div>
            <div className="mt-3">
              <h6>Required Skills:</h6>
              <p>{application.job.skills}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
