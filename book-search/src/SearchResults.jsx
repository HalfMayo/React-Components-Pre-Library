import { ReactComponent as Dots } from './assets/svg/dots-3-horizontal-svgrepo-com.svg'

export default function SearchResults({results, isOpen, setIsOpen}) {

    function showExtendedInfo(i) {
        isOpen === i ? setIsOpen(null) : setIsOpen(i);
    }

    return(
        results.map((book, index) =>
            <li key={index}>
                <div className="search-result">
                    <img src={book.volumeInfo.imageLinks?.thumbnail}/>
                    <div className="briefInfo">
                        <p className="title">{book.volumeInfo.title}</p>
                        <p className="author">{book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "-"}</p>
                    </div>
                    <button aria-label="More Information" className="dots" onClick={() => showExtendedInfo(index)}>
                        <Dots />
                    </button>
                </div>
                <div className={`moved ${isOpen === index ? "show" : ""}`}>
                    <div className="briefInfo pad">
                        <p className="title-ext">Title: {book.volumeInfo.title}</p>
                        <p className="author-ext">Author: {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "-"}</p>
                        <p className="date">Year: {book.volumeInfo.publishedDate?.match(/[0-9]{4}/).join("")}</p>
                        <p className="plot">Description: {book.volumeInfo.description ? book.volumeInfo.description : "-"}</p>
                    </div>
                </div>
            </li>)
    )
}