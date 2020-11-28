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

router.get('/students', function(req, res, next) {
  index(res)
})

router.get('/students/register', function(req, res, next) {
  res.render('registerform')
})

router.get('/students/:id', function(req, res, next) {
  Student.lookUp(req.params.id)
            .then(data => res.render('student', { info: data }))
            .catch(err => res.render('error', {error: err}))
})

router.post('/students', function(req,res,next){
  
})

module.exports = router;
