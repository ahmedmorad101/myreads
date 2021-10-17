import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import * as BooksAPI from './BooksAPI'

const Books = () => {

    const history = useHistory()
    const [books, setBooks] = useState([])

    useEffect(() => {

        async function fetchData() {
            let response = await BooksAPI.getAll();

            setBooks(response);
        }

        fetchData();

        return () => {
            setBooks([])
        }
    }, []);


    const selectAction = async (e, item) => {

        await BooksAPI.update(item, e.target.value)
        let response = await BooksAPI.getAll();

        setBooks(response);

    }

    const goSearch = () => {
        history.push({ pathname: "/search" })
    }

    return (
        <div>

            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books && books.filter((b) => b.shelf === 'currentlyReading').map((b) => <li key={b.id}>
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
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">

                                    {books && books.filter((b) => b.shelf === 'wantToRead').map((b) => <li key={b.id}>
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
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">

                                    {books && books.filter((b) => b.shelf === 'read').map((b) => <li key={b.id}>
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
                </div>
                <div className="open-search">
                    <button onClick={() => goSearch()}>Add a book</button>
                </div>
            </div>

        </div>
    )
}

export default Books
