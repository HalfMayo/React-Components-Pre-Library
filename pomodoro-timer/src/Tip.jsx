import { ReactComponent as Bulb } from './assets/svg/bulb-outline-svgrepo-com.svg'

export default function Tip({sessionTimer}) {
    return(
        <div className="horizontalSetter hint">
            <Bulb />
            <p>To start the next {sessionTimer ? "break" : "session"}, click the Play button.</p>
        </div>)
}