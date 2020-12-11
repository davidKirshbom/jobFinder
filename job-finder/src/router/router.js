import React,{useState,useEffect} from 'react'
import { Link, Switch, Route, Router,withRouter } from "react-router-dom";
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
import DataRoute from '../router/DataRoute';
import SoftwareWantedPage from '../components/pages-data/WantedSoftware'
import PrivateRoute from '../router/PrivateRoute'
import WantedIInternet from '../components/pages-data/WantedIInternet';
import WantedHardware from '../components/pages-data/WantedHardware';
import WantedInfrastructure from '../components/pages-data/WantedInfrastructure';
import WantedInformationSystem from '../components/pages-data/WantedInformationSystem';
import SenorEmail from '../components/pages-data/SenorEmail';
import UserJobsData from '../components/usersData/UserJobsData';
import userAgentsPage from '../components/usersData/UserAgentsPage';
import AgentsListsPage from '../components/usersData/AgentsListsPage';

export default () => {
    useEffect(() => {
        window.addEventListener('error', (msg, src, lineno, colno, err) => {
            console.log("msg error", msg)
        })
        
        
        // console.log('sksklasdmalkmdaslkdmsalkmaskl')
        // setUser(null)
    }, [])
    
history.listen((location, action) => {
    console.log("one change");
    // Do stuff.
    setIsMainPage(location.pathname==='/')
})
    const [isOnMainPage,setIsMainPage]=useState(true)
    const [isLoginBarOpen,setIsLoginBarOpen]=useState(false)
    console.log('history.location.pathname',history.location.pathname)
    return (
  
        <div>
        <Router history={history}>
                <header>
                    <LoginBar
                        isOpen={isLoginBarOpen}
                        setIsOpen={setIsLoginBarOpen}
                    />
                    <NavigationBar
                        onLoginPress={() => setIsLoginBarOpen(true)}
                        isMainPage={isOnMainPage}
                    />
            <FloatMenu />
            <FloatShareIcons />
         
           
            
            </header>
            <section className="main-section">
            
                <Switch>
                    
                <Route path="/" exact component={MainPage} />
              
                        <DataRoute path="/search-work" component={SearchWorkPage} />
                        <DataRoute path="/register/user" component={ClientRegisterPage}/>
                        <DataRoute path="/register/company" component={CompanyRegisterPage}/>
                        <DataRoute path="/register" component={ChooseRegisterTypePage} />
                        <DataRoute path="/software-wanted" component={SoftwareWantedPage}/>
                        <DataRoute path='/internet-wanted' component={WantedIInternet}/>
                        <DataRoute path='/hardware-wanted' component={WantedHardware}/>
                        <DataRoute path='/infrastructure-wanted' component={WantedInfrastructure}/>
                        <DataRoute path='/information-system-wanted' component={WantedInformationSystem}/>
                        <DataRoute path='/senor-email' component={SenorEmail}/>
                        <PrivateRoute path="/my-jobs-wall" component={CompanyJobsWall} />
                        <PrivateRoute path='/user-save-jobs' component={UserJobsData}/>
                        <PrivateRoute path='/user-agent' component={AgentsListsPage} />
                        <PrivateRoute path='/agent-page' component={userAgentsPage}/>
                        <DataRoute component={NotFondPage} />
                     
                    </Switch>
                   
            </section>
            <Footer/>
            </Router>
            
        </div>)

    
}