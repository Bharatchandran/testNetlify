import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

function ProjectForm() {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createProject(project);
      navigate('/');
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div className="project-form">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={project.name}
          onChange={(e) => setProject({...project, name: e.target.value})}
        />
        <textarea
          placeholder="Description"
          value={project.description}
          onChange={(e) => setProject({...project, description: e.target.value})}
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default ProjectForm;