import React,{useState} from 'react'
import { Link, Switch, Route, Router } from "react-router-dom";
import MainPage from '../components/main-page/MainPage'
import SearchWorkPage from '../components/search-work/SearchWorkPage'
import CompanyJobsWall from '../components/usersData/CompanyJobsWall'
import NotFondPage from '../components/NotFoundPage'
import history from '../router/history'
import ChooseRegisterTypePage from '../components/register/ChooseTypeRegisterPage'
import LoginBar from '../components/global/LogInBar'
import NavigationBar from '../components/global/NavigationBar'
import FloatMenu from '../components/global/FloatMenu'
import FloatShareIcons from '../components/global/FloatShareIcons'
import CompanyRegisterPage from '../components/register/CompanyRegisterPage'
import ClientRegisterPage from '../components/register/SearchWorkRegisterPage'
import Footer from '../components/global/Footer';
import DataRoute from '../router/DataRoute'
import PrivateRoute from '../router/PrivateRoute'
export default () => {
    const [isLoginBarOpen,setIsLoginBarOpen]=useState(false)
    return (
  
        <div>
        <Router history={history}>
                <header>
                    <LoginBar
                        isOpen={isLoginBarOpen}
                        setIsOpen={setIsLoginBarOpen}
                    />
            <NavigationBar onLoginPress={()=>setIsLoginBarOpen(true)} />
            <FloatMenu />
            <FloatShareIcons />
         
           
            
            </header>
            <section className="main-section">
            
                <Switch>
                    
                <Route path="/" exact component={MainPage} />
              
                        <DataRoute path="/search-work" component={SearchWorkPage} />
                        <DataRoute path="/register/user" component={ClientRegisterPage}/>
                        <DataRoute path="/register/company" component={CompanyRegisterPage}/>
                        <DataRoute path="/register" component={ChooseRegisterTypePage}/>
                        <PrivateRoute path="/my-jobs-wall" component={CompanyJobsWall}/>
                        <DataRoute component={NotFondPage} />
                     
                    </Switch>
                   
            </section>
            <Footer/>
            </Router>
            
        </div>)

    
}