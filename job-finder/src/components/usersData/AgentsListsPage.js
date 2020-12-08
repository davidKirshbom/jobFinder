
import React, { useState, useEffect, useContext } from 'react'
import history from '../../router/history'
import {Link} from 'react-router-dom'
import userContext from '../../contexts/UserContext'
import ResultList from '../search-work/ResultList'
import ResultListNode from '../search-work/ResultListNode'

import { deleteAgent, forceAgentScan, getAgentLastScan, getUserAgents } from '../../server/agentsDB';
export default () => {
    const [agentList, setAgentList] = useState([]);
    const [agentSelectedIndex, setAgentSelectedIndex] = useState(0);
    const [lastScannedJobs, setLastScannedJobs] = useState([]);
    const [listOffset,setListOffset]=useState(0)
    const { user,setUser } = useContext(userContext);
    const updateAgentsList = async () => {
        try{
        const agents=(await getUserAgents(user))
        agents.length === 0 ?
            history.push('/agent-page'):
                setAgentList([...agents])
    }catch (err)
    {
        console.log('err', err.response)
            if (err.response.status === 505)
            {
                history.push('/')
                setUser({data:null})
            }
            
        }
        
    }
    useEffect(() => {
        updateAgentsList();
    }, [])
    
    const handleDelete = async () => {
        try {
            await deleteAgent(agentList[agentSelectedIndex].id,user)
            }
        catch (err) {
            console.log(err)
        }
    }
    async function updateLastScannedJobs(agent) {
       const jobs= await getAgentLastScan(agent.id,user)
            setLastScannedJobs(jobs)
        }
    
    useEffect(() => {
        if (agentList[agentSelectedIndex])
        updateLastScannedJobs(agentList[agentSelectedIndex])
    }, [agentSelectedIndex])
    const startScan =async (agent) => {
        if (agent)
            await forceAgentScan(agent,user)
         
        
    }
    let currentAgent
    if(agentList.length>0)
        currentAgent = agentList[agentSelectedIndex]
    console.log(agentList[0])
    return (
    <div>
            <h2>הסוכנים שלי</h2>
            <p>
            הגדירו תפקידים בהם אתם מעוניינים ותדירות קבלת עדכונים.<br/>
הסוכן החכם יאתר משרות עבורכם וישלח מייל עם כל הצעות העבודה המתאימות.
            </p>
            <div className='tools-bar'>
                <div className='tabs-container'>
                {agentList.map((agent,index) => <span onClick={(e)=>setAgentSelectedIndex(index)} className={`tab ${agentSelectedIndex===index?'selected':''}`}>{agent.name}({agent.last_scan_found_count||0})</span>)}
                </div>
                <Link className='new-agent-button' to='/agent-page'><i class="fas fa-plus"></i>סוכן חדש</Link>
            </div>
            <div className='agent-data-container'>
            <div className='data-row-container-desktop'>
                <div className='agent-data'>הסוכן {currentAgent?currentAgent.name:''} מצא עבורך<strong> {currentAgent?currentAgent.last_scan_found_count||0:''} משרות</strong></div>
                <div className='data-left-side'>
                <div className='agent-data'> תאריך חיפוש אחרון: {currentAgent &&currentAgent.last_scan_date? currentAgent.last_scan_date.slice(0, currentAgent.last_scan_date.indexOf('T')) : ''}</div>
                <div className='agent-data'>תדירות הפעלת הסוכן: {currentAgent?(currentAgent.frequency_weeks==='1'?'פעם בשבוע':currentAgent.frequency_weeks==='2'?'פעם בשבועיים':'פעם בשלושה שבועות'):'' }</div>
                    </div>
                </div>
                <div className='data-row-container-desktop'>
                   <div>
                    <div className='agent-detail-container'>
                    <label className='orange-small-title'>תחום המשרה</label>
                    <div className='data-text'>{currentAgent? currentAgent.categories.map(category=>category.name).join(','):''}</div>
                </div>
                <div className='agent-detail-container'>
                    <label className='orange-small-title'>תפקיד</label>
                    <div className='data-text'>{currentAgent? currentAgent.positions.map(position=>position.name).join(','):''}</div>
                </div>
                <div className='agent-detail-container'>
                    <label className='orange-small-title'>מילות מפתח</label>
                    <div className='data-text'>{currentAgent? currentAgent.search_words:''}</div>
                        </div>
                        </div>
                    <div className='data-left-side no-border'>
                <div className='agent-detail-container'>
                    <label className='orange-small-title'>היקף משרה </label>
                    <div className='data-text'>{currentAgent? currentAgent.job_type:''}</div>
                </div>
                <div>
                <label className='orange-small-title'>מיקום </label>
                <div className='data-text'>{currentAgent? currentAgent.location_area:''}</div>
                        </div>
                        </div>
                </div>
                <div className='buttons-container'>
                    <Link to={{
                        pathname:'/agent-page',
                        search:`?agent_id=${currentAgent?currentAgent.id:''}`
                    }} ><i class="fas fa-pencil-alt"></i>ערוך סוכן</Link>
                    <Link onClick={handleDelete} to='/user-agent'><i class="fas fa-trash"></i> מחק סוכן</Link>
                    </div>
                <button className='orange-button new-scan-button' onClick={(e) =>
                {
                    const tempSelectedIndex=agentSelectedIndex
                    startScan(agentList[agentSelectedIndex]);
                    updateAgentsList();
                    updateLastScannedJobs(agentList[agentSelectedIndex]);
                }}>הרץ כעת</button>
            </div>
            <div className="agents-list">
            <ResultList
                    resultOffset={listOffset || ""}
                    setResultOffset={setListOffset || ""}
                    jobsList={lastScannedJobs}
                    NodeComponent={ResultListNode || ""}
                    titlesList={[{ text: 'שם',className:'name-title' }, { text: 'קוד',className:'code-title' },{text:'מיקום',className:'area-title'}]}

        />
            </div>
    </div>)
}