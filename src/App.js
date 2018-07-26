import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import todolist from './todolist'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/todolist' component={todolist} />
        </div>
      </Router>
    )
  }
}

export default App