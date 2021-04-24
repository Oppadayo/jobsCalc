module.exports = {
    remainingDays(job) {
        //calculo de tempo restante
        const remainingDaysInit = (job['total-hours'] / job['daily-hours']).toFixed()
            
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDaysInit)
        const dueDateInMs = createdDate.setDate(dueDay)
    
        const timeDiffInMs = dueDateInMs - Date.now()
    
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        return dayDiff
    },
    calculateBudget(job, valueHour) {
        return (valueHour * job['total-hours'])
    }
}