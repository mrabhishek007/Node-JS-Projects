const mongoose = require('mongoose');
const url = 'mongodb://localhost/mongo-exerices';
mongoose.connect( url, { useNewUrlParser: true } )
    .then( result => console.log('Connected with mongo............') )
    .catch( err => console.log('Error : ',  err.message) );

// create Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    price: Number,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});  

//create model
const Course = mongoose.model( 'courses', courseSchema );  

// Get all the published courses, sort them by their name, pick only their name and author, and display them 
async function getCourse() {
   const courses = await Course
   .find({ isPublished: true, tags: 'backend' })
   .sort({ name: 1 })
   .select({ name: 1, author: 1});
   return course;
}

 // Get all the published frontend and backend courses,sort them by price in descending order, pick only their name & author, and display them... 
async function getCourses2() {
    return await Course
                    .find({ isPublished:true })
                    .or([{ tags: 'frontend' }, { tags: 'backend' }])
                    // .find({ isPublished:true, tags: { $in: ['frontend','backend'] } }) // similar to above
                    .sort({ price: -1 }) 
                    .select({ name: 1, author: 1 });   
}

// Get all the published courses that are $15 or more or have the word 'by' their title
async function getCourses3() {
    return await Course
                    .find()
                    .or([ {price: {$gte: 15}}, {name: /.*by.* /i} ]);                  
}


async function run() {
    // const courses =  await getCourse()
    // const courses =  await getCourses2()
    const courses =  await getCourses3()
    console.log(courses);
}

run();




