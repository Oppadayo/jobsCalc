let data = [
    {   
        id: 1,
        name: 'Pizzaria Gula',
        'daily-hours': 2,
        'total-hours': 136,
        created_at: Date.now()
    },
    {   
        id: 2,
        name: 'OneTwo Project',
        'daily-hours': 6,
        'total-hours': 2,
        created_at: Date.now()
    }
]

module.exports = {
    get(){
        return data
    },
    update(newdata){
        data = newdata
    }
}