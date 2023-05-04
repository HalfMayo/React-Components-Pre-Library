import { ReactComponent as Minus } from './assets/svg/minus-svgrepo-com.svg'
import { ReactComponent as Plus } from './assets/svg/plus-svgrepo-com.svg'

export default function Setter({setterLabel, ariaLabelDecrement, clickDecrement, ariaLabelIncrement, clickIncrement, length}) {
    return(
        <div className="centralAlign setter-box">
            <h3 className="label" name={setterLabel}>{setterLabel}</h3>
            <div className="centralAlign horizontalSetter space-h-p">
                <button aria-label={ariaLabelDecrement} onClick={clickDecrement}>
                    <Minus />
                </button>
                <h3>{length}</h3>
                <button aria-label={ariaLabelIncrement} onClick={clickIncrement}>
                    <Plus />
                </button>
            </div>
        </div>
    )
}