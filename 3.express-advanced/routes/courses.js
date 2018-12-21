const express = require('express');
const Joi = require("joi"); //Object schema description language and validator for JavaScript objects .

const router = express.Router();


const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
];

function validateName(courseObj){
    // Setting joi to handle input validation
    const schema = {
        name: Joi.string().min(3).required() //checking name validation
    }
    return result = Joi.validate(courseObj, schema); //provides err msg if condition not satisfies
}

router.get('/', (req, res)=> {   //by default treated as 'api/courses' bcz it is defined in router
    res.send(JSON.stringify(courses));
});

router.get('/:id', (req, res)=> {   //treated as 'api/courses/:id' bcz 'api/courses' is defined as by default in router

    const courseId = parseInt(req.params.id) ;
    const isCourseValid =  courses.find(function(item){   //searching the array if found returns obj else returns undefined
        return item.id === parseInt(req.params.id) ;
    });

    if(!isCourseValid){
        res.status(404).send(`The course with given id '${courseId}' was not found`);
    }else{
        res.send(isCourseValid);
    }
} )

router.post('/', (req, res)=>{

    const result = validateName(req.body) ;

    if(result.error){
        // 400 Bad Request
        return res.status(400).send(result.error.details[0].message);

    }
    //If data is valid
    const course = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course);
    res.send(course);
});

router.put('/:id',(req, res) => {

    const courseId = parseInt(req.params.id) ;
    const isCourseValid =  courses.find(function(item){  //traverse the entire collection if not found returnd undefined
        return item.id === parseInt(req.params.id) ;
    });

    if(!isCourseValid){
        return  res.status(404).send(`The course with given id '${courseId}' was not found`);
    }

    const result = validateName(req.body);
    if(result.error){
        // 400 Bad Request
        return res.status(400).send(result.error.details[0].message);
    }
    //If above condition is valid updating course
    isCourseValid.name = req.body.name ;
    res.send(isCourseValid);

});

router.delete('/:id', (req, res) => {

    const courseId = parseInt(req.params.id) ;
    const isCourseValid =  courses.find(function(item){  //traverse the entire collection if not found returnd undefined
        return item.id === parseInt(req.params.id) ;
    });

    if(!isCourseValid){
        return  res.status(404).send(`The course with given id '${courseId}' was not found`);
    }

    const index = courses.indexOf(isCourseValid);
    courses.splice(index, 1); //removes 1 element from array at index pos
    res.send({"delete":"successfull"});
});

module.exports = router;