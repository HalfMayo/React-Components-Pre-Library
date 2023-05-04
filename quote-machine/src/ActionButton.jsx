export default function ActionButton({id, classes, onClick, action}) {
    return(
        <button id={id} className={classes} onClick={onClick}>{action}
        </button>
    )
}