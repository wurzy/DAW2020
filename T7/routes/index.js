var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

function index(res){
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', {error: err}))
}

/* GET home page. */
router.get('/', function(req, res, next) {
  index(res)
})

/* GET home page. */
router.get('/students', function(req, res, next) {
  index(res)
})

/* GET student register form. */
router.get('/students/register', function(req, res, next) {
  res.render('registerform')
})

/* GET student page by id. */
router.get('/students/:id', function(req, res, next) {
  Student.lookUp(req.params.id)
            .then(data => res.render('student', { info: data }))
            .catch(err => res.render('error', {error: err}))
})

/* POST new student into the db */
router.post('/students', function(req,res,next){
  let i = 1
  let mongojson = {}
  let tpc = []
  mongojson["numero"] = req.body["numero"]
  mongojson["nome"] = req.body["nome"]
  mongojson["git"] = req.body["git"]
  while (i < 9){
    tpc.push(req.body[`tpc${i}`] ? 1 : 0)
    i++
  }
  mongojson["tpc"] = tpc
  console.log(JSON.stringify(mongojson))

  Student.insert(mongojson)
            .then(data => res.render('confirm', {numero: mongojson["numero"], type: "POST"}))
            .catch(err => res.render('error', {error: err}))
})

/* DELETE student from the db */
router.delete('/students/:id', function(req, res, next) {
 Student.delete(req.params.id)
            .then(data => res.render('confirm', {numero: req.params.id, type: "DELETE"}))
            .catch(err => res.render('error', {error: err}))
})

module.exports = router;
