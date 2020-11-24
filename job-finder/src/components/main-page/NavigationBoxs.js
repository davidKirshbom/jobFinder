import React,{useEffect} from 'react'

export default () => {
    useEffect(() => {
        const salaryChartBox = document.querySelector(".box.salary-tabs-box");
        salaryChartBox.addEventListener("click", () => {
            if (salaryChartBox.classList.contains("expended"))
                salaryChartBox.classList.remove("expended")
            else
                salaryChartBox.classList.add("expended")
        })
    },[])
    return (<div className="boxes-container">
    <div className="box candidate-box">
        <div className="box-header">
                <div className="text-container">
                    מידע למועמדים
                    <i className="fas fa-plus"></i>
                </div>
        </div>
            <div className="box-contant">
                <ul>
                    <li>חברות הייטק</li>
                    <li>מגמות שוק</li>
                    <li>פודקאסטים</li>
                    <li>פורום קריירה</li>
                    <li>פורום דיני עבודה</li>
                </ul>
        </div>
    </div>
    <div className="box senior-box">
        <div className="box-header">
                <div className="text-container">
                    בכירים
                    <i className="fas fa-plus"></i>
                </div>
        </div>
            <div className="box-contant">
                <ul>
                    <li>משרות בכירות</li>
                    <li>אתר בכירים</li>
                    <li>פניה אישית ודיסקרטית</li>
                </ul>
        </div>
    </div>
    <div className="box salary-tabs-box">
        <div className="box-header">
                <div className="text-container">
                    טבלאות שכר 
                    <i className="fas fa-plus"></i> 
                    <i id="minus-font" className="fas fa-minus"></i>
                </div>
        </div>
            <div className="box-contant">
                <ul>
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
    </div>
    <div className="box personal-box">
        <div className="box-header">
                <div className="text-container">
                    פנייה אישית
                    <i className="fas fa-plus"></i>
                </div>
        </div>
        <div className="box-contant">
                <ul>
                    <li>מתכנתים ומהנדסי תוכנה</li>
                    <li>מהנדסי חומרה ומכונות</li>
                    <li>יוצאי יחידות טכנולוגיות</li>
                    <li>דרושים הייטק</li>
                    <li>ביוטק ביומד קלינטק</li>
                </ul>
            </div>
        </div>
        <div className="box linkedin-box"></div>
    </div>)
}