// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.lookUp = id => {
    return Student
        .findOne({numero: id})
        .exec()
}

module.exports.insert = student => {
    var newStudent = new Student(student)
    return newStudent.save()
}

module.exports.delete = id => {
    return Student
        .deleteOne({numero: id})
        .exec()
}

module.exports.update = student => {
    id = student["id"]
    delete student["id"]
    return Student
        .replaceOne({numero: id}, student)
        .exec()
}