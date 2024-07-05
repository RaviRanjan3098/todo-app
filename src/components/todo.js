"use client";
import React, { useState, useEffect } from 'react';
import "./style.css";

function TodoApp() {
  const [task, setTask] = useState([]); // this is the empty array to store the task one by one 
  const [inputValue, setInputValue] = useState(''); // this state is used when the user inputs the task
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // this state is defined to be visible to the task when the user wants to see 
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    // this code is used to store the local storage data 
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTask(savedTasks);
  }, []);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      let updatedTasks;
      if (isEditing) {
        updatedTasks = task.map(t =>
          t.id === currentTask.id ? { ...t, text: inputValue } : t
        );
        setIsEditing(false);
        setCurrentTask(null);
      } else {
        const newTodo = {
          id: task.length + 1,
          text: inputValue,
        };
        updatedTasks = [...task, newTodo];
      }
      setTask(updatedTasks);
      setInputValue('');
      saveTasksToLocalStorage(updatedTasks);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDeleteTodo = (id) => {
    const updatedTasks = task.filter(todo => todo.id !== id);
    setTask(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleEditTodo = (todo) => {
    setInputValue(todo.text);
    setIsEditing(true);
    setCurrentTask(todo);
  };

  const handleViewTodo = (todo) => {
    setCurrentTask(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <> 
    <div className="container-fluid p-5 d-flex flex-column align-items-center bg-info-subtle">
      <h2>Add Task</h2>  
      <div className="mb-3 w-100">
        <input
          className="form-control"
          type="text"
          placeholder="Assign The Task"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary mr-2" onClick={handleAddTodo}>
          {isEditing ? 'Update' : 'Add Task'}
        </button>
      </div>
     
      <ul className="list-group w-100">
      <h5 className="mx-3">Assignment</h5>
        {task.map(todo => (
          <li className="list-group-item  d-flex justify-content-between align-items-center" key={todo.id}>
            {todo.text}
            <div>
              <button className="btn btn-info mr-2" onClick={() => handleEditTodo(todo)}>
                Edit
              </button>
              <button className="btn btn-success mr-2 mx-2" onClick={() => handleViewTodo(todo)}>View</button>
              <button className="btn btn-danger" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,4,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content m-0 p-0">
              <div className="modal-header bg-primary">
                <h5 className="modal-title text-white m-auto">Details About Task </h5>
              </div>
              <div className="modal-body">
                <p>{currentTask?.text}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </> 
  );
}

export default TodoApp;
