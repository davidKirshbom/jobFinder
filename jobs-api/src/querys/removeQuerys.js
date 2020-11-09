const removePosition = (job_id) => {
    return (`DELETE FROM position_jobs_connection  WHERE job_id=${job_id}`)
}
const removeJob = (jobId) => {
    return (`DELETE FROM jobs  WHERE id='${jobId}'`)
}
module.exports={removePosition,removeJob}