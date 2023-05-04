import { ReactComponent as Play} from './assets/svg/play-svgrepo-com.svg'
import { ReactComponent as Pause} from './assets/svg/pause-svgrepo-com.svg'
import { ReactComponent as Refresh} from './assets/svg/bin-delete-recycle-svgrepo-com.svg'

export default function Countdown({min, sec, pause, setPlayPause, reset, session, player}) {

    return(
    <div className="centralAlign space-up timer-box">
        <div className="centralAlign">
          <h2 id="timer-label" className="label">{session ? "Current Session" : "Current Break"}</h2>
          <div className="horizontalSetter space-h-p">
            <button aria-label="Reset Timer Settings" onClick={reset}>
              <Refresh />
            </button>
            <h1 id="time-left">{min}:{sec}</h1>
            <button aria-label={setPlayPause ? "Start Timer" : "Pause Timer"} onClick={pause}>{setPlayPause ? <Play /> : <Pause />}</button>
            <audio aria-hidden="true" src="https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg" ref={player}></audio>
          </div>
        </div>
       </div>)
  }