import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export const MyJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const data = await api.myJobs.getMyJobs();
      setJobs(data);
    } catch (err) {
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async () => {
    try {
      if (selectedJob) {
        await api.myJobs.deleteJob(selectedJob.id);
        setJobs(jobs.filter((job) => job.id !== selectedJob.id));
        setShowModal(false); // Close the modal after deletion
        setSelectedJob(null);
      }
    } catch (err) {
      setError("Failed to delete job.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id} className="card mb-3 shadow-sm" style={{ maxWidth: "500px" }}>
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <span className="badge bg-primary me-2">{job.type}</span>
            <span className="text-muted small">Posted on: {new Date(job.date).toLocaleDateString()}</span>
            <p className="card-text mt-3">
              <strong>Salary: </strong> {job.salary}
            </p>
            <p className="card-text">
              <strong>Required Skills: </strong> {job.skills}
            </p>
            <p className="card-text">
              <strong>Description: </strong> {job.description}
            </p>
            <button
              className="btn btn-danger mt-3"
              onClick={() => {
                setSelectedJob(job);
                setShowModal(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h5>Deletion of Job</h5>
            <p>Are you sure you want to delete this job?</p>
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowModal(false);
                  setSelectedJob(null);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={deleteJob}>
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
