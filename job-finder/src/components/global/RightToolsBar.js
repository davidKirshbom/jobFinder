import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

export default () => {
    useEffect(() => {
        const chartsButton = document.getElementById("salary-charts-tool");
        const chartsInnerTools = document.getElementsByClassName("inner-tools")[0];
        chartsButton.addEventListener("click",() => {
            if (chartsInnerTools.classList.contains("open"))
                chartsInnerTools.classList.remove("open")
            else
                chartsInnerTools.classList.add("open")
        })
    },[])
    return (<div className="tools-container">
    <div id="search-work-tool" className="tool">
            <Link to="/search-work" id="search-work_tool" className="tool-text"><i class="fas fa-search"></i>חיפוש עבודה</Link>
    </div>
    <div id="send-cv-tool" className="tool">
        <div className="tool-text"><i class="fab fa-studiovinari " aria-hidden="true"></i>שלח קו"ח אלינו</div>
    </div>
    <div id="salary-charts-tool" className="tool">
            <div className="tool-text"><i class="far fa-chart-bar"></i><span>טבלאות שכר<i class="fas fa-angle-down"></i></span>
            </div>
            <ul className="inner-tools ">
                <li>תוכנה</li>
                <li>אינטרנט</li>
                <li>חומרה</li>
                <li>ביומד</li>
                <li>שיווק ומכירות</li>
                <li>משאבי אנוש</li>
                <li>בכירים</li>
                <li>הייטק</li>
                </ul>
   
        </div>
        <div className="shortcuts-container desktop-only">
            <h4 className="shortcut-title">שימושי</h4>
            <ul className="shortcuts-linkes">
                <li>חברות הייטק</li>
                <li>מגמות שוק</li>
                <li>פורום קריירה</li>
                <li>פורום דיני עבודה</li>
            </ul>
        </div>
    </div>)
}