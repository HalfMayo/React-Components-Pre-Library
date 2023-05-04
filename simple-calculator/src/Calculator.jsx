import { useState, useRef } from 'react'
import './Calculator.css'
import { buttonsInfo } from './buttonsInfo';

function Calculator() {
  //input = infix expression
  const numRef = useRef(["0"]);
  const [numbers, setNumbers] = useState(["0"]);
  const [currEl, setCurrEl] = useState(["0"]);
  
  //Shunting-yard algorithm (infix -> RPN)
  function toRPN(expr) {
    let output = [];
    const stack = [];
    
    for(let i = 0; i < expr.length; i++) {
      let op = expr[i];
      
      if(op === "+" || op === "-" || op === "*" || op === "/") {
        while(stack.length !== 0 && getPrecedence(stack[stack.length - 1]) >= getPrecedence(op)) {
          output.push(stack.pop());
        }
        stack.push(op);
      } else {
        output.push(op)
      }
    }
    while(stack.length > 0) {
      output.push(stack.pop());
    }
    return output;    
  }
  
  //operators precedence
  function getPrecedence(token) {
    if(token === "+" || token === "-") {
      return 1;
    }
    
    if(token === "*" || token === "/") {
      return 2;
    }
  }
    
  //RPN parsing algorithm
  function rpnParser(expr) {
    const stack = [];
    
    for(let i = 0; i < expr.length; i++) {
      let op = expr[i];
      let a, b;
      
      switch(op) {
        case "+":
          b = parseFloat(stack.pop());
          a = parseFloat(stack.pop());
          stack.push(a+b);
          break;
        case "-":
          b = parseFloat(stack.pop());
          a = parseFloat(stack.pop());
          stack.push(a-b);
          break;
        case "*":
          b = parseFloat(stack.pop());
          a = parseFloat(stack.pop());
          stack.push(a*b);
          break;
        case "/":
          b = parseFloat(stack.pop());
          a = parseFloat(stack.pop());
          stack.push(a/b);
          break;
        default:
          stack.push(op);
      }
    }
    return stack.join("");
  }

  function handleClick(e) {
    if(e.target.value === "AC") handleClickClear(e)
    else if (e.target.value === "=") handleClickResult(e)
    else if (/[0-9]/.test(e.target.value)) handleClickNumbers(e)
    else handleClickOperators(e);
  }
  
  function handleClickNumbers(e) {
    //per non aggiungere più di uno "0" all'inizio
    if(numRef.current.length === 1 && numRef.current[0] === "0" && e.target.value === "0") {
      return;
    }
    //per non aggiungere più di una virgola
    if(/[\.]/.test(numRef.current) && e.target.value === ".") {
      return;
    }
    //per sostituire lo "0" di default con un numero
    if(numRef.current.length === 1 && numRef.current[0] === "0" && /[1-9]/.test(e.target.value)) {
      numRef.current = [e.target.value];
      setCurrEl([e.target.value]);
      const copyArr = [...numbers];
      copyArr.pop();
      setNumbers([...copyArr, e.target.value]);
    
      return;
    }
    //se l'ultimo elemento di numRef è un operatore, si resetta il valore di numRef...
    if(/[-\+\*\/]/.test(numRef.current[numRef.current.length - 1])) {
      numRef.current = [e.target.value];
      setCurrEl([e.target.value]);
      setNumbers(prev => [...prev, e.target.value]);
    } else 
    //...altrimenti si aggiunge e.target.value in coda
    {
      numRef.current = [...numRef.current, e.target.value];
      setCurrEl([...currEl, e.target.value]);
      setNumbers(prev => [...prev, e.target.value]);
    }
  }
  
  function handleClickOperators(e) {
    //per impedire di aggiungere più di 2 "-" (un operatore seguito dal "-" di un numero negativo) o più di un "-" all'inizio dell'espressione
    if(numRef.current.length === 2 && numRef.current.every(el => el === "-") || numbers.length === 1 && numbers[0].split("").every(el => /-/.test(el)) && e.target.value === "-") {
      return;
    }
    //per poter aggiungere più "-" (un operatore seguito dal "-" di un numero negativo) all'interno dell'espressione
    if(numRef.current[0] === "-" && e.target.value === "-") {
      numRef.current = [...numRef.current, e.target.value];
      setCurrEl([...currEl, e.target.value]);
      setNumbers(prev => [...prev, e.target.value]);
      return;
    }
  //per impedire di aggiungere più di 2 operatori consecutivi
    if(numRef.current.length === 2 && numRef.current.every(el => /[-\+\*\/]/.test(el)) && /[-\+\*\/]/.test(e.target.value)) {
      numRef.current = [e.target.value];
      setCurrEl([e.target.value]);
      const copyArr = [...numbers];
      copyArr.pop();
      copyArr.pop();
      setNumbers([...copyArr, e.target.value]);  
    } 
    //per sostituire l'ultimo operatore inserito con un altro, a meno che non sia un "-", e per sostituire lo "0" con un "-" se è il primo elemento dell'espressione
    else if(/[-\+\*\/]/.test(numRef.current[0]) && /[\+\*\/]/.test(e.target.value) || numbers.length === 1 && numbers[0].split("").every(el => /-/.test(el)) && numRef.current[0] === "0" && e.target.value === "-") {
      numRef.current = [e.target.value];
      setCurrEl([e.target.value]);
      const copyArr = [...numbers];
      copyArr.pop();
      setNumbers([...copyArr, e.target.value]);
    }
    //per resettare il valore di numRef.current se è un numero
    else if(/[0-9]/.test(numRef.current[numRef.current.length - 1])) {
      numRef.current = [e.target.value];
      setCurrEl([e.target.value]);
      setNumbers(prev => [...prev, e.target.value]);
    }
    //per aggiungere gli operatori a numRef.current
    else {
      numRef.current = [...numRef.current, e.target.value];
      setCurrEl([...currEl, e.target.value]);
      setNumbers(prev => [...prev, e.target.value]);
    }
  }
  
  function handleClickResult() {
    const tempResult = numbers.join("").match(/(?<=[0-9])\W(?=[0-9])|-?\d+\.?\d+|-?\d+|\W/g);
    const rpnExpr = toRPN(tempResult);
    const result = rpnParser(rpnExpr);
    numRef.current = ["0"];
    setCurrEl([result]);
    setNumbers([result]);
  }
  
  function handleClickClear() {
    numRef.current = ["0"];
    setCurrEl(["0"]);
    setNumbers(["0"]);
  }
  
  return(
      <div className="calculator">
        <div id="display">
          <p>{numbers}</p>
        </div>   
        <div id="currOp">
          <p>{currEl}</p>
        </div>
          {buttonsInfo.map(button => 
            <button key={button.id} className={button.class} value={button.value} onClick={(e) => handleClick(e)}>
                {button.value}
            </button>)}
      </div>
  );
}

export default Calculator
