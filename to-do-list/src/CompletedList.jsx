import { Reorder } from 'framer-motion'

export default function CompletedList({completed, setCompleted, setTodos, checked}) {

    function toggleUndone(i) {
        const todosDone = [...completed];
        const todoUndone = todosDone.splice(i, 1);
        setTodos(prev => [...prev, todoUndone]);
        setCompleted(todosDone);
    }

    return(
        <Reorder.Group className="checklist" axis="y" values={completed} onReorder={setCompleted}>
            {completed.map((item, index) =>
                <Reorder.Item className="item-done" key={item} value={item}>
                    <div>
                        <input type="checkbox" id={`item-${index}`} name={`item-${index}`} className="greyed-out" onClick={() => toggleUndone(index)} checked={checked} readOnly={true}/>
                        <label className="task" htmlFor={`item-${index}`}>{item}</label>
                    </div>
                </Reorder.Item>)}
        </Reorder.Group>
    )
}