const corn = require('node-cron')
const client = require('../postgres')

const { getAgents, searchJob } = require('../querys/querys')
const {removeAgentSendedEmail}=require('../querys/removeQuerys')
const { insertAgentSandedEmail } = require('../querys/insertQuerys')
const {updateAgentSended}=require('../querys/updateQuery')
const sendSaveJobs = async (jobsList, agentId) => {
    try {
        const removeResult = await client.query(removeAgentSendedEmail(agentId))
    } catch (err) {
        throw new Error('problem sending/saving agents jobs')
    }
    for (const job of jobsList) {
        try {
            const result = await client.query(insertAgentSandedEmail(agentId, job.id))           
            
        } catch (err) {
            console.log(err)
        }
    }
    
}
const handleAgentScan = async (agent) => {
console.log("🚀 ~ file: agentsSearch.js ~ line 22 ~ handleAgentScan ~ agent", agent)
    
            agent.jobs=[]
            agent.location_area="'"+agent.location_area+"'"
            agent.location_area = agent.location_area.split(',').join("','")
            agent.positions = agent.positions.split(',').join("','");
            for (let indexWord = 0; indexWord < agent.search_words.length;indexWord++)
            {
                console.log("🚀 ~ file: agentsSearch.js ~ line 32 ~ handleAgentScan ~ searchJob({ ...agent, searchWord: agent.search_words[indexWord], openJobsOnly: true })", searchJob({ ...agent, searchWord: agent.search_words[indexWord], openJobsOnly: true }))

                const result = await client.query(searchJob({ ...agent, searchWord: agent.search_words[indexWord], openJobsOnly: true }));
               
                for (let j = 0; j < result.rows.length; j++){
                    
                    agent.jobs.push(result.rows[j])                    
                }
    }
   const result= await client.query(updateAgentSended(agent.id))
    await sendSaveJobs(agent.jobs, agent.id)
}

corn.schedule('0 0 1 * * 1',async () => {//runs every Monday at 01:00:00
    const agentsList = (await client.query(getAgents())).rows
    console.log("agents scan start \n date:",new Date(Date.now()).toDateString());
    for (let i = 0; i < agentsList.length;i++){
        let agent = agentsList[i]

        const isScanNeeded = agent.last_scan_date === null || agent.weeks_from_last_scan >= agent.frequency_weeks;
        if (isScanNeeded) {
           await handleAgentScan(agent)
        }
        const updateSendedResult=await client.query(updateAgentSended(agent.id))
    }
    console.log("agent scan end")
})
module.exports={handleAgentScan}