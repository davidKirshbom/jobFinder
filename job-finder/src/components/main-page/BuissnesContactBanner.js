import React, { useEffect } from 'react'
export default () => {
    let faddingImagesInterval;
useEffect(() => {
    startFaddingImages();
    const openFormButton = document.getElementsByClassName("open-contact")[0];
    const exitFormButton = document.getElementsByClassName("exit-button")[0];
    const form = document.getElementsByClassName("form-container")[0];
    openFormButton.addEventListener("click", () => {
     
        form.classList.remove("close");
    })
    exitFormButton.addEventListener("click",() => {
        form.classList.add("close");
    })
    return function cleanUpFaddingInterval(){
       clearInterval (faddingImagesInterval)
    }
}, [])
   
    const startFaddingImages = () => {
        const images=document.getElementsByClassName("recommendation")
        let currentImageIndex = 0;
        faddingImagesInterval= setInterval(() => {
                const nextImageIndex = (currentImageIndex + 1) % images.length
                images[nextImageIndex].classList.replace('hide', 'hide');
                images[currentImageIndex].classList.replace('hide', 'show');
            currentImageIndex=nextImageIndex;
        },10000)
}

    return (
    <div className="banner-container">
        <div className="fadding-content">
            <img className="recommendation show" src={require('../../images/buisness-banner/rec-hr-1.jpg')} alt="" />
            <img className="recommendation hide" src={require('../../images/buisness-banner/rec-hr-2.jpg')} alt="" />
            <img className="recommendation hide" src={require('../../images/buisness-banner/rec-hr-3.jpg')} alt="" />
            <img className="recommendation hide" src={require('../../images/buisness-banner/rec-recrument.jpg')} alt="" />
            </div>
            <button className="open-contact"><i class="far fa-paper-plane"></i>צור קשר</button>
            <div className="form-container close">
                <div className="exit-button">
                <div className="exit-line-1"></div>
                <div className="exit-line-2"></div>
                </div>
                <div className="contact-hader">
                    <h2 className="title">מעסיקים?</h2>
                    <span className="subtitle">הירשמו והצטרפו לנבחרת של ג'ובאינפו</span>
                </div>
                <form action="" className="buisness-contact-form">
                    <input type="text" placeholder="שם החברה:"/>
                    <input className="" placeholder="טלפון:"></input>
                    <input className="" placeholder='דוא"ל:'></input>
                    <button>שלח<i class="far fa-paper-plane"></i></button>
                </form>
            </div>
        </div>)
}