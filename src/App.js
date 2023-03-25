import "./global.css";
import "./styles.css";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [task, setTask] = useState("")

  const [tasks, setTasks] = useState(localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [])

  function handleCreateTask(event) {
    event.preventDefault();
    if (task === "") {
      // Error message
      toast.error("Digite alguma task")
    } else {
      // Add task
      const idRandom = (num) => Math.floor(Math.random() * num)
      const newTask = { id: idRandom(1000000), title: task, isComplete: false }

      setTasks([ ...tasks, newTask ])
      setTask("")
    }
  }

  function handleToggleTaskCompletion(id) {
    const taskComplete = tasks.map(task => {
      if(task.id === id) {
        return{ ...task, isComplete: !task.isComplete }
      }
      return task
    })

    setTasks(taskComplete)
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(remove => remove.id !== id))
  }

  useEffect(() => { 
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">

      <ToastContainer />

      <div className="todo">

        <header>
          <form onSubmit={handleCreateTask}>
            <input type="text" value={task} onChange={(ev) => setTask(ev.target.value)} placeholder="Digite uma tarefa" autoFocus/>
            <button type="submit"><IoMdAdd /></button>
          </form>

        </header>

        {tasks.map(task => (

          <div key={task.id} className={task.isComplete ? "task-container completed" : "task-container"}>
          <div className="check-and-title">
            <label className="checkbox-container">
              <input type="checkbox" onClick={() => handleToggleTaskCompletion(task.id)} checked={task.isComplete ? true : false}/>
              <span className="checkmark"></span>
            </label>
            <p>{task.title}</p>
          </div>

          <div><MdOutlineClose onClick={() => handleDeleteTask(task.id)} /></div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default App;
