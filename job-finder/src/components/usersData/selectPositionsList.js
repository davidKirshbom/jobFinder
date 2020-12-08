import React, { useEffect,useState } from 'react'

import { getAllPositions } from '../../server/utilsDB';
import { getJobPositions } from '../../server/jobsDB';
export default ({className="",onChange,jobId}) => {
    const [positionsList, setPositionsList] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [selectedIndexPositionList, setSelectedIndexPositionList] = useState();
    const [selectedIndexSelectedPositionsList, setSelectedIndexSelectedPositionsList] = useState();
    useEffect(
        ()=>{
      return ( async () => {
        try {
            const positions = await getAllPositions();
         
            if(jobId)
            {
                const selectedPositionsData = (await getJobPositions(jobId))
                setSelectedPositions(selectedPositionsData)
            }
            setPositionsList(positions)
        } catch (err) {
            console.log(err)
        }})()
    },[])
    useEffect(() => { positionsList.sort();selectedPositions.sort()},[positionsList,selectedPositions])
    useEffect(() => {
       
        onChange(selectedPositions)
    },[selectedPositions])
    return (
        <div className="select-Positions">
        <div className={`lists-container `}>
                <div className="all-positions-container">
                   <span className="list-title">תפקידים</span> 
        <ul className="positions-list" name="positions-list" id="all-positions-list">
                {positionsList.map((position, index) => {
                    return <li
                        className={className + (selectedIndexPositionList === index ? ' selected' : '')}
                        onClick={(e) => setSelectedIndexPositionList(index)}
                        value={position}>{position.name}</li>
                })}
        </ul>
    </div>
    <div className="lists-control-button-container">
            <button
                className="list-control-button"
                onClick={(e) => {
                    e.preventDefault();
                    setSelectedPositions((noSelectedPositions)=>[...noSelectedPositions, positionsList[selectedIndexPositionList]])
                    setPositionsList(positionsList.filter((company, index) => index !== selectedIndexPositionList))
                    setSelectedIndexPositionList(null)
                    onChange(selectedPositions)
                }
                }
            >הוסף<i className="fas fa-angle-double-left"></i></button>
            <button className="list-control-button"
                onClick={(e)=>
                {
                    e.preventDefault();
                    setPositionsList((positionsList)=>[...positionsList, selectedPositions[selectedIndexSelectedPositionsList]])
                    setSelectedPositions(selectedPositions.filter((company, index) => index !== selectedIndexSelectedPositionsList))
                    setSelectedIndexSelectedPositionsList(null)
                    
                }
                    }
            ><i className="fas fa-angle-double-right"></i>הסר</button>
    </div>
                <div className="all-positions-container">
                    <span className="list-title">תפקידים נבחרו</span>
    <ul className="selected-positions" name="selected-positions" id="selected-positions-list">
                        {selectedPositions.map((position, index) => {
                    
                    return <li
                        className={className + (selectedIndexSelectedPositionsList === index ? ' selected' : '')}
                        value={position}
                        onClick={(e) => setSelectedIndexSelectedPositionsList(index)}>{position.name}</li>
                })}
                    </ul>
                    </div>
</div>
</div>    )
}