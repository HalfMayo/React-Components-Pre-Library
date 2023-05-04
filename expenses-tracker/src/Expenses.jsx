import { useState, useMemo, useRef, useEffect } from 'react'
import Slider from './Slider'
import './Expenses.css'

function Expenses() {

  const[expenses, setExpenses] = useState("0");
  const[budget, setBudget] = useState("500");
  const[locked, setLocked] = useState(false);
  const expensesRef = useRef(null);
  const budgetRef = useRef(null);
  const expOutputRef = useRef(null);
  const bdgOutputRef = useRef(null);

  const calcBudget = useMemo(() => {
    return budget - expenses;
  })

  function changeExpSlider(e) {
    setExpenses(e.target.value);
  }

  function changeBdgSlider(e) {
    setBudget(e.target.value);
  }

  useEffect(() => {
    const vExp = (expensesRef.current.value - expensesRef.current.min) / (expensesRef.current.max - expensesRef.current.min) * 100;
    const vBdg = (budgetRef.current.value-budgetRef.current.min)/(budgetRef.current.max-budgetRef.current.min)*100;
    expensesRef.current.style.background = 'linear-gradient(to right, #006973 ' + vExp + '%, #F5F0F4 ' + vExp + '%)';
    expOutputRef.current.style.left = `calc(${vExp}% + (${8 - vExp * 0.15}px))`;
    expOutputRef.current.style.transform = `translateX(${-40 - (vExp * 0.2)}%)`;
    bdgOutputRef.current.style.left = `calc(${vBdg}% + (${8 - vBdg * 0.15}px))`;
    bdgOutputRef.current.style.transform = `translateX(${-40 - (vBdg * 0.2)}%)`;

    locked
    ? budgetRef.current.style.background = 'linear-gradient(to right, #D0C9D4 ' + vBdg + '%, #F5F0F4 ' + vBdg + '%)'
    : budgetRef.current.style.background = 'linear-gradient(to right, #006973 ' + vBdg + '%, #F5F0F4 ' + vBdg + '%)'

  }, [expenses, budget, expensesRef, budgetRef, locked])

  return(
    <div className="app">
      <div className="slider-container">
        <Slider
          min="0"
          max="500"
          valueName="expenses"
          lockable=""
          value={expenses}
          onChange={changeExpSlider}
          inputRef={expensesRef}
          outputRef={expOutputRef}
          locked={locked}
          setLocked={setLocked}/>

        <Slider
          min="0"
          max="500"
          valueName="budget"
          lockable
          value={budget}
          onChange={changeBdgSlider}
          inputRef={budgetRef}
          outputRef={bdgOutputRef}
          locked={locked}
          setLocked={setLocked}/>
      </div>
      <p className="remaining">Your remaining budget is: {calcBudget}</p>
    </div>
  )
}

export default Expenses
