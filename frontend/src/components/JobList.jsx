// TODO: You have to edit this file

export const JobList = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      type: "Full-time",
      salary: 120000,
      description: "Join our engineering team to build scalable solutions...",
      date: "2024-03-15T08:00:00.000Z",
      skills: "React, Node.js, PostgreSQL",
    },
    {
      id: 2,
      title: "UX Designer",
      type: "Contract",
      salary: 90000,
      description: "Looking for a creative designer to join our product team",
      date: "2024-03-14T10:30:00.000Z",
      skills: "Figma, User Research, Design Systems",
    },
  ];

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
