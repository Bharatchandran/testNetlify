const BASE_URL = 'http://localhost:8080/api';

export const api = {
   // Auth
   login: async (credentials) => {
       const token = btoa(`${credentials.email}:${credentials.password}`);
       localStorage.setItem('token', token);
       
       const response = await fetch(`${BASE_URL}/projects`, {
           headers: {
               'Authorization': `Basic ${token}`
           }
       });
       
       if (!response.ok) {
           throw new Error('Invalid credentials');
       }
       
       return { email: credentials.email };
   },

   register: async (user) => {
       const response = await fetch(`${BASE_URL}/users/register`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(user)
       });
       if (!response.ok) {
           throw new Error('Registration failed');
       }
       return response.json();
   },

   // Projects
   getProjects: async () => {
       const token = localStorage.getItem('token');
       const response = await fetch(`${BASE_URL}/projects`, {
           headers: {
               'Authorization': `Basic ${token}`
           }
       });
       if (!response.ok) {
           throw new Error('Failed to fetch projects');
       }
       return response.json();
   },

   createProject: async (project) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`${BASE_URL}/projects`, {
           method: 'POST',
           headers: {
               'Authorization': `Basic ${token}`,
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(project)
       });
       if (!response.ok) {
           throw new Error('Failed to create project');
       }
       return response.json();
   },

   // Commits
   createCommit: async (commit) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`${BASE_URL}/commits`, {
           method: 'POST',
           headers: {
               'Authorization': `Basic ${token}`,
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(commit)
       });
       if (!response.ok) {
           throw new Error('Failed to create commit');
       }
       return response.json();
   },

   getProjectCommits: async (projectId) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`${BASE_URL}/commits/project/${projectId}`, {
           headers: {
               'Authorization': `Basic ${token}`
           }
       });
       if (!response.ok) {
           throw new Error('Failed to fetch commits');
       }
       return response.json();
   },

   // Messages
   sendMessage: async (message) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`${BASE_URL}/messages`, {
           method: 'POST',
           headers: {
               'Authorization': `Basic ${token}`,
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(message)
       });
       if (!response.ok) {
           throw new Error('Failed to send message');
       }
       return response.json();
   },

   getProjectMessages: async (projectId) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`${BASE_URL}/messages/project/${projectId}`, {
           headers: {
               'Authorization': `Basic ${token}`
           }
       });
       if (!response.ok) {
           throw new Error('Failed to fetch messages');
       }
       return response.json();
   },

   // Project Members
   addProjectMember: async (projectId, userId) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`${BASE_URL}/projects/${projectId}/members`, {
           method: 'POST',
           headers: {
               'Authorization': `Basic ${token}`,
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ user: { id: userId } })
       });
       if (!response.ok) {
           throw new Error('Failed to add member');
       }
       return response.json();
   },

   // Subtasks
   createSubtask: async (commitId, subtask) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`${BASE_URL}/commits/${commitId}/subtasks`, {
           method: 'POST',
           headers: {
               'Authorization': `Basic ${token}`,
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(subtask)
       });
       if (!response.ok) {
           throw new Error('Failed to create subtask');
       }
       return response.json();
   },

   toggleSubtask: async (subtaskId) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`${BASE_URL}/subtasks/${subtaskId}/toggle`, {
           method: 'PUT',
           headers: {
               'Authorization': `Basic ${token}`
           }
       });
       if (!response.ok) {
           throw new Error('Failed to toggle subtask');
       }
       return response.json();
   },

   getCommitSubtasks: async (commitId) => {
       const token = localStorage.getItem('token');
       const response = await fetch(`${BASE_URL}/subtasks/commit/${commitId}`, {
           headers: {
               'Authorization': `Basic ${token}`
           }
       });
       if (!response.ok) {
           throw new Error('Failed to fetch subtasks');
       }
       return response.json();
   }
};