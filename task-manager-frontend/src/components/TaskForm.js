import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) {
            alert('Title is required');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/tasks', { title, description });
            onTaskAdded(response.data);
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Add New Task</h3>
            <form onSubmit={handleSubmit} className="form-group">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="form-control mb-3"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
