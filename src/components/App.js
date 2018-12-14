import React, { Component } from 'react';
import NavBar from './NavBar';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import InternalPage from'./InternalPage';

class App extends Component {
    render() {
        return (<BrowserRouter>
            <div>
                <h1>App</h1>
                <NavBar />
                <Route exact path='/' component={Home}></Route>
                <Route path='/InternalPage' component={InternalPage}></Route>

            </div>
        </BrowserRouter>)
    }

}


export default App;
