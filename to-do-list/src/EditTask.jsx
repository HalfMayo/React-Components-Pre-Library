import { ReactComponent as Add } from './assets/svg/plus-svgrepo-com.svg'

export default function EditTask({changeItem, itemToEdit, setItemToEdit, index}) {
    return(
        <form className="edit" action="" onSubmit={changeItem}>
            <textarea type="text" id="item" name="item" value={itemToEdit[1]} onChange={e => setItemToEdit([index, e.target.value])}/>
            <button aria-label="Add task" className="submit" type="submit">
                <Add />
            </button>
        </form>
    )
}