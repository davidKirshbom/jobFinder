const removePosition = (job_id) => {
    return (`DELETE FROM position_jobs_connection  WHERE job_id=${job_id}`)
}
const removeJob = (jobId) => {
    return (`DELETE FROM jobs  WHERE id='${jobId}'`)
}
const removeSaveJob = (userUid,jobId) => {
    return (`DELETE FROM user_saved_jobs  WHERE user_uid='${userUid}' AND job_id=${jobId}`)
}
const removeAgent = (agentId) => {
    return (`
    DELETE FROM smart_agent_categories WHERE agent_id=${agentId};
    DELETE FROM smart_agent_positions WHERE agent_id=${agentId};
    DELETE FROM user_smart_agents WHERE id=${agentId};
    `)
}
const removeAgentSendedEmail = (agentId) => {
    return (`
    DELETE FROM agents_sended_jobs WHERE agent_id=${agentId};`)
}
module.exports={removePosition,removeJob,removeSaveJob,removeAgent,removeAgentSendedEmail}