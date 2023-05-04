import { useState, useRef, useCallback, useEffect } from 'react'
import ActionButton from './ActionButton';
import './QuoteMachine.css'

function QuoteMachine() {

  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [bigBox, setBigBox] = useState(null);
  const [bigBigBox, setBigBigBox] = useState(null);
  
  const refText = useRef(null);

  const getQuote = useCallback(async () => {
    try {
      setLoading(true);
    
    const response = await fetch("https://api.quotable.io/random");
    const json = await response.json();
    
    setLoading(false);
    setText(json.content);
    setBigBox(json.content.length > 80 ? true : false);
    setBigBigBox(json.content.length > 230 ? true : false);
    setAuthor(json.author);
  } catch(err) {
      console.log(err)
  }
  }, []);

  //first load API call
  useEffect(() => {
    getQuote();
  }, [getQuote]);

  //onClick API call
  function handleClick() {
    refText.current = text;
    getQuote();
  }

  return (
   <div id="quote-box">
      <div id="elements" className={`box ${bigBox ? "big-box" : ""} ${bigBigBox ? "big-big-box" : ""}`}>
        <div id="text" className={ loading ? "fade-out" : "fade-in" }>
          <p>{text}</p>
        </div>
        <div id="author" className={ loading ? "fade-out" : "fade-in" }>
          <p>{author}</p>
        </div>
     </div>
     <div className={`actions ${bigBox ? "translate-buttons" : ""} ${bigBigBox ? "translate-more-buttons" : ""}`}>
      <ActionButton id="share" classes="lesser-button" action="Share Now" />
      <ActionButton id="new-quote" onClick={handleClick} action="New Quote" />
    </div>
  </div>
  );
}

export default QuoteMachine
