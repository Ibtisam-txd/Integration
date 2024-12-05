import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks');
                setTasks(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
    }, []);

    const handleTaskAdded = (task) => setTasks((prev) => [...prev, task]);
    const handleTaskUpdated = (updatedTask) =>
        setTasks((prev) => prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    const handleTaskDeleted = (id) => setTasks((prev) => prev.filter((task) => task._id !== id));

    
    return (
        <div className="container">
            <h1 className="text-center my-4">Task Manager</h1>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
        </div>
    );
};

export default App;
