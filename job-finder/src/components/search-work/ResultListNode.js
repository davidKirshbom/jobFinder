import React,{useEffect,useState} from 'react'
import OrangeCheckBox from '../global/OrangeCheckBox'

export default ({additional_positions, name,role_name, id, location_area, className, index, type, experience_years,
                qualifications,company_occupation,description,category}) => {
    const [isExtraInfoOpen,setIsExtraInfoOpen]=useState(false)
    // useEffect(() => {
    //     const exitExtraDetails = document.getElementsByClassName("close-extra-data")[0];
    //     const extraDataContainer = document.getElementsByClassName("extra-data-container")[0];
    //     exitExtraDetails.addEventListener("click", )
    //     const summaryLine = document.getElementsByClassName("summary-container")[0];
    //     summaryLine.addEventListener("click",)
    // },[])
    
    const createList = (title, attribute) => {
        if(Array.isArray(attribute))
        if (attribute.length>0)
            return (<ul>
        <h3>{title}</h3>
        {attribute.map((data) => <li>{data}</li>)}
        </ul>)
        else
            return ;
    }
    const createParagraph = (title, attribute,isEmphasis) => {
        if (attribute)
            return (<p className={isEmphasis?"emphsis":""}>
        <h3>{title}</h3>
        {attribute}
        </p>)
        else
            return ;
    }
    return (
        <div className={`list-node-container ${className||""}` } onClick={()=>setIsExtraInfoOpen(true)}>
            <div  className={`summary-container ${isExtraInfoOpen?"yellow-select":""}`} >
         
                <OrangeCheckBox id={"checkbox-id-"+id} />
                <div className="data-container">
                    {index!==null?<span className="index-node">{`${index+1}.`}</span>:""}
                    <span className="data-title">שם</span>
                    <span className="name-data search-data">{role_name || "not supplied"}</span>
                </div>
                <div className="data-container">
                    <span className="data-title">קוד</span>
                    <span className="id-data search-data">{id || "not supplied"}</span>
                </div>
                <div className="data-container">
                    <span className="data-title">מיקום</span>
                    <span className="location_area-data search-data">{location_area || "not supplied"}</span>
                </div>
                </div>
                <div className={`extra-data-container ${isExtraInfoOpen?"open":""} `}>
                    <span className="job-title"><span className=" mobile-only">{name}</span><i onClick={(e) => { setIsExtraInfoOpen(false);e.stopPropagation()}} class="fas fa-times close-extra-data"></i></span>
                    <div className="wigets-container">
                        <div className="data-widget">
                            <div className="data-widget-content">
                            <div className="icon-container"><i class={`far fa-clock ${type[0]}-fill`}></i></div>
                                <div className="data-widget-text">
                                    {type}
                                </div>
                            </div>
                        </div>
                        <div className="data-widget">
                            <div className="data-widget-content">
                            <div className="icon-container">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"  space="preserve">
<g>
<g>
<path d="M488.727,279.273c-6.982,0-11.636,4.655-11.636,11.636v151.273c0,6.982-4.655,11.636-11.636,11.636H46.545    c-6.982,0-11.636-4.655-11.636-11.636V290.909c0-6.982-4.655-11.636-11.636-11.636s-11.636,4.655-11.636,11.636v151.273    c0,19.782,15.127,34.909,34.909,34.909h418.909c19.782,0,34.909-15.127,34.909-34.909V290.909    C500.364,283.927,495.709,279.273,488.727,279.273z"/>
</g>
</g>
<g>
<g>
<path d="M477.091,116.364H34.909C15.127,116.364,0,131.491,0,151.273v74.473C0,242.036,11.636,256,26.764,259.491l182.691,40.727    v37.236c0,6.982,4.655,11.636,11.636,11.636h69.818c6.982,0,11.636-4.655,11.636-11.636v-37.236l182.691-40.727    C500.364,256,512,242.036,512,225.745v-74.473C512,131.491,496.873,116.364,477.091,116.364z M279.273,325.818h-46.545v-46.545    h46.545V325.818z M488.727,225.745c0,5.818-3.491,10.473-9.309,11.636l-176.873,39.564v-9.309c0-6.982-4.655-11.636-11.636-11.636    h-69.818c-6.982,0-11.636,4.655-11.636,11.636v9.309L32.582,237.382c-5.818-1.164-9.309-5.818-9.309-11.636v-74.473    c0-6.982,4.655-11.636,11.636-11.636h442.182c6.982,0,11.636,4.655,11.636,11.636V225.745z"/>
</g>
</g>
<g>
<g>
<path d="M314.182,34.909H197.818c-19.782,0-34.909,15.127-34.909,34.909v11.636c0,6.982,4.655,11.636,11.636,11.636    s11.636-4.655,11.636-11.636V69.818c0-6.982,4.655-11.636,11.636-11.636h116.364c6.982,0,11.636,4.655,11.636,11.636v11.636    c0,6.982,4.655,11.636,11.636,11.636c6.982,0,11.636-4.655,11.636-11.636V69.818C349.091,50.036,333.964,34.909,314.182,34.909z"/>
</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
                            </div>
                                <div className="data-widget-text">
                   
                                    {`${experience_years}+ year${experience_years > 1 ? "s" : ""}`}</div>
                            </div>
                        </div>
                        <div className="data-widget">
                            <div className="data-widget-content">
                               <div className="icon-container"> <i class="far fa-compass"></i></div>
                                <div className="data-widget-text">{location_area}</div>
                            </div>
                        </div>
                    </div>
                    <div className="job-info-container">
                        <div className="info-column">
                            {createParagraph("Job Qualifications:", qualifications)}
                            {createParagraph("Company Occupation:", company_occupation)}
                        </div>
                        <div className="info-column">
                  
                        {createParagraph("Job Description:", description)}
                        {createParagraph("Additional Positions:", additional_positions,true)}
                        {createParagraph("Category:", category, true)}
                        </div>
                        
                    </div>
                    <a className="send-CV big-orange-butoon"><i class="fab fa-studiovinari "></i> שלח קו"ח </a>
                    <div className="share-icons-container">
                        <div className="share-icon"><i class="fab fa-whatsapp"></i><span className="share-icon-text">שתף</span></div>
                        <div className="share-icon"><i class="fab fa-facebook-f"></i><span className="share-icon-text">שתף</span></div>
                        <div className="share-icon"><i class="far fa-eye"></i><span className="share-icon-text">משרות דומות</span></div>
                        <div className="share-icon"><i class="fas fa-share"></i><span className="share-icon-text">שלח לחבר</span></div>
                    </div>
                </div>
         
            <i aria-hidden="true" class="fas fa-angle-left"></i>
    </div>)
// }

// qualifications.general.length>0 ? <p><h3>Job qualifications:</h3>
//                             {qualifications.general}</p> : ""
    //
}