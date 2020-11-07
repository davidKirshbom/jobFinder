import React, { useState,useEffect } from 'react'
import ListNode from './ResultListNode'
// import { jobsList } from '../../data/jobs'

export default ({NodeComponent,sortObj,setSort, jobsList, resultOffset, setResultOffset,totalResults }) => {
    const [pageOffset, setPageOffset] = useState(0);
    console.log(totalResults)
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
    return (
        <div className="result-list-container">
    
            <div className="result-list-title-row desktop-only">
                <i class="fas fa-sort sort-results-icon"></i>
                <div className={` list-title-name result-title-item`}>שם <i onClick={() => { setSort({ attribute: 'role_name', isAscending: !sortObj.isAscending }) }} className={(sortObj.attribute==='role_name'?(sortObj.isAscending?'fas fa-sort-up':'fas fa-sort-down'):"fas fa-sort")+" sort-results-icon"}  ></i></div>
                <div className="list-title-code result-title-item">קוד </div>
                <div className="list-title-location result-title-item">מיקום <i onClick={()=>setSort({attribute:'location_area',isAscending:!sortObj.isAscending})}  className={(sortObj.attribute==='location_area'?(sortObj.isAscending?'fas fa-sort-up':'fas fa-sort-down'):"fas fa-sort")+" sort-results-icon"}></i></div>
            </div>
          
            {
              jobsList? (jobsList.slice(pageOffset,pageOffset+20).filter((job)=>!job.end_date).map((job,index)=>(<NodeComponent  className={index%2===0?"gray-bg":"white-bg"} {...job} index={resultOffset+ pageOffset+ index}/>))):""
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
                            {`${jobsList.length >= (index + 20) ?
                                (resultOffset + index + 20) : jobsList.length}
                                ...
                                ${resultOffset + index + 1}`}</button>
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