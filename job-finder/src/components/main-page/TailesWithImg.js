import React from 'react'

export default () => {
    return (
    <div className="tailes-container">
    <div id="find-work-tail" className="tail-container">
        <div  className="img-round-container"></div>
        <div className="text-tail-container">מדריך וידאו <br/>למציאת עבודה</div>
    </div>
    <div id="cv-writing-tail" className="tail-container">
        <div className="img-round-container"></div>
        <div className="text-tail-container">המדריך לכתיבת<br/>קורות חיים</div>
    </div>
    <div id="recru-tail" className="tail-container">
        <div className="img-round-container"></div>
                <div className="text-tail-container">מגייסים<br /><i className="fas fa-plus"></i></div>
                <ul className="box-contant hiden-tile-menu">
                    <div className="little-triangle"></div>
                    <li>גיוס עובדי הייטק מנוסים</li>
                    <li>שירותי HR במיקור חוץ</li>
                    <li>גיוס מטה ורכש וכספים</li>
                </ul>
    </div>
    
    </div>)
}