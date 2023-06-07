import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Sign from "./Sign";
import Restaurants from "./Restaurants";
import Search from "./Search";

function App() {

    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/Sign' exact component={Sign} />
                <Route path='/Restaurants' exact component={Restaurants} />
                <Route path='/Search' exact component={Search} />
            </Switch>
        </div>
    );
}

export default App;
