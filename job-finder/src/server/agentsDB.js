import requestsHandler from './requestsHandler'
const getUserAgents =async (user) => {
    const result = (await requestsHandler('get', '/agents/get-agents',{
        headers: {
            'Authorization':JSON.stringify('Bearer '+user.token),
        },
        params: {
            email: user.data.email,
            uid:user.data.uid
        }
    })).data
    return result;

}
const deleteAgent = async (agentId,user) => {
    const result = await requestsHandler('delete', `/agents/delete-agent/${agentId}/${user.data.email}`,
    {
        headers: {
            'Authorization':JSON.stringify('Bearer '+user.token)
        },
        })
    return result;
}
const getAgentLastScan = async (agentId,user) => {
    const result = (await requestsHandler('get', `/agents/agent-last-scan/${agentId}/${user.data.email}`,
        {
            headers: { 'Authorization':JSON.stringify('Bearer '+user.token)}
        })).data
    return result
}
const forceAgentScan = async(agent,user) =>
{
    const result = (await requestsHandler('post', `/agents/agent-scan/${agent.id}/${user.data.email}/${user.data.uid}`,
        {
            headers: { 'Authorization': JSON.stringify('Bearer ' + user.token) }
        
        })).data
    return result
}
const getAgent = async (user,agentId,editedData) => {
    const result=(await requestsHandler('get','/agents/get-agents',{
        headers: {
            'Authorization':JSON.stringify('Bearer '+user.token),
        },
        params: {
            email:user.data.email,
            uid: user.data.uid,
            agentId:agentId
        }
    })).data[0]
    return result
}
const newAgent = async (user,agentData) => {
    const result=(await requestsHandler('post',`/agents/new-agent/${user.data.uid}`,{
        headers: {
            // authorization:
            'Authorization': JSON.stringify('Bearer '+user.token), 
        },
        data: {
            userEmail:user.data.email,
           ...agentData
        }
    }))
} 
const editAgent = async (user, agentData) => {
    const result =(await requestsHandler('post',`/agents/update-agent/${user.data.uid}`,{
        headers: {
            'Authorization': JSON.stringify('Bearer '+user.token), 
        },
        data: {
            userEmail:user.data.email,
           ...agentData
        }
    }))

}       
export {
    getUserAgents, deleteAgent
    , getAgentLastScan, forceAgentScan,
    getAgent,newAgent,editAgent
}