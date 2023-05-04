import faq from './faq'

export default function FaqList({isOpen, toggleText}) {
    return(
        faq.map((question, index) => 
    <li key={question.id}>
      <button aria-label={isOpen === index ? "Hide Description" : "Show Description"} onClick={() => toggleText(index)} className={`question-box ${isOpen === index || index === faq.length - 1 ? "" : "show-border"}`}>
        {question.title}
        <svg aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className={`nav-icon ${isOpen === index ? "down" : "right"}`} fillRule="evenodd" clipRule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#000000"/>
</svg>
      </button>
      <div className={`longText-box ${isOpen === index ? "show" : ""}`}>
        <div className="longText-inner">
          <p>{question.longText}</p>
        </div>
      </div>
    </li>)
    )
}