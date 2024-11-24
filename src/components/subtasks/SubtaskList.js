import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

function SubtaskList() {
  const { commitId } = useParams();
  const [subtasks, setSubtasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchSubtasks();
  }, [commitId]);

  const fetchSubtasks = async () => {
    try {
      const data = await api.getCommitSubtasks(commitId);
      setSubtasks(data);
    } catch (error) {
      console.error('Failed to fetch subtasks:', error);
    }
  };

  const handleAddSubtask = async (e) => {
    e.preventDefault();
    try {
      await api.createSubtask(commitId, { task: newTask, completed: false });
      setNewTask('');
      fetchSubtasks();
    } catch (error) {
      console.error('Failed to create subtask:', error);
    }
  };

  const handleToggleSubtask = async (subtaskId) => {
    try {
      await api.toggleSubtask(subtaskId);
      fetchSubtasks();
    } catch (error) {
      console.error('Failed to toggle subtask:', error);
    }
  };

  return (
    <div className="subtask-list">
      <h3>Subtasks</h3>
      <form onSubmit={handleAddSubtask}>
        <input
          type="text"
          placeholder="New subtask"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Subtask</button>
      </form>

      <div className="subtasks">
        {subtasks.map(subtask => (
          <div key={subtask.id} className="subtask-item">
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => handleToggleSubtask(subtask.id)}
            />
            <span className={subtask.completed ? 'completed' : ''}>
              {subtask.task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubtaskList;