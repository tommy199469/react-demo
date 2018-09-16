import React, { Component } from 'react';
import './App.css';
import Header from "./containers/header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./components/User";
import UserProfile from "./components/UserProfile";
import Photos from "./components/Photos"
import Posts from "./components/Posts"
import Todos from "./components/Todos"
class App extends Component {

  // constructor(props){
  //   super(props)

  // }

  // componentDidMount(){

  // }

  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Route exact path="/" component={User} />
          <Route exact path="/user/:id" component={UserProfile} />
          <Route exact path="/photos/:id" component={Photos} />
          <Route exact path="/posts/:id" component={Posts} />
          <Route exact path="/todos/:id" component={Todos} />
        </div>
      </Router>
    );
  }
}

export default App;
