import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import * as BooksAPI from './BooksAPI'
import * as queryString from 'query-string'

const Search = () => {


    const history = useHistory()
    const location = useLocation()



    useEffect(() => {

        const searchQuery = queryString.parse(location.search)
        
        async function fetchData() {
            let response = await BooksAPI.search(searchQuery.query)
            if (response.error === 'empty query') {
                setSearchResult([])
            } else {
                setSearchResult(response)
            }
        }

        if (searchQuery.query)
            fetchData();

        return () => {
            setSearchResult([])
        }
    }, []);

    const [searchResult, setSearchResult] = useState([])

    const searchBooks = async (e) => {
        if (e.key === 'Enter' && e.target.value) {
            history.push({ pathname: "/search", search: `?query=${e.target.value}` })
            let response = await BooksAPI.search(e.target.value)
            if (response.error === 'empty query') {
                setSearchResult([])
            } else {
                setSearchResult(response)
            }
        }

    }

    const selectAction = async (e, item) => {
        await BooksAPI.update(item, e.target.value)
        history.push("/")
    }
    const goBack = () => {
        history.goBack();
    }

    return (
        <div className="app">
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => goBack()}>Close</button>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author" onKeyPress={(e) => searchBooks(e)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResult && searchResult.map((b) =>
                            <li key={b.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${b.imageLinks.thumbnail}")` }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(e) => selectAction(e, b)} value='move'>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{b.title}</div>
                                    {b.authors && b.authors.map((a, i) => <div className="book-authors" key={i}>{a}</div>)}

                                </div>
                            </li>)}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Search
