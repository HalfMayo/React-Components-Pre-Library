import { useRef, useEffect, useState } from 'react'
import './Carousel.css'
import { cardsInfo } from './card-info'
import { ReactComponent as Previous} from './assets/svg/left-chevron-svgrepo-com.svg'
import { ReactComponent as Next} from './assets/svg/right-chevron-svgrepo-com.svg'

function Carousel() {

  const [currentSlide, setCurrentSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [disabledButtons, setDisabledButtons] = useState(false);
  const wrapperRef = useRef(null);

  const cardsList = cardsInfo.map(card =>
    <li key={card.id}>
      <div className="card-container">
        <img src={card.imgLink} alt={card.altText} />
        <div className="card-text">
          <h2>{card.headline}</h2>
          <h3>{card.subhead}</h3>
          <p>{card.description}</p>
        </div>
      </div>
    </li>
    )

  function handleNext() {
    if(!disabledButtons) {
      setCurrentSlide(prev => prev + 1);
    }
  }

  function handlePrevious() {
    if(!disabledButtons) {
      setCurrentSlide(prev => prev - 1);
    }
  }

  function setLoop() {
    if(currentSlide === 0) {
      setDisabledButtons(true);
      setTransitionEnabled(false);
      setCurrentSlide(cardsList.length);
    } else if (currentSlide === cardsList.length + 1) {
      setDisabledButtons(true);
      setTransitionEnabled(false);
      setCurrentSlide(1)
    } else {
      setDisabledButtons(false);
    }
  }

  useEffect(() => {
    wrapperRef.current.addEventListener("transitionstart",() => {
      setDisabledButtons(true);
    })
  }, [])

  useEffect(() => {
    if(currentSlide === 1 || currentSlide === cardsList.length) {
      setDisabledButtons(false);
      setTimeout(() => {
        setTransitionEnabled(true);
      }, 100)
    }
  }, [currentSlide])

  return (
    <div className="carousel">
      <button aria-label="Previous Card" onClick={handlePrevious}>
        <Previous />
      </button>
      <ul>
        <div className={`cards-wrapper ${transitionEnabled ? "transition" : ""}`} ref={wrapperRef} onTransitionEnd={setLoop} style={{
      transform: `translateX(-${100 * currentSlide}%)`,
    }}>
          {cardsList[cardsList.length - 1]}
          {cardsList}
          {cardsList[0]}
        </div>
      </ul>
      <button aria-label="Next Card" onClick={handleNext}>
        <Next />
      </button>
    </div>
  )
}

export default Carousel
