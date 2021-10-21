import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import * as BooksAPI from '../api/BooksAPI'
import * as queryString from 'query-string'
import debounce from 'lodash.debounce'
import * as _ from 'lodash'
import Loader from '../components/Loader'

const Search = () => {

    const history = useHistory()
    const location = useLocation()
    const [books, setBooks] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const searchQuery = queryString.parse(location.search)

        setIsLoading(true)
        if (searchQuery.query) {
            setQuery(searchQuery.query);
            searchBooks(searchQuery.query);
        }

        loadBooks();
        setIsLoading(false)

        return () => {
            setSearchResult([])
            setBooks([])
        }
    }, []);

    const loadBooks = async () => {
        let response = await BooksAPI.getAll();
        setBooks(response);
    }

    const searchBooks = async (val) => {
        history.push({ pathname: "/search", search: `?query=${val}` })
        if (val) {
            setIsLoading(true)
            try {

                let response = await BooksAPI.search(val)
                setIsLoading(false)
                if (response.error === 'empty query') {
                    setSearchResult([])
                } else {
                    setSearchResult(response)
                }
            } catch (error) {
                setIsLoading(false)
            }
        } else {
            setSearchResult([])
        }
    }

    const handleSearch = (value) => {
        setQuery(value);
        debounceSearchBooks(value)
    }

    const debounceSearchBooks = useMemo(() => debounce((val) => searchBooks(val), 500), [])

    const selectAction = async (e, item) => {
        try {

            setIsLoading(true)
            await BooksAPI.update(item, e.target.value)
            await searchBooks(query)
            await loadBooks()
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }
    const goBack = () => {
        history.push("/");
    }

    return (
        <div className="app">
            <Loader visible={isLoading} />
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => goBack()}>Close</button>
                    <div className="search-books-input-wrapper">

                        <input type="text"
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <h2 className="bookshelf-title">None</h2>
                    <ol className="books-grid">
                        {searchResult && searchResult.filter(i => !_.includes(_.map(books, 'id'), i.id)).map((b) =>
                            <li key={b.id}>
                                <div className="book">
                                    <div className="book-top">
                                        {b.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${b.imageLinks.thumbnail}")` }}></div>}

                                        <div className="book-shelf-changer">
                                            <select onChange={(e) => selectAction(e, b)} value='move'>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{b.title}</div>
                                    {b.authors && b.authors.map((a, i) => <div className="book-authors" key={i}>{a}</div>)}

                                </div>
                            </li>)}
                    </ol>

                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <ol className="books-grid">
                        {searchResult && searchResult.filter(i => _.includes(_.map(_.filter(books, x => x.shelf === 'currentlyReading'), 'id'), i.id)).map((b) =>
                            <li key={b.id}>
                                <div className="book">
                                    <div className="book-top">
                                        {b.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${b.imageLinks.thumbnail}")` }}></div>}

                                        <div className="book-shelf-changer">
                                            <select onChange={(e) => selectAction(e, b)} value='move'>
                                                <option value="move" disabled>Move to...</option>
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

                    <h2 className="bookshelf-title">Reading</h2>
                    <ol className="books-grid">
                        {searchResult && searchResult.filter(i => _.includes(_.map(_.filter(books, x => x.shelf === 'read'), 'id'), i.id)).map((b) =>
                            <li key={b.id}>
                                <div className="book">
                                    <div className="book-top">
                                        {b.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${b.imageLinks.thumbnail}")` }}></div>}

                                        <div className="book-shelf-changer">
                                            <select onChange={(e) => selectAction(e, b)} value='move'>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{b.title}</div>
                                    {b.authors && b.authors.map((a, i) => <div className="book-authors" key={i}>{a}</div>)}

                                </div>
                            </li>)}
                    </ol>


                    <h2 className="bookshelf-title">Want To Read</h2>
                    <ol className="books-grid">
                        {searchResult && searchResult.filter(i => _.includes(_.map(_.filter(books, x => x.shelf === 'wantToRead'), 'id'), i.id)).map((b) =>
                            <li key={b.id}>
                                <div className="book">
                                    <div className="book-top">
                                        {b.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${b.imageLinks.thumbnail}")` }}></div>}

                                        <div className="book-shelf-changer">
                                            <select onChange={(e) => selectAction(e, b)} value='move'>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
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
