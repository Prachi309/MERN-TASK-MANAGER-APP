import React, { useState, useEffect } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash, FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, deleteTaskById, getAllTasks, updateTaskById } from './api';
import { notify } from './utils';
import './index.css'; 

function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    // Fetch all tasks from the API
    const fetchAllTasks = async () => {
        try {
            const response = await getAllTasks();
            // Assuming response has a structure like { data: [...] }
            if (response.data) {
                setTasks(response.data);
                setCopyTasks(response.data);
            } else {
                notify('No tasks found', 'warning');
                setTasks([]); // Set to empty array if no data
                setCopyTasks([]);
            }
        } catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    // Add or update a task
    const handleTask = () => {
        if (updateTask && input) {
            // Update task
            const updatedTask = {
                taskname: input,
                isDone: updateTask.isDone,
                _id: updateTask._id,
            };
            handleUpdateItem(updatedTask);
        } else if (!updateTask && input) {
            // Add new task
            handleAddTask();
        }
        setInput('');
        setUpdateTask(null);
    };

    // Add a new task
    const handleAddTask = async () => {
        const newTask = { taskname: input, isDone: false };
        try {
            const { success, message } = await CreateTask(newTask);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to create the task', 'error');
        }
    };

    // Update an existing task
    const handleUpdateItem = async (task) => {
        try {
            const { success, message } = await updateTaskById(task._id, task);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to update the task', 'error');
        }
    };

    // Delete a task
    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await deleteTaskById(id);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to delete the task', 'error');
        }
    };

    // Toggle the completion status of a task
    const handleCheckAndUncheck = async (task) => {
        const updatedTask = { ...task, isDone: !task.isDone };
        try {
            const { success, message } = await updateTaskById(task._id, updatedTask);
            if (success) {
                notify(message, 'success');
                fetchAllTasks();
            } else {
                notify(message, 'error');
            }
        } catch (err) {
            console.error(err);
            notify('Failed to update the task', 'error');
        }
    };

    // Filter tasks based on search input
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const filteredTasks = copyTasks.filter((task) => 
          task.taskname.toLowerCase().includes(term)
        );
        setTasks(filteredTasks);
    };

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskname);
        }
    }, [updateTask]);

    return (
        <div className='d-flex flex-column align-items-center w-50 m-auto mt-5'>
            <h1 className='heading mb-4'>Task Manager</h1>
            <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
                <div className='input-group flex-grow-1 me-2'>
                    <input
                        type='text'
                        className='form-control me-1'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Add a new task'
                    />
                    <button onClick={handleTask} className='btn btn-success btn-sm me-2'>
                        <FaPlus className='m-2' />
                    </button>
                </div>
                <div className='input-group flex-grow-1'>
                    <span className='input-group-text'>
                        <FaSearch />
                    </span>
                    <input
                        type='text'
                        onChange={handleSearch}
                        className='form-control'
                        placeholder='Search tasks'
                    />
                </div>
            </div>

            {/* List of tasks */}
            <div className='d-flex flex-column w-100'>
                {Array.isArray(tasks) && tasks.map((task) => (
                    <div
                        key={task._id}
                        className='m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center'
                    >
                        <span className={task.isDone ? 'text-decoration-line-through' : ''}>
                            {task.taskname}
                        </span>
                        <div>
                            <button
                                type='button'
                                onClick={() => handleCheckAndUncheck(task)}
                                className='btn btn-sm me-2'
                            >
                                {task.isDone ? (
                                    <FaTimes style={{ backgroundColor: 'red', color: 'white', height: '25px', width: '25px' }} />
                                ) : (
                                    <FaCheck style={{ backgroundColor: 'green', color: 'white', height: '25px', width: '25px' }} />
                                )}
                            </button>
                            <button
                                type='button'
                                onClick={() => setUpdateTask(task)}
                                className='btn btn-primary btn-sm me-2'
                            >
                                <FaPencilAlt />
                            </button>
                            <button
                                type='button'
                                onClick={() => handleDeleteTask(task._id)}
                                className='btn btn-danger btn-sm me-2'
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toastify for notifications */}
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default TaskManager;
