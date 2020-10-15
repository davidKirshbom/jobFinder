import React from 'react'
import { Link, Switch, Route, Router } from "react-router-dom";
import MainPage from '../components/main-page/MainPage'
import SearchWorkPage from '../components/search-work/SearchWorkPage'
import NotFondPage from '../components/NotFoundPage'
import { createBrowserHistory as createHistory } from 'history'
 const history = createHistory();
export default () => {
    return (
  
        <div>
            <Switch>
                <Route path="/" exact={true} component={MainPage} />
                    <Route path="/search-work" component={SearchWorkPage} />
                    <Route component={NotFondPage}/>
            </Switch>
        </div>)

    
}