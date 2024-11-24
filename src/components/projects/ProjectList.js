import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="project-list">
      <h2>Projects</h2>
      <Link to="/projects/new" className="create-button">Create New Project</Link>
      {projects.map(project => (
        <div key={project.id} className="project-card">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="project-actions">
            <Link to={`/projects/${project.id}`}>View Details</Link>
            <Link to={`/projects/${project.id}/commits`}>View Commits</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;