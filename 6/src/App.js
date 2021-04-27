import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Employees from "./components/Employees/Employees";

export default function BasicExample() {
    return (
        <Router>
            <div className='app'>
                <Navbar/>
                <div className='main_content_container'>
                    <Switch>
                        <Route exact path='/'>
                            <Home/>
                        </Route>
                        <Route path='/employees'>
                            <Employees/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
