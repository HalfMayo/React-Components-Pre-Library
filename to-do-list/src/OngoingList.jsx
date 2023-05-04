import { Reorder, motion } from 'framer-motion'
import { useState } from 'react'
import EditTask from './EditTask'
import ActionButtons from './ActionButtons'

export default function OngoingList({todos, setTodos, setCompleted, checked, showButtons, setShowButtons}) {
    
    const [itemToEdit, setItemToEdit] = useState([]);
    const [edit, setEdit] = useState(null);

    function showEditButtons(i) {
        showButtons === i ? setShowButtons(null) : setShowButtons(i);
    }

    function editItem(i) {
        edit === i ? setEdit(null) : setEdit(i);
        setItemToEdit([i, todos[i]]);
        setShowButtons(null);
    }

    function changeItem(e) {
        e.preventDefault();
        const newTodos = [...todos];
        newTodos.splice(itemToEdit[0], 1, itemToEdit[1]);
        setTodos(newTodos);
        setItemToEdit([]);
        setEdit(null);
        setShowButtons(null);
    }

    function deleteItem(i) {
        const todosRemaining = [...todos];
        todosRemaining.splice(i, 1);
        setTodos(todosRemaining);
        setShowButtons(null);
    }

    function toggleDone(i) {
        const todosRemaining = [...todos];
        const todoDone = todosRemaining.splice(i, 1);
        setCompleted(prev => [...prev, todoDone]);
        setTodos(todosRemaining);
        setShowButtons(null);
    }
    
    return(
        <Reorder.Group className="checklist" axis="y" values={todos} onReorder={setTodos}>
        {todos.map((item, index) =>
        <Reorder.Item className="item-to-do" key={item} value={item}>
            {edit === index
                ? <EditTask changeItem={changeItem} itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} index={index}/>
                : <div className='item'>
                {showButtons === index ? <div className="overlay"></div> : <></>}
                <label className="checkbox-container" htmlFor={`item-${index}`}>
                    <input type="checkbox" id={`item-${index}`} name={`item-${index}`} onClick={() => toggleDone(index)} checked={!checked} readOnly={true}/>
                    <span className="checkbox"></span>
                </label>
                <button aria-label="Edit or Delete Task" className="text" onClick={() => showEditButtons(index)}>
                    <motion.div className="task"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                    duration: 0.8,
                                    ease: "linear"
                    }}>{item}</motion.div>
                </button>
            </div>
                }
                {showButtons === index
                    ? <ActionButtons editItem={editItem} deleteItem={deleteItem} index={index} setShowButtons={setShowButtons}/>
                    : <></>}
        </Reorder.Item>)}
    </Reorder.Group>
    )
}