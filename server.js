var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');
//var db = mongojs('mongodb://localhost:27017/School');
var db = mongojs('mongodb://sunkee:temitope@ds231715.mlab.com:31715/andela');

var STUDENTS_COLLECTION = "Students";

const port = process.env.PORT || 5000;

var app = express();
app.use(cors());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//Body  Parser mW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


//Initialize the app
var server = app.listen(process.env.PORT || 5000, function() {
    var port = this.address().port;
    console.log("App now running on port", port, app.settings.env);
});

//GENERIC error handler used by all endpoints.

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    return res.status(code || 500).json({ "error": message });

}
/*"/api/students"
 *
 * GET: finds all students
 * POST: create a new student
 *
 */
app.get("/api/students", function(req, res, next) {
    db.Students.find(function(err, students) {
        if (err) {
            handleError(res, err.message, "Failed to get Students.");
        } else {
            return res.status(200).json(students);

        }
    });

});


app.post('/api/students', function(req, res, next) {
    var student = req.body;
    student.createDate = new Date();
    if (!student) {
        handleError(res, "Invalid user input", "Must fill all the fields.", 400)
    }
    db.Students.save(student, function(err, student) {
        if (err) {
            handleError(res, err.message, "Failed to create student.");
        } else {
            return res.status(201).json(student.ops[0]);
        }

    });
});

/**
 * "/api/students/:id"
 * GET: find student by id
 * PUT: update student by id
 * DELETE: deletes student by id
 */

app.get('/api/students/:id', function(req, res, next) {
    db.Students.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, student) {
        if (err) {
            handleError(res, err.message, "Failed to get student");
        } else {

            res.status(200).json(student);
        }
    });
});



app.put('/api/students/:id', function(req, res, next) {

    var students = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        course: req.body.course,
        state: req.body.state,
        gender: req.body.gender,
        address: req.body.address,
        phone: req.body.phone

    };
    delete req.body._id;
    db.Students.update({ _id: mongojs.ObjectId(req.params.id) }, students, function(err, students) {
        if (err) {
            handleError(res, err.message, "Failed to update student");
        } else {
            req.body._id = req.params.id;
            res.status(200).json(students);
        }

    });

});
app.delete('/api/students/:id', function(req, res, next) {
    db.Students.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, student) {
        if (err) {
            handleError(res, err.message, "Failed to delete student");
        }
        res.status(200).json(req.params.id);
    });
});