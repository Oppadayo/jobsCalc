let data = {
    name: 'Paula',
    avatar: 'https://github.com/Oppadayo.png',
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4,
    "value-hour": 75
}

module.exports = {
    get(){
        return data
    },
    update(newData){
        data = newData
    }
}