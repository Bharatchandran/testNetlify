import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProjectList from './components/projects/ProjectList';
import ProjectForm from './components/projects/ProjectForm';
import ProjectDetails from './components/projects/ProjectDetails';
import CommitList from './components/commits/CommitList';
import SubtaskList from './components/subtasks/SubtaskList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/projects/:projectId/commits" element={<CommitList />} />
          <Route path="/commits/:commitId/subtasks" element={<SubtaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;