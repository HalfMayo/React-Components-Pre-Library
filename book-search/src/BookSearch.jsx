import { useState, useCallback, useEffect } from 'react'
import { ReactComponent as Previous } from './assets/svg/left-chevron-svgrepo-com.svg'
import { ReactComponent as Next } from './assets/svg/right-chevron-svgrepo-com.svg'
import './BookSearch.css'
import SearchResults from './SearchResults'
import SearchBar from './SearchBar'
import useBookSearch from './useBookSearch'

function BookSearch() {

    const apiKey = "";

    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [isOpen, setIsOpen] = useState(null);

    let results = useBookSearch(query, apiKey, pageNumber);

    function handleNext() {
        if(query) {
            setIsOpen(null);
            setPageNumber(prev => prev + 1);
        }
    }

    function handlePrevious() {
        if(pageNumber > 1 && query) {
            setIsOpen(null);
            setPageNumber(prev => prev - 1);
        }
    }

    return(
        <div className="app">
            <SearchBar query={query} setQuery={setQuery} pageNumber={pageNumber} setPageNumber={setPageNumber} setIsOpen={setIsOpen}/>
            <ul>
                <SearchResults results={results} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </ul>
            { pageNumber
            ? <div className="navigation">
                    <button aria-label="Previous Page" className="nav-button" onClick={handlePrevious}>
                        <Previous />
                    </button>
                    <p> {pageNumber} </p>
                    <button aria-label="Next Page" className="nav-button" onClick={handleNext}>
                        <Next />
                    </button>
                </div>
            : <></>}
        </div>
    )
  
}

export default BookSearch
