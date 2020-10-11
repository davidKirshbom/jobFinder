import React from 'react'


class RollingBrands extends React.Component {

    constructor(props) {
        super(props)
      
      
    }
    componentDidMount() {
        
        this.startInterval();
     
    }
    startInterval() {
       const rollInterval= setInterval(() => {
            const rollingToEnd = document.getElementsByClassName("roll-until-end")[0];
            if (rollingToEnd)
            {
                this.removeAllEventListner(rollingToEnd)
                rollingToEnd.addEventListener("animationend", this.handlaeSwitchClasses)
                
            }
            const rollingAfterEnd = document.getElementsByClassName("roll-after-end")[0];
            if (rollingAfterEnd)
            {
                this.removeAllEventListner(rollingAfterEnd)               
                rollingAfterEnd.addEventListener("animationend", this.handlaeAnimationEnd)
            }
        },2000)
    }
    removeAllEventListner(element) {
        element.removeEventListener("animationend", this.handlaeSwitchClasses)
        element.removeEventListener("animationend", this.handlaeAnimationEnd)
    }
    handlaeSwitchClasses(e) {
        const rollingToEnd = e.target;
        let otherText;
       otherText=document.getElementsByClassName("wait")[0]
        rollingToEnd.classList.replace("roll-until-end","roll-after-end")
        otherText.classList.replace("wait","roll-until-end")
        rollingToEnd.removeEventListener("animationend",this.handlaeSwitchClasses)
       
    }
    handlaeAnimationEnd(e) {
        const container=document.getElementsByClassName("rolling-container")[0]
       const rollingAfterEnd=e.target
       
       rollingAfterEnd.remove()
       rollingAfterEnd.classList.replace("roll-after-end","wait")
            container.appendChild(rollingAfterEnd)
            rollingAfterEnd.removeEventListener("animationend",this.animationEnd)    
        
        
    }
    render() {
        return (
        
        <div className="rolling-container">
            <div id="first" className="rolling-group roll-until-end">
                <img src={require("../images/brands_1.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_2.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_3.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_4.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_5.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_6.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_7.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_8.png")} alt="" className="brand-logo"/>
                </div>
            <div id="second" className="rolling-group wait">
            <img src={require("../images/brands_1.png")} alt="" className="brand-logo"/>
            <img src={require("../images/brands_2.png")} alt="" className="brand-logo"/>
            <img src={require("../images/brands_3.png")} alt="" className="brand-logo"/>
            <img src={require("../images/brands_4.png")} alt="" className="brand-logo"/>
            <img src={require("../images/brands_5.png")} alt="" className="brand-logo"/>
            <img src={require("../images/brands_6.png")} alt="" className="brand-logo"/>
            <img src={require("../images/brands_7.png")} alt="" className="brand-logo"/>
            <img src={require("../images/brands_8.png")} alt="" className="brand-logo"/>
                </div>
                <div id="three" className="rolling-group wait">
                <img src="job-finder\src\images\brands_1.png" alt="brands-work-with-us" className="brand-logo"/>
                <img src={require("../images/brands_1.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_2.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_3.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_4.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_5.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_6.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_7.png")} alt="" className="brand-logo"/>
                <img src={require("../images/brands_8.png")} alt="" className="brand-logo"/>
            </div>
        </div>
    
    )}
    
}
export default RollingBrands;