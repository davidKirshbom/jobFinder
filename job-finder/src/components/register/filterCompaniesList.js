import React, { useEffect,useState } from 'react'
import axios from 'axios'
export default ({className="",onChange}) => {
    const [sendCompanies, setSendCompanies] = useState([]);
    const [notSendCompanies, setNotSendCompanies] = useState([]);
    const [selectedIndexSendList, setSelectedIndexSendList] = useState();
    const [selectedIndexNotSendList, setSelectedIndexNotSendList] = useState();
    const [isCompaniesListFilterOpen,setIsCompaniesListFilterOpen]=useState(false)
    

    useEffect(() => {
        try {
            axios.get('http://localhost:3000/utils/get-all-companies').then((value) => {
                console.log(value.data)
                const allCompanies=value.data.map((company) =>  company.name)
                setSendCompanies(allCompanies.concat([5,5]))
            }).catch((err)=>console.log(err))
        } catch (err) {
            console.log(err)
        }
    },[])
    useEffect(() => { sendCompanies.sort();notSendCompanies.sort()},[sendCompanies,notSendCompanies])
    useEffect(() => {
        onChange(sendCompanies)
    },[notSendCompanies])
    return (
        <div className="select-not-send-companies desktop-only">
            <div

                onClick={()=>setIsCompaniesListFilterOpen(!isCompaniesListFilterOpen)}
                className="toggle-line">
                <span>אנו מאפשרים לכם לבחור חברות אליהן <strong>אינכם</strong> מעוניינים שישלחו קורות החיים שלכם. </span><i className="fas fa-chevron-down"></i>
            </div>
        <div className={`lists-container ${isCompaniesListFilterOpen?"":'hide'}`}>
                <div className="all-companies-container">
                   <span className="list-title">רשימת החברות  :</span> 
        <ul className="company-filter-list" name="all-companies" id="all-companies-list">
                {sendCompanies.map((companie, index) => {
                    return <li
                        className={className + (selectedIndexSendList === index ? ' selected' : '')}
                        onClick={(e) => setSelectedIndexSendList(index)}
                        value={companie}>{companie}</li>
                })}
        </ul>
    </div>
    <div className="lists-control-button-container">
            <button
                className="list-control-button"
                onClick={(e) => {
                    e.preventDefault();
                   
                   
                    setNotSendCompanies((notSendCompanies)=>[...notSendCompanies, sendCompanies[selectedIndexSendList]])
                    setSendCompanies(sendCompanies.filter((company, index) => index !== selectedIndexSendList))
                    setSelectedIndexSendList(null)
                }
                }
            >הוסף<i className="fas fa-angle-double-left"></i></button>
            <button className="list-control-button"
                onClick={(e)=>
                {
                    e.preventDefault();
                    setSendCompanies((sendCompanies)=>[...sendCompanies, notSendCompanies[selectedIndexNotSendList]])
                    setNotSendCompanies(notSendCompanies.filter((company, index) => index !== selectedIndexNotSendList))
                    setSelectedIndexNotSendList(null)
                }
                    }
            ><i className="fas fa-angle-double-right"></i>הסר</button>
    </div>
                <div className="all-companies-container">
                    <span className="list-title">נא <strong>לא</strong> לשלוח לחברות הבאות: </span>
    <ul className="company-filter-list" name="all-companies" id="all-companies-list">
                {notSendCompanies.map((companie,index) => {
                    return <li
                        className={className + (selectedIndexNotSendList === index ? ' selected' : '')}
                        value={companie}
                        onClick={(e) => setSelectedIndexNotSendList(index)}>{companie}</li>
                })}
                    </ul>
                    </div>
</div>
</div>    )
}