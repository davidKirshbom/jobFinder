import React,{useEffect} from 'react'

export default () => {
    useEffect(() => {
        const categoriesList = document.getElementsByClassName("category-container");
        for (let index = 0; index < categoriesList.length; index++)
        {
            const currentCategory = categoriesList[index]
           
            const innerMenu = document.querySelector(`#${currentCategory.id}>.category-inner-menu`);
            const exitButton=document.querySelector(`#${currentCategory.id}>.category-title>.plus-icon`)
            currentCategory.addEventListener("click", (e) => {
                innerMenuToggle(e,exitButton,innerMenu)
            });
            exitButton.addEventListener("click", (e) => {
                innerMenuToggle(e,exitButton, innerMenu);
            });
          
            innerMenu.addEventListener("transitionend", (e) => {
                if(e.target.classList.contains("close"))
                    innerMenu.classList.add("take-out-from-flow")
            })
        }
    
    }, [])
    const innerMenuToggle = (e,exitButton,innerMenu) => {
        exitButton.classList.add("become-exit-button");
        if(innerMenu.classList.contains("close"))
        {
            innerMenu.classList.remove("take-out-from-flow")
            setTimeout(()=>{ innerMenu.classList.remove("close");},10)
           
        }
        else {
            exitInnerMenuEvent(e, innerMenu, exitButton)
        }
    }
    const exitInnerMenuEvent = (e,innerMenu,exitButton) => {
        e.stopPropagation();
        innerMenu.classList.add("close");
        exitButton.classList.remove("become-exit-button")
    }

    const getPluseIconSvg = () => {
        return(<svg className="plus-icon" xmlns="http://www.w3.org/2000/svg" id="Capa_1" viewBox="0 0 512 512" x="0px" y="0px" xml="http://www.w3.org/XML/1998/namespace" space="preserve" version="1.1">
        <g>
            <g>
                <path d="M 492 236 H 276 V 20 c 0 -11.046 -8.954 -20 -20 -20 c -11.046 0 -20 8.954 -20 20 v 216 H 20 c -11.046 0 -20 8.954 -20 20 s 8.954 20 20 20 h 216 v 216 c 0 11.046 8.954 20 20 20 s 20 -8.954 20 -20 V 276 h 216 c 11.046 0 20 -8.954 20 -20 C 512 244.954 503.046 236 492 236 Z" />
            </g>
        </g>
        </svg>)
    }
    return (
        <div className="categories-container">
           
            <ul className="category-list">
            <div id="programing-category" className="category-container">
                    <li className="category-title">תוכנה{getPluseIconSvg()}</li>
                    <div className="category-inner-menu close take-out-from-flow ">
                    <ul>
                        <li>מתכנת C#/.NET</li>
                        <li>מתכנת C++</li>
                        <li>מפתח למובייל</li>
                        <li>מפתח אלגוריתמים</li>
                        <li>מתכנת JAVA</li>
                        <li>System Architect</li>
                        <li>RT/Embedded</li>
                        </ul>
                    <a className="category-more-link" href="">משרות תוכנה<i class="fas fa-arrow-left"></i></a>
                    </div>
            </div>
            <div id="web-category" className="category-container">    
                    <li className="category-title">אינטרנט{getPluseIconSvg()}</li>
                    <div className="category-inner-menu close take-out-from-flow">
                        <ul>
                        <li>מתכנת JavaScript</li>
                        <li>מתכנת Web</li>
                        <li>מתכנת PHP</li>
                        <li>ASP.NET</li>
                        <li>גרפיקאי/מעצב</li>
                        <li>מתכנת HTML</li>
                            <li>קידום אתרים</li>
                        </ul>
                        <a className="category-more-link" href="">משרות אינטרנט<i class="fas fa-arrow-left"></i></a>
                    </div>
            </div>
            <div id="embedded-category" className="category-container">    
                    <li className="category-title">חומרה מולטידיספלינרי{getPluseIconSvg()}</li>
                    <div className="category-inner-menu close take-out-from-flow">
                        <ul>
                        <li>Board Design</li>
                        <li>מהנדס וריפיקציה</li>
                        <li>Backend</li>
                        <li>ASIC/VLSI</li>
                        <li>מפתח אלגוריתמים</li>
                        <li>מהנדס מערכת</li>
                        <li>מהנדס RF</li>
                        </ul>
                        <a className="category-more-link" href="">משרות חומרה<i class="fas fa-arrow-left"></i></a>
                    </div>
            </div>
            <div id="it-category"  className="category-container">    
                    <li className="category-title">תשתיות{getPluseIconSvg()}</li>
                    <div className="category-inner-menu close take-out-from-flow">
                        <ul>
                        <li>System Admin</li>
                        <li>System Manager</li>
                        <li>תמיכה טכנית</li>
                        <li>מומחה אבטחת מידע</li>
                        </ul>
                        <a className="category-more-link" href="">משרות תשתיות<i class="fas fa-arrow-left"></i></a>
                    </div>
            </div>
            <div id="sineor-category" className="category-container">    
                    <li className="category-title">משרות בכירות{getPluseIconSvg()}</li>
                    <div className="category-inner-menu close take-out-from-flow">
                        <ul>
                        <li>תוכנה</li>
                        <li>אינטרנט</li>
                        <li>חומרה</li>
                        <li>שיווק</li>
                        <li>מכירות</li>
                        </ul>
                        <a className="category-more-link" href="">משרות בכירות<i class="fas fa-arrow-left"></i></a>
                    </div>
                </div>
                <div className="more-jobs-link">
                    <a href="">למשרות הייטק נוספות<i class="fas fa-arrow-left"></i></a>
                </div>
            </ul>
        </div>
    )
}