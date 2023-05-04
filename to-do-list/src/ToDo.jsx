import { useEffect, useState } from 'react'
import './ToDo.css'
import CompletedList from './CompletedList';
import OngoingList from './OngoingList';
import ListTitle from './ListTitle';
import NewTask from './NewTask';
import { Reorder, motion } from 'framer-motion'

function ToDo() {
    const [todos, setTodos] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [title, setTitle] = useState("");
    const [active, setActive] = useState(true);
    const [checked, setChecked] = useState(true);
    const [showButtons, setShowButtons] = useState(null);

    function switchCompleted() {
        setActive(false);
    }

    function switchActive() {
        setActive(true);
    }

    function clearDone() {
        setCompleted([]);
    }

  return(
    <div className="app">
        <div className="navigateLists">
            <button className={active ? "active" : ""} onClick={switchActive}>Active</button>
            <button className={!active ? "active" : ""} onClick={switchCompleted}>Completed</button>
        </div>
        <div>
            <ListTitle title={title} setTitle={setTitle}/>
            {active
            ? <NewTask setTodos={setTodos} setShowButtons={setShowButtons}/>
            : <></>}
        </div>
        {active
        ? <>
           <OngoingList todos={todos} setTodos={setTodos} setCompleted={setCompleted} checked={checked} showButtons={showButtons} setShowButtons={setShowButtons}/>
            <div className="active-actions"><p>Tasks remaining: {todos.length}</p></div>
        </>
        : <>
            <CompletedList completed={completed} setCompleted={setCompleted} setTodos={setTodos} checked={checked}/>
            <div className="completed-actions">
                <p>Tasks done: {completed.length}</p>
                <button onClick={clearDone}>Clear completed</button>
            </div>
        </>}
    </div>
  )
}

export default ToDo
