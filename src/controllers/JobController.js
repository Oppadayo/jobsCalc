const Job = require('../models/Job')
const jobUtils = require('../utils/jobUtils')
const Profile = require('../models/Profile')


module.exports = {    

    index(request, response){
        const jobs = Job.get()
        const profile = Profile.get()

        const updatedJobs = jobs.map((job) => {
                
        const remaining = jobUtils.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        
        
            return { 
                ...job, 
                remaining, 
                status,
                budget: jobUtils.calculateBudget(job, profile['value-hour']) }
        })
        
        return response.render('index', { jobs: updatedJobs })
        
    },
    create(request, response){
        const lastId = Job.data[Job.data.length - 1]?.id || 0
    
        Job.data.push({
            id: lastId + 1,
            name: request.body.name,        
            "daily-hours": request.body['daily-hours'],
            "total-hours": request.body['total-hours'],
            created_at: Date.now()
        })
        return response.redirect('/')
    },
    save(request, response){ 
       return response.render('job')
    },
    show(request, response) {

        const jobId = request.params.id 

        const job = Job.data.find(job => Number(job.id) === Number(jobId))

        if(!job){
            return res.send('Job not found')
        }

        job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

        return response.render('job-edit', { job })
    },
    update(request, response){
        const jobId = request.params.id 

        const job = Job.data.find(job => Number(job.id) === Number(jobId))

        if(!job){
            return response.send('Job not found')
        }

       const updatedJob = {
           ...job,
           name: request.body.name,
           'total-hours': request.body['total-hours'],
           'daily-hours': request.body['daily-hours']
       }

        Job.data = Job.data.map(job => {

            if(Number(job.id) === Number(jobId)){
                job = updatedJob
            }

            return job
        })

        response.redirect('/job/' + jobId)
    },
    delete(request, response){
        const jobId = request.params.id
        
        Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

        return response.redirect('/')
    }
}