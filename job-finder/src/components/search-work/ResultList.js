import React, { useState, useEffect, useContext } from 'react'
import userContext from '../../contexts/UserContext'
import ListNode from './ResultListNode'
// import { jobsList } from '../../data/jobs'

export default ({NodeComponent,sortObj,setSort, jobsList, resultOffset, setResultOffset,totalResults,markedNodesFunction,titlesList }) => {
    
    const [pageOffset, setPageOffset] = useState(0);
    const [markedList, setMarkedList] = useState([])
    const {user,setUser}=useContext(userContext)
    console.log("🚀 ~ file: ResultList.js ~ line 11 ~ user", user)

    const [previouseButtonClicked,setPreviouseButtonClicked]=useState();
    const handleButtonClassName = (button) => {
          if(previouseButtonClicked)
          previouseButtonClicked.classList.remove('pressed')
          button.classList.add("pressed")
          setPreviouseButtonClicked(button);
    }

    useEffect(() => {
        console.log(resultOffset)
        if (resultOffset === 0)
            setPageOffset(0);
    }, [resultOffset])

    useEffect(() => {
        if(markedNodesFunction)
        {try
        {
            if (user.data) {
                console.log("🚀 ~ file: ResultList.js ~ line 41 ~ useEffect ~ user", user)

                markedNodesFunction(user.data.uid,user.token).then((value) => {
                    setMarkedList(value)

                }
                ).catch((err) => console.log("ree", err))
            }
        }
        catch(err) { console.log("ree", err) }}
    }, [user])

    return (
        <div className="result-list-container">
    
            <div className="result-list-title-row desktop-only">
                {titlesList?titlesList.map((title) => {
                    console.log("🚀 ~ file: ResultList.js ~ line 61 ~ {titlesList.map ~ title", title)

                    if (title.text != null)
                    return  ( <div className={` result-title-item ${title.className||''}`}>{title.text}
                            {        
                                title.sortFunc?
                                     <i onClick={title.sortFunc } className={(sortObj?(sortObj.attribute===title.attributeName?(sortObj.isAscending?'fas fa-sort-up':'fas fa-sort-down'):"fas fa-sort"):'')+" sort-results-icon"}  ></i>:''
                            }
                        </div>)
                    else if (title.sortFunc)
                    return <i onClick={title.sortFunc } className={(sortObj?(sortObj.attribute===title.attributeName?(sortObj.isAscending?'fas fa-sort-up':'fas fa-sort-down'):"fas fa-sort"):'')+" sort-results-icon"}  ></i>
                           }):''}
                {/* <i className="fas fa-sort sort-results-icon"></i>
                <div className={` list-title-name result-title-item`}>שם <i onClick={() => {if(setSort)setSort({ attribute: 'role_name', isAscending: !sortObj.isAscending })  }} className={sortObj?(sortObj.attribute==='role_name'?(sortObj.isAscending?'fas fa-sort-up':'fas fa-sort-down'):"fas fa-sort"):''+" sort-results-icon"}  ></i></div>
                <div className="list-title-code result-title-item">קוד </div>
                        <div className="list-title-location result-title-item">מיקום <i onClick={()=>{if(setSort)setSort({attribute:'location_area',isAscending:!sortObj.isAscending})}}  className={sortObj?(sortObj.attribute==='location_area'?(sortObj.isAscending?'fas fa-sort-up':'fas fa-sort-down'):"fas fa-sort"):''+" sort-results-icon"}></i></div>*/}
            </div>
            {
                jobsList ? (jobsList.slice(pageOffset, pageOffset + 20).map((job, index) => (<NodeComponent defaultChecked={markedList?markedList.includes(job.id):''} className={index % 2 === 0 ? "gray-bg" : "white-bg"} {...job} index={pageOffset  + index+1} />))) : ""
                
            }
            <div className="list-navigator-container">
                {resultOffset >= 80 ? <button className="previous-button none-focus" onClick={(e) => {
                    setResultOffset(resultOffset - 80)
                    handleButtonClassName(e.target)
                }}>Prev 80</button> : ""}
                <div className="pages-buttons-container">
                {jobsList ?
                    jobsList.map((el, index) => index % 20 === 0 ?
                        <button  onClick={(e) => {
                            setPageOffset(index);
                            handleButtonClassName(e.target)
                        }}>
                           
                            {jobsList.length >= (index + 20) ?
                                (resultOffset||0  + 20+index) : jobsList.length}
                                ...
                                {(  index + 1)}</button>
                        : "")
                        : ""}
                        </div>
                {totalResults >= resultOffset + 80 ? <button className="next-button none-focus" onClick={(e) => {
                    
                    setResultOffset(resultOffset + 80)
                    handleButtonClassName(e.target)
                }}>Next 80</button> : ""}

            </div>
        </div>
    )
}