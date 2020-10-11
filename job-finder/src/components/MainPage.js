import React from 'react'
import NavigationBar from './NavigationBar'
import SearchPanel from './SearchPanel'
import NavigationBoxes from './NavigationBoxs'
import BrandsRolling from './RollingText'
import BuissnesContactBanner from './BuissnesContactBanner'
import CatgoriseHiThech from './CatgorizeHiTechJobs'
import '../styles/sheared.scss'
export default () => 
    (<div className="page-container">
        <NavigationBar />
        <section>
            <SearchPanel />
        </section>
        <NavigationBoxes/>
        <BrandsRolling />
        <section>
            <BuissnesContactBanner />
            <a href="#hi-tech-jobs" className="arrow-move-next-section-desktop"> <i  className="fas fa-angle-down"></i></a>
        </section>
        <section id="hi-tech-jobs">
        <h2 className="catgories-title">מצא משרות הייטק לפי תחום</h2>
            <CatgoriseHiThech/>
        </section>
    </div>)
