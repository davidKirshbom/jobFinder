import React from "react"
import NavigationBar from '../global/NavigationBar'
import Footer from '../global/Footer'
import FloatMenu from '../global/FloatMenu'
import FloatShareIcons from '../global/FloatShareIcons'
import PanelJobsAvailable from '../global/PanelJobsAvailbale'
export default () => {
    return (<div id="search-page">
        <NavigationBar />
        <FloatMenu />
        <FloatShareIcons />
        <section>
            <PanelJobsAvailable />
            </section>
        <Footer />
       
    </div>)
}