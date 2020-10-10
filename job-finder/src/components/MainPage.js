import React from 'react'
import NavigationBar from './NavigationBar'
import SearchPanel from './SearchPanel'
import NavigationBoxes from './NavigationBoxs'
import '../styles/sheared.scss'
export default () => 
    (<div className="page-container">
        <NavigationBar />
        <section>
            <SearchPanel />
        </section>
        <NavigationBoxes/>

    </div>)
