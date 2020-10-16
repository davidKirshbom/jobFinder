import React from 'react'
import { Link, Switch, Route, Router } from "react-router-dom";
import MainPage from '../components/main-page/MainPage'
import SearchWorkPage from '../components/search-work/SearchWorkPage'
import NotFondPage from '../components/NotFoundPage'
import { createBrowserHistory as createHistory } from 'history'

import NavigationBar from '../components/global/NavigationBar'
import FloatMenu from '../components/global/FloatMenu'
import FloatShareIcons from '../components/global/FloatShareIcons'
import PanelJobsAvailable from '../components/global/PanelJobsAvailbale'
import Footer from '../components/global/Footer';
import DataRoute from '../router/DataRoute'
 const history = createHistory();
export default () => {
    return (
  
        <div>
            <header>
            <NavigationBar />
            <FloatMenu />
            <FloatShareIcons />
            <PanelJobsAvailable />
           
            
            </header>
            <section className="main-section">
            <Switch>
                <Route path="/" exact={true} component={MainPage} />
              
                    <DataRoute path="/search-work" component={SearchWorkPage} />
                    <DataRoute component={NotFondPage}/>
                </Switch>
            </section>
            <Footer/>

            
        </div>)

    
}