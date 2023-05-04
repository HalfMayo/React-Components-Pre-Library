import { useState } from 'react'
import './Previewer.css'
import defaultText from './defaultText';
import marked from "https://cdn.skypack.dev/marked@2.0.3";
import isomorphicDompurify from 'https://cdn.skypack.dev/isomorphic-dompurify';

function Previewer() {

  const renderer = {
        text(text) {
          const newText = text.replaceAll(/\n/g, '<br>');
          return newText;
    }
  };
      
  marked.use({ renderer });
        
  const [text, setText] = useState(defaultText)
      
  function createMarkup() {
    let parsedText = marked.parse(text);
    let clean = isomorphicDompurify.sanitize(parsedText)
    return {__html : clean }
          
  }
      
  function handleChange(e) {
    setText(e.target.value);
  }
      
  return (
    <div className="app">
      <textarea className="box" name="text area for markdown text" value={text} onChange={handleChange} tabIndex="0" role ="region" aria-label="Text area for markdown text"></textarea>
      <div className="box" tabIndex="0" role ="region" aria-label="Preview area of formatted text" dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
}

export default Previewer
