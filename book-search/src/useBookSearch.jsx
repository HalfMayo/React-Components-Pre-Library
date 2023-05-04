import { useCallback, useEffect, useState } from "react";

export default function useBookSearch(query, apiKey, pageNumber) {
    const [results, setResults] = useState([]);

    const getBooks = useCallback(async (topic, index, key) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${topic}&startIndex=${(index - 1) * 10}&maxResults=10&projection=lite&key=${key}`, {
                method: "GET"
            });
            const json = await response.json();
            console.log(json.items);
            setResults(json.items);

        } catch(err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        if(pageNumber > 0) {
            getBooks(query, apiKey, pageNumber);
        }
    }, [pageNumber, getBooks]);

    return results;
}