import { useEffect, useState } from "react";
import { api } from "../utils/api";
// TODO: You have to edit this file

export const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.jobs.getJobs();
        setJobs(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {jobs.map((job) => (
        <div className="card mb-3 shadow-sm" style={{ maxWidth: "500px" }}>
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
            <button className="btn btn-primary mt-3">Apply Now!</button>
          </div>
        </div>
      ))}
    </div>
  );
};
