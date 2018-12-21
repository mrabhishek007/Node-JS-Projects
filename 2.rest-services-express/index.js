const express = require('express');
const bodyparser = require("body-parser");
const Joi = require("joi");

const app = express();

//SET THE JSON as Mime-type
app.use(bodyparser.json());

//We are telling that we are sending JSON data instead of form data
app.use( bodyparser.urlencoded({extended:false})); // Use 'true' if we are sending form data

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
];

app.get('/', (req, res) =>{
   res.send('Hello World..!')
});

app.get('/api/courses', (req, res)=> {
    res.send(JSON.stringify(courses));
});

app.get('/api/courses/:id', (req, res)=> {

/*     const courseId = parseInt((req.params.id) - 1)  ;  //valid
       console.log(courseId);
       res.send(courses[courseId]);
*/
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

app.post('/api/courses', (req, res)=>{

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

app.put('/api/courses/:id',(req, res) => {

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

app.delete('/api/courses/:id', (req, res) => {
   
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

function validateName(courseObj){
     // Setting joi to handle input validation
    const schema = {
        name: Joi.string().min(3).required() //checking name validation
    }
    return result = Joi.validate(courseObj, schema); //provides err msg if condition not satisfies
}

const port = process.env.PORT || 3000;   // 'set PORT = PORT_NO' in cmd to set environmental variable
app.listen(port, () => console.log(`Server listening at port ${port}`));