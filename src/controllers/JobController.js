const Job = require('../models/Job')
const jobUtils = require('../utils/jobUtils')
const Profile = require('../models/Profile')


module.exports = {  
    
    async save(request, response){              
        await Job.create({            
            name: request.body.name,        
            "daily-hours": request.body['daily-hours'],
            "total-hours": request.body['total-hours'],
            created_at: Date.now()
        })

        return response.redirect('/')
    },
    create(request, response){ 
       return response.render('job')
    },
    async show(request, response) {
        const jobs = await Job.get()
        const profile = await Profile.get()

        const jobId = request.params.id 

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job){
            return res.send('Job not found')
        }

        job.budget = jobUtils.calculateBudget(job, profile['value-hour'])

        return response.render('job-edit', { job })
    },
    async update(request, response){
    
        const jobId = request.params.id        

        const updatedJob = {
           name: request.body.name,
           'total-hours': request.body['total-hours'],
           'daily-hours': request.body['daily-hours']
        }

        await Job.update(updatedJob, jobId)

        response.redirect('/job/' + jobId)
    },
    async delete(request, response){       
        const jobId = request.params.id 

        await Job.delete(jobId)

        return response.redirect('/')
    }
}