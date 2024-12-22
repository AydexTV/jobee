import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { ApplyModal } from "./ApplyModal";
import { useAuth } from "../contexts/AuthContext";

export const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const { user } = useAuth();

  // Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.jobs.getJobs();
        console.log(user)
        setJobs(res);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Handle Apply Click
  const openApplyModal = (jobId) => {
    setSelectedJobId(jobId);
    setShowApplyModal(true);
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setSelectedJobId(null);
  };

  // Submit Application
  const submitApplication = async (applicationData) => {
    try {
      await api.applications.apply(applicationData);
      alert("Application submitted successfully!");
      closeApplyModal();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id} className="card mb-3 shadow-sm" style={{ maxWidth: "500px" }}>
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <span className="badge bg-primary me-2">{job.type}</span>
            <span className="text-muted small">Posted on: {job.date}</span>
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
              className="btn btn-primary mt-3"
              onClick={() => openApplyModal(job.id)}
            >
              Apply Now!
            </button>
          </div>
        </div>
      ))}

      {/* Apply Modal */}
      <ApplyModal
        show={showApplyModal}
        handleClose={closeApplyModal}
        jobId={selectedJobId}
        onSubmit={submitApplication}
        lockedEmail={user?.email || ""}
      />
    </div>
  );
};
