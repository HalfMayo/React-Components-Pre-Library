import { useState } from 'react'
import faq from './faq'
import './Accordion.css'
import FaqList from './FaqList';

function Accordion() {

  const [isOpen, setIsOpen] = useState();

  function toggleText(i) {
    isOpen === i ? setIsOpen(null) : setIsOpen(i);
  }

  return (
    <ul>
      <FaqList isOpen={isOpen} toggleText={toggleText}/>
    </ul>
  )
}

export default Accordion
