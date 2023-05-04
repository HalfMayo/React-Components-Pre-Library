import { ReactComponent as Lock } from './assets/svg/lock-svgrepo-com.svg'
import { ReactComponent as Unlock } from './assets/svg/lock-open-svgrepo-com.svg'

export default function Slider({min, max, lockable, valueName, value, onChange, inputRef, outputRef, setLocked, locked}) {
    return(
        <div className="wrapper">
            <div className="slider" lockable={lockable ? 1 : 0}>
            <label htmlFor={valueName}>{valueName[0].toUpperCase() + valueName.slice(1)}:</label>
                <div className={`indicator ${lockable && locked ? "greyed-out" : ""}`}>
                    <input ref={inputRef} type="range" min={min} max={max} value={value} onChange={onChange} id={valueName} name={valueName} disabled={lockable && locked ? true : false}></input>
                    <output ref={outputRef} className={
                    value >= 10 && value <= 99
                        ? "two-digits"
                        : value >= 100 && value <= 999
                        ? "three-digits"
                        : value >= 1000 && value <= 9999
                            ? "four-digits"
                            : value >= 10000
                            ? "five-digits"
                            : ""          
                    }><span>{value}</span></output>
                </div>
            </div>
            {lockable ? <button onClick={() => setLocked(prev => !prev)}>{locked ? <Unlock /> : <Lock />}</button> : <></>}
        </div>
    )
}