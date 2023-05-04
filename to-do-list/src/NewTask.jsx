import { ReactComponent as Add } from './assets/svg/plus-svgrepo-com.svg'
import { useState } from 'react'

export default function NewTask({setTodos, setShowButtons}) {

    const [itemToAdd, setItemToAdd] = useState("");

    function resetAndAdd(e) {
        setShowButtons(null);
        setItemToAdd(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setTodos(prev => [...prev, itemToAdd]);
        setItemToAdd("");
    }

    return(
        <form action="" onSubmit={handleSubmit}>
                    <label className="hide" htmlFor="item">Add new  item or action</label>
                    <textarea type="text" id="item" name="item" value={itemToAdd} onChange={resetAndAdd}/>
                    <button className="submit" type="submit">
                        <Add />
                    </button>
            </form>
    )
}