const createEmployeeRecord = (recArray) => {
    return {
        firstName: recArray[0],
        familyName: recArray[1],
        title: recArray[2],
        payPerHour: recArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function (dateStamp){
    const [date, hour] = dateStamp.split(" ")
    // console.log('hour: ', hour);
    // console.log('date: ', date);
    // const arrFromDate = dateStamp.split(" ")
    // const date = arrFromDate[0]
    // const hour = arrFromDate[1]

    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(inEvent)
    // console.log('this: ', this);

    return this
}

const createTimeOutEvent = function (dateStamp){
    const [date, hour] = dateStamp.split(" ")

    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(outEvent)

    return this
}

const hoursWorkedOnDate = function(targetDate){
    const inEvent = this.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = this.timeOutEvents.find(oEvent => oEvent.date === targetDate)
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(targetDate){
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    // console.log('this: ', this);

//     const payable = eligibleDates.reduce(function (memo, d) {
//     // const payable = eligibleDates.reduce(function (memo, d) {
//     //     return memo + wagesEarnedOnDate.call(this, d)
//     // }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
//     // const payable = eligibleDates.reduce((memo, d) => {
//     //     return memo + wagesEarnedOnDate.call(this, d)
//     // }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
//     // }, 0) 

//     return payable
// }

const findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(rec => rec.firstName === firstName)
}

const calculatePayroll = function(recsArray){
    return recsArray.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)}
}
