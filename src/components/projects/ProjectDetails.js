import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [newMemberEmail, setNewMemberEmail] = useState('');

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      const projectData = await api.getProject(projectId);
      setProject(projectData);
      const membersData = await api.getProjectMembers(projectId);
      setMembers(membersData);
    } catch (error) {
      console.error('Failed to fetch project details:', error);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await api.addProjectMember(projectId, newMemberEmail);
      setNewMemberEmail('');
      fetchProjectDetails();
    } catch (error) {
      console.error('Failed to add member:', error);
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-details">
      <h2>{project.name}</h2>
      <p>{project.description}</p>

      <div className="members-section">
        <h3>Project Members</h3>
        <form onSubmit={handleAddMember}>
          <input
            type="email"
            placeholder="Member's email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
          />
          <button type="submit">Add Member</button>
        </form>

        <div className="members-list">
          {members.map(member => (
            <div key={member.id} className="member-item">
              <span>{member.user.name}</span>
              <span>{member.user.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;