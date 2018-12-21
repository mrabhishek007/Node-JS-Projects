
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then( result => console.log('Connected to MONGO.......'))
    .catch( err => console.log('Error : ', err));

    const  courseSchema = new mongoose.Schema(
    {
        name: { type: String,
            required: true,  // required => user must enter valid value [data validation is only possible through mongoose (MongoDB doesn't provide techniques to handle validation)]
            minlength : 4,
            maxlength: 255,
            // match: / Regular expression /
            },
        category: {
           type: String,
           required: true,
           enum: ['web', 'mobile', 'network'],  // enum => value must only contains one of the property defined in enum
           lowercase: true, 
           uppercase: true,
           trim: true
        },    
        author: String,
        tags: {
            type: String,
            validate: {                        // check whether array(course tag) is not empty
                validator: function (array) {
                    return array && array.length > 0; //also checking array is not null and undefined
                },
                message: 'A course should have atleast one tag.'
            }
        },
        isPublished: Boolean,
        date: {type: Date, default: Date.now },
        price: {
            type: Number,
            required: function(){ return this.isPublished},  //price value is only compulsary when 'isPublished : true' 
            get: num => Math.round(num), // during  retrieving it will round the value
            set: num => Math.round(num), //when value is set it will round the value
        }
    }
);

const Course = mongoose.model('CourseModel', courseSchema); 

async function createCourse( name, author, price, tags, isPublished) {
    const course  = new Course({
        name: name,
        // category: 'mototor',  // error bcz data is not enum type 
        category: 'web',
        author: author,
        price:price,
        tags: tags,
        isPublished: isPublished
    })

     try{
        const result = await course.save(); 
        console.log('Saving course to Mongo : '+ result);
    }
    catch(exception){
        console.log('Exception : ' + exception.message);
    }


    /* valid approach to handle error(callbacks)
    course.validate((err) => {
        if(err) console.log(err.message);
        else console.log('course valid')
    })  
    */
}
createCourse('ASP.NET Course', 'John', 9, ['Sockets', 'Routing', 'Database', 'authentication', 'testing'], true) ;
    
async function getCourses(id) {
    const course = await Course
    .find()
    .limit(10)
    .sort({ name: 1 }) 
    .select({ name: 1, tags: 1 }) 
    console.log(course);
}








