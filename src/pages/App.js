import React from 'react'

import '../assets/css/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Books from './Books'
import Search from './Search'


const BooksApp = () => {



  return (

    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Books />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </Router>
    </div>

  )
}

export default BooksApp

