import { ReactComponent as Search } from './assets/svg/magnifying-glass-svgrepo-com.svg'

export default function SearchBar({query, setQuery, pageNumber, setPageNumber, setIsOpen}) {

    function handleSubmit(e) {
        e.preventDefault();
        setIsOpen(null);
        setPageNumber(prev => prev + 1);
    }

    function handleNewSubmit(e) {
        e.preventDefault();
        setIsOpen(null);
        setPageNumber(1);
    }

    return(
        <div className="search-bar">
            <label className="hide" htmlFor="user-query">What book are you searching for?</label>
            <input id="user-query" name ="user-query" type="text" onChange={e => setQuery(e.target.value)} placeholder="Search for books"/>
            <button aria-label="Search Book" className="search-button" type="submit" onClick={query 
                                                                                                    ? pageNumber === 0
                                                                                                        ? handleSubmit
                                                                                                        : handleNewSubmit
                                                                                                    : console.log("nope")}>
                <Search />
            </button>
        </div>
    )
}