const removePosition = (job_id) => {
    return (`DELETE FROM position_jobs_connection  WHERE job_id=${job_id};`)
}
module.exports={removePosition}