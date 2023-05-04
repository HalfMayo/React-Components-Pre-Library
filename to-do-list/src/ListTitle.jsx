import { ReactComponent as Tick } from './assets/svg/tick-circle-svgrepo-com.svg'
import { ReactComponent as Untick } from './assets/svg/untick-circle-svgrepo-com.svg'

export default function ListTitle({title, setTitle}) {

    function confirmTitle(e) {
        e.preventDefault();
        setTitle(title);
    }

    return(
        <form action="" onSubmit={confirmTitle}>
            <label className="hide" htmlFor="title">List Title</label>
                <input className="title" type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="List title"/>
                <button aria-label="Confirm list title" className="submitTitle" type="submit">
                    {title !== ""
                        ? <Tick />
                        : <Untick />
                    }
                </button>
        </form>
    )
}