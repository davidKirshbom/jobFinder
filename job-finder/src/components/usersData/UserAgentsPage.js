import React, { useEffect, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import history from '../../router/history'

import OrangeCheckBox from '../global/OrangeCheckBox';
import userContext from '../../contexts/UserContext'
import { getAllAreas, getAllCategories, getAllJobsByCategory, getPositionsType } from '../../server/utilsDB';
import { getAgent, newAgent,editAgent } from '../../server/agentsDB';
export default () => {
    const [categoriesList, setCategoriesList] = useState( [] );
    const [selectedCategories,setSelectedCategories]=useState([])
    const [positionsList, setPositionsList] = useState([]);
    const [selectedPositionsList, setSelectedPositionsList] = useState([]);
    const [checkedBoxesList, setCheckedBoxes] = useState([]);
    const [areasLocation, setAreasLocation] = useState([]);
    const [selectedAreasLocation, setSelectedAreasLocation] = useState([]);
    const [positionsTypeList, setPositionsTypesList] = useState({ list: [], selected: [] })
    const [searchWord, setSearchWord] = useState('')
    const [agentId, setAgentId] = useState();//for update use
    const [jobType, setJobType] = useState('all types')
    const queryParams = new URLSearchParams(useLocation().search);
    const { user } = useContext(userContext)
    const updateCategoriesListFromDB =async () => {
    
            try {
            const categoriesListDB=await getAllCategories()
                        setCategoriesList(categoriesListDB)
                    
            }
            catch (err) {
                console.log(err)
            }
        }
    

    
    const updateAreasLocationListFromDB =async () => {
        try {
            const areasList =await getAllAreas();
                    setAreasLocation(areasList.map((location)=>location.location_area))
        }
    catch (err) {
        console.log(err)
    }
        }
      
    const updatePositionsTypeListFromDB =async () => {
        try {
            let positionsType=await getPositionsType()
            console.log("🚀 ~ file: UserAgentsPage.js ~ line 49 ~ updatePositionsTypeListFromDB ~ positionsType", positionsType)
            
            positionsType = [{ type: 'all types' }, ...positionsType]
            console.log("🚀 ~ file: UserAgentsPage.js ~ line 52 ~ updatePositionsTypeListFromDB ~ positionsType", positionsType)
                    
                    setPositionsTypesList({list:positionsType.map((type)=>type.type),selected:[]})
    }
    catch (err) {
        console.log(err)
    }
    }
    const handleEditAgent =async (agentId, userId, userEmail) => {
        const agent=(await getAgent(user,agentId))
            
            document.getElementById('agent-name-input').value = agent.name
            document.getElementById('agent-frequency').value = agent.frequency_weeks
            setSelectedCategories(agent.categories)
            setSelectedPositionsList(agent.positions)
            setSelectedAreasLocation(agent.location_area.split(','))
            setJobType(agent.job_type)
            setSearchWord(agent.search_words.join(','))
            setAgentId(agent.agent_id)
        
    }
    const update = () => {
        updateCategoriesListFromDB();
            updateAreasLocationListFromDB();
            updatePositionsTypeListFromDB();
            if (queryParams.has('agent_id')) {
                console.log("🚀 ~ file: userAgentsPage.js ~ line 109 ~ categoriesList", categoriesList)

            
                    handleEditAgent(queryParams.get('agent_id'), user.data.uid)
               
            }
        
        
    }
    
useEffect(() => {
    update()
}, [])
    useEffect(() => {
      
        if (selectedCategories.length > 0) {
            try {
                getAllJobsByCategory(selectedCategories.map(category => category.id)).then((jobsByCategory) =>
                {
                    setPositionsList([...jobsByCategory])

                })                
            } catch (err) {
                console.log(err)
            }
        }
        else
            setPositionsList([])

    }, [checkedBoxesList,selectedCategories])
    
    const attributeTag = (text,closeFunc) => {
        return (
            <div className='tag-container'>
                <i onClick={closeFunc} class="tag-exit-button fas fa-times"></i>
                <span className='tag-text'>{text}</span>
            </div>
        )
    }
    const handleSendForm =async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form[0].value;
        const frequency = form[1].value;
        const jobType = document.getElementById('job-type-select').value;
        if (!agentId) {
            const result = await newAgent(user,
                {
                    name, agentId, frequency, jobType,
                    categories: selectedCategories.length > 0 ? selectedCategories.map((category) => category.id) : categoriesList.map(category => category.id),
                    positions: selectedPositionsList.length > 0 ? selectedPositionsList.map((position) => position.id) : positionsList.map((position) => position.id),
                    location: selectedAreasLocation.length > 0 ? selectedAreasLocation : areasLocation,
                    searchWord: searchWord.split('\n').map((word) => `"${word}"`)

                })
        }
        else {
            const result = await editAgent(user,
                {
                    name, agentId, frequency, jobType,
                    categories: selectedCategories.length > 0 ? selectedCategories.map((category) => category.id) : categoriesList.map(category => category.id),
                    positions: selectedPositionsList.length > 0 ? selectedPositionsList.map((position) => position.id) : positionsList.map((position) => position.id),
                    location: selectedAreasLocation.length > 0 ? selectedAreasLocation : areasLocation,
                    searchWord: searchWord.split('\n').map((word) => `"${word}"`)

                })
        }      
    }
    return (<div className=''>
        <div className='data-page-text'>
        <h1>הסוכנים שלי</h1>
        <p >
        הגדירו תפקידים בהם אתם מעוניינים ותדירות קבלת עדכונים.<br/>
הסוכן החכם יאתר משרות עבורכם וישלח מייל עם כל הצעות העבודה המתאימות.
        </p>
        </div>
        <form id='create-agent-form' onSubmit={handleSendForm} >
            <div className="input-container">
                <label htmlFor="agent-name">שם הסוכן<span className='orange-mark font-emphasis'>*</span></label>
                <input id='agent-name-input' className='border-bottom-input-style' type="text"/>
            </div>
            <div className="input-container">
                <label htmlFor="agent-frequency">תדירות הפעלת הסוכן</label>
                <span className='custom-select'>
                <select id='agent-frequency' className='job-type border-bottom-input-style'>
                    <option value='1'>פעם בשבוע</option>
                    <option value='2'>פעם בשבועיים</option>
                    <option value='3' >פעם בשלושה שבועות</option>
                    </select>
                    <i class="custom-input-arrow fas fa-chevron-down"></i>
                    </span>
                <strong className='small-letters'>הסוכן יסרוק עבורך את מאגר המשרות בימי יום שלישי </strong>
            </div>
            <div className='input-container'>
                <label className='input-text'><span className='orange-mark font-emphasis'>*</span>תחום משרה<span className='orange-mark '>(שדה חובה)</span></label>
                <div className='checkboxes-container'>
                    {categoriesList.map((category, index) =>
                        <OrangeCheckBox value={category.id} id={category.id} text={category.name}
                        onChange={(isChecked) => {
                            if (isChecked) {
                                setCheckedBoxes([...checkedBoxesList, category.id])
                                setSelectedCategories( [...selectedCategories, category])
                                
                            }
                            else {
                                const newCheckBoxes = checkedBoxesList.filter
                                    (checkBox => {
                                    return checkBox !== category.id
                                })
                                setCheckedBoxes(newCheckBoxes)
                               
                                const categoriesSelected = selectedCategories
                                    .filter(selectedPosition => {
                                    console.log('selectedPosition.id === category.id', selectedPosition.id, selectedPosition.id === category.id, category.id)
                                    return selectedPosition.id !== category.id
                                })
                                setSelectedCategories( categoriesSelected)
                            
                            }
                        }
                        }
                            checked={
                                selectedCategories.some(selectedCategory => {
                       return selectedCategory.id === category.id})
                        }
                        />)}
                </div>
            </div>
            <div className='input-container'>
            <label className='input-text'>תפקיד</label>
                <div  className={`checkboxes-container ${positionsList.length === 0?'read-only':''}`}>
                    {positionsList.length > 0 ?
                        positionsList.map((position, index) =>
                            <OrangeCheckBox
                                value={position.id}
                                id={'position id-' + position.id}
                                text={position.name}
                                onChange={(isChecked) => {
                                    if (isChecked)
                                        setSelectedPositionsList([...selectedPositionsList, position])
                                    else
                                        setSelectedPositionsList(selectedPositionsList.filter(selectedPosition => selectedPosition.id !== position.id))
                                }}

                            checked={ selectedPositionsList.some(selectedPosition=>selectedPosition.id===position.id)}
                            />)
                        : <OrangeCheckBox className='read-only' value='-1' id={'position id--1'} checked={true} text='כל התפקידים' />}
                        
                        </div>
            </div>
            <div className={`input-container ${positionsList.length === 0?'read-only':''}`}>
            <label className='input-text'>מיקום</label>
                <div className="checkboxes-container">
                    {positionsList.length > 0 ?
                        areasLocation.map((area, index) =>
                        <OrangeCheckBox
                            value={area}
                            id={'area-checkbox-' + area}
                            text={area}
                            onChange={(isChecked) => {
                                if (isChecked)
                                setSelectedAreasLocation([...selectedAreasLocation, area] )
                                else
                                    setSelectedAreasLocation(selectedAreasLocation.filter(selectedArea=>selectedArea!==area))
                                }}
                                checked={selectedAreasLocation.includes(area)}
                        >    
                            </OrangeCheckBox>
                        
                        ) :
                        <OrangeCheckBox className='read-only' value='-1' id={'area id--1'} checked={true} text='כל האזורים' />

                    }
                </div>
            </div>
            <div>
            <div className="input-container ">
            <label className='input-text'>היקף משרה</label>
               <span className="custom-select ">
                    <select
                        id='job-type-select'
                        className='border-bottom-input-style'
                            onChange={(e) => { setJobType(e.target.value) }}
                            value={jobType}
                        >
                    {positionsTypeList.list.map(type => <option value={type}>{type}</option>)}
                    </select>
                    <i class="custom-input-arrow fas fa-chevron-down"></i>

                    </span>
            </div>
            <label className='input-text'>מילות מפתח</label>
            <div className="input-container">
            <textarea value={searchWord}  onChange={(e)=>setSearchWord(e.target.value)} name="searcWords" id="free-word-search" className='border-bottom-input-style' ></textarea>
                </div>
                </div>
            <label className='input-text'>ביקשתי למצוא</label>
        <div className="form-data-container">
            <div className="selected-inputs-container">
                <div  className='selected-title'>תחום המשרה ({selectedCategories.length})</div>
                    {selectedCategories.map(categorySelected => attributeTag(categorySelected.name, (e) => { setSelectedCategories(selectedCategories.filter((category) => categorySelected !== category)) }))}
            </div>
            <div className="selected-inputs-container">
            <div className='selected-title'>תפקיד({selectedPositionsList.length})</div>
            {selectedPositionsList.map(positionSelected=>attributeTag(positionSelected.name,(e) => {setSelectedPositionsList(selectedPositionsList.filter((position) => positionSelected!==position))}))}
            </div>
            <div className="selected-inputs-container">
            <div className='selected-title'>מיקום({selectedAreasLocation.length})</div>
                   <div className='tags-container'>
                    {selectedAreasLocation.map(areaSelected => attributeTag(areaSelected, (e) => { setSelectedAreasLocation(selectedAreasLocation.filter((area) => areaSelected !== area)) }))}
                    </div>
            </div>
            <div className="selected-inputs-container">
            <div className='selected-title'>סוג משרה</div>
            {attributeTag(jobType)}
        </div>
        </div>
        <input className='orange-button agent-page-button' type='submit' onSubmit={handleSendForm}   value={`${queryParams.has('agent_id')?'עדכן סוכן':'צור סוכן'}`}></input>
        <button className='gray-button agent-page-button'>ביטול</button>
        </form>
    </div>
    )
                    
                    }