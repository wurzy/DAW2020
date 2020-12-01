var express = require('express');
const { mongo } = require('mongoose');
var router = express.Router();

var mime = require('mime')
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + mime.extension(file.mimetype))
  }
})
var upload = multer({ 
  storage: storage  
});

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
  res.render('form',{mode: "GET"})
})

/* GET student page by id. */
router.get('/students/:id', function(req, res, next) {
  Student.lookUp(req.params.id)
            .then(data => res.render('student', { info: data }))
            .catch(err => res.render('error', {error: err}))
})

/* GET student edit form by id. */
router.get('/students/edit/:id', function(req, res, next) {
  Student.lookUp(req.params.id)
            .then(data => res.render('form', { mode: "PUT", s: data }))
            .catch(err => res.render('error', {error: err}))
})

/* POST new student into the db */
router.post('/students', upload.single('photo'), function(req,res,next){
  let i = 1
  let mongojson = {}
  let tpc = []
  mongojson["numero"] = req.body["numero"]
  mongojson["nome"] = req.body["nome"]
  mongojson["git"] = req.body["git"]
  mongojson["photo"] = req.file ? req.file.filename : null
  while (i < 9){
    tpc.push(req.body[`tpc${i}`] ? 1 : 0)
    i++
  }
  mongojson["tpc"] = tpc

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

/* PUT student update into the db */
router.put('/students/:id', upload.single('photo'), function(req, res, next) {
  let i = 1
  let tpc = []
  let json = req.body
  
  while (i < 9){
    tpc.push(json[`tpc${i}`] ? 1 : 0)
    i++
  }

  json["photo"] = req.file ? req.file.filename : null
  json["tpc"] = tpc

  Student.update(json)
            .then(data => res.render('confirm', {numero: req.params.id, type: "PUT"}))
            .catch(err => res.render('error', {error: err}))
})
 
module.exports = router;
