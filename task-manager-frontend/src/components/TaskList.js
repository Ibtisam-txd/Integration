import React, { useState } from 'react';
import axios from 'axios';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const handleEditClick = (task) => {
        setEditingTask(task);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, {
                title: editTitle,
                description: editDescription,
                status: editingTask.status,
            });
            onTaskUpdated(response.data);
            setEditingTask(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            onTaskDeleted(id);
        } catch (err) {
            console.error(err);
        }
    };

    const handleComplete = async (task) => {
        try {
            const updatedTask = { ...task, status: 'Complete' };
            const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask);
            onTaskUpdated(response.data); 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Task List</h3>
            <ul className="list-group">
                {tasks.map((task) => (
                    <li key={task._id} className="list-group-item">
                        {editingTask && editingTask._id === task._id ? (
                            <form onSubmit={handleEditSubmit} className="d-flex flex-column">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <textarea
                                    className="form-control mb-2"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                ></textarea>
                                <div>
                                    <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{task.title}</h5>
                                    <p>{task.description}</p>
                                    <span
                                        className={`badge ${
                                            task.status === 'Complete' ? 'bg-success' : 'bg-warning'
                                        }`}
                                    >
                                        {task.status}
                                    </span>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEditClick(task)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        Delete
                                    </button>
                                    {task.status !== 'Complete' && (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleComplete(task)}
                                        >
                                            Complete
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
