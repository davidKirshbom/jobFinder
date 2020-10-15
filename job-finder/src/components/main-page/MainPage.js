import React from 'react'
import NavigationBar from '../global/NavigationBar'
import FloatMenu from'../global/FloatMenu'
import SearchPanel from './SearchPanel'
import NavigationBoxes from './NavigationBoxs'
import BrandsRolling from './RollingText'
import BuissnesContactBanner from './BuissnesContactBanner'
import CatgoriseHiThech from './CatgorizeHiTechJobs'
import GuidesTails from './TailesWithImg'
import Footer from '../global/Footer'
import BackToTop from './BackToTopBtn'


export default () => 
    (<div className="page-container">
        <NavigationBar />
        <FloatMenu/>
        <section id="search-panel-section" >
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
        <section className="guides-tiles">
        <GuidesTails/>
        </section>
        <section id="about-us">
            <div className="about-us-text-container">
            <div className="about-us-header">
                <h2>חברת השמה בהייטק</h2>
            </div>
            <div className="about-us-text">
            <p>Jobinfo מתמחה בתהליכי איתור וגיוס מועמדים טכנולוגים. כחברת השמה אנו מלווים מעל 20 שנה מועמדים לכל אורך הקריירה, משלב היותם סטודנטים ועד הגעתם למשרות ניהוליות בכירות. חלק גדול מהמועמדים שליווינו חוזרים ומגייסים את הצוותים שלהם דרכנו.</p>
            <p><strong>הירשמו לאתר Jobinfo ותוכלו להיחשף לעשרות משרות חדשות הנפתחות מידי יום</strong> בתחומים: תוכנה, אינטרנט, חומרה, תקשורת, אבטחת מידע, ביומד, מערכות מידע (DBA), כספים, שיווק ומכירות, רכש ותפעול. ניתן לפנות בקלות על ידי הרשמה וטעינת קורות חיים חד פעמית.</p>
            <p><strong>למה חברות השמה? </strong>כחברת השמה להייטק אנו מבינים את החשיבות של תכנון הקריירה שלכם. העבודה לפי צוותי התמחות בשילוב מידע אודות דרישות החברות המגייסות מאפשרים לנו לקדם אתכם לשלב הבא ולהתבלט מבין כל המועמדים. עם לקוחותינו נמנות חברות מובילות בתעשיות ההייטק והביומד, סטרטאפים, חברות בינלאומיות ומרכזי פיתוח הפועלים בארץ.</p>
                </div>
                </div>
            <a className="send-CV"><i class="fab fa-studiovinari "></i> שלח קו"ח אלינו</a>
        </section>
        <section >
            <Footer />
         
        </section>
        <BackToTop headerSelector="#search-panel-section"/>
    </div>)
