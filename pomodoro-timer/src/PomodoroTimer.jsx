import { useState, useEffect, useRef } from 'react'
import Tip from './Tip';
import Countdown from './Countdown';
import Setter from './Setter';
import './PomodoroTimer.css'

function PomodoroTimer() {
  const defaultBreak = 0.1;
  const defaultSession = 0.1;

  const [breakLength, setBreak] = useState(defaultBreak);
  const [sessionLength, setSession] = useState(defaultSession);
  const [sessionTimer, setSessionTimer] = useState(true);
  const [counter, setCounter] = useState(sessionLength*60000);
  const [pause, setPause] = useState(true);
  const [nextTimer, setNextTimer] = useState(false);
  
  const intervalRef = useRef();
  const audioRef = useRef(null);
    
  let seconds = Math.floor(counter / 1000);
  let minutes = Math.floor(seconds / 60);
  
  minutes = minutes !== 60 ? (minutes % 60).toString().padStart(2, "0") : 60;
  seconds = (seconds % 60).toString().padStart(2, "0");
  
  useEffect(() => {
    
    if(minutes + seconds < 1) {
      audioRef.current.play();
      clearInterval(intervalRef.current);
      setPause(true);
      setNextTimer(true);
  }
}, [counter])
  
  function handleClickIncrement(targetState, targetMethod) {
    
    if(pause && targetState < 60) {
      targetMethod(ts => ts + 1);
      if(targetState === sessionLength) {
        setCounter(ts => ts + (60000 - seconds*1000));
      }
    }
  }
  
  function handleClickDecrement(targetState, targetMethod) {
    
    if(pause && targetState > 1) {
      targetMethod(ts => ts - 1);
      if(targetState === sessionLength) {
        setCounter(ts => ts - (60000 - seconds*1000));
      }
    }
  }
  
  function decreaseTime() {
    setCounter(prev => prev - 1000);
  }
  
  function handlePlayPause() {
    if(!nextTimer){
        if(!pause) {
          clearInterval(intervalRef.current);
        } else {
            intervalRef.current = setInterval(decreaseTime, 1000);
        }
      setPause(ps => !ps);
    } else {
        handleNextTimer();
    }
  }
  
  function handleClickReset() {
    clearInterval(intervalRef.current);
    setBreak(defaultBreak);
    setSession(defaultSession);
    setCounter(defaultSession*60000);
    setPause(true);
    setSessionTimer(true);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  function handleNextTimer() {
    setCounter(prev => sessionTimer ? prev + breakLength*60000 : prev + sessionLength*60000);
      sessionTimer ? setSessionTimer(false) : setSessionTimer(true);
      intervalRef.current = setInterval(decreaseTime, 1000);
      setPause(false);
      setNextTimer(false);
  }
  
  return(
    <div className="box">
      <div className="setters centralAlign">
        <Setter
          setterLabel="Session Length"
          ariaLabelDecrement="Decrement Session Length"
          clickDecrement={() => handleClickDecrement(sessionLength, setSession)}
          ariaLabelIncrement="Increment Session Length"
          clickIncrement={() => handleClickIncrement(sessionLength, setSession)}
          length={sessionLength}
        />
        <Setter
          setterLabel="Break Length"
          ariaLabelDecrement="Decrement Break Length"
          clickDecrement={() => handleClickDecrement(breakLength, setBreak)}
          ariaLabelIncrement="Increment Break Length"
          clickIncrement={() => handleClickIncrement(breakLength, setBreak)}
          length={breakLength}
        />
    </div>
      <Countdown
        min={minutes}
        sec={seconds}
        pause={handlePlayPause}
        setPlayPause={pause}
        reset={handleClickReset}
        session={sessionTimer ? true : false}
        player={audioRef}/>
        {nextTimer 
          ? <Tip sessionTimer={sessionTimer}/>
          : <></>}
   </div>
  )
}

export default PomodoroTimer
