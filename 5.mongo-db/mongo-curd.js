
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then( result => console.log('Connected to MONGO.......')) // Resolving Promise
    .catch( err => console.log('Error : ',err));

// Schema => Schema maps to a MongoDB collection and defines the shape of the documents within that collection..
const  courseSchema = new mongoose.Schema(
    {
        name: String,
        author: String,
        tags: [String],
        price: Number,
        date: {type: Date, default: Date.now },
        isPublished: Boolean
    }
);

// Model => A model is a class with which we construct documents with properties and behaviors as declared in our schema..
//'CourseModel' collection [table] is created below
const Course = mongoose.model('CourseModel', courseSchema); //returns a class and we can now create object of class amd define schema properties

    // Insert using mongoose
async function createCourse( name, author, price, tags, isPublished) {
    const course  = new Course({
        name: name,
        author: author,
        price:price,
        tags: tags,
        isPublished: isPublished
    })
    const result = await course.save(); //returns a promise bcz saving to database is a async operation
    console.log('Saving course to Mongo : '+ result);
}
// createCourse('Node.JS Course', 'Andrew', 15, ['Sockets', 'Routing', 'Database', 'authentication', 'testing'], true) ;
    
    // Retrieve using mongoose
async function getCourses(id) {
    /*  Comparision Operator */ 
        // eq (equal)
        // ne (not equal)
        // gt (greater than)
        // gte (greater then or equal to)
        // lt (less then)
        // lte (less then or equal to)
        // in
        // nin (not in)
      
    /* Logical Operator */ 
        // or
        // and

    const course = await Course
    // .find(); //returns a promise which contains which contains array of all courses [documents]       
    // .find({ author: 'Mosh', isPublished: true })
    // .find({ price: { $gte: 10, $lte: 20 } })
   
    // .find()
    // .or([ { author: 'Mosh' }, { isPublished: true } ]) // if any one of condition is valid returns result 
    // .and([ { author: 'Andrew' }, { isPublished: true } ]) // if both conditions are valid [similar to 2nd find()] 
    
    // .find({ author: /^A/ }) // Regular Expression [ author name starts with 'A' ]
    // .find({ author: /H$/i }) // RE [ author name ends with 'h/H' , i => Not case sesitive  ]
    // .find({ author: /.*DRE.*/i }) // RE [ author name which contains 'dre' anywhere in name  ]
    
    .find()
    .limit(10)
    .sort({ name: 1 }) // 1 => ascending order | -1 => descending oorder
    .select({ name: 1, tags: 1 }) // only returns name and tags
    // .count() // returns count
    console.log(course);
}

    // Update using mongoose
async function updateCourse(id) {
    // Approach 1 => Query First
    // findById
    // modify its properties
    // save

    // Approach 2 => Update first
    // update directly
    // Optionally get the updated document

/*   
              // Approach 1
    
    const course = await Course.findById(id);
    if(!course) return;
    course.isPublished =true;
    course.author = "By Vikash";
    const result = await course.save();
    console.log('Result : ', result);

*/
                // Approach 2

     // Updates but it returns the no of course updated (Multiples queries can be updated at a time)
    var result = await Course.updateMany({ isPublished: false }, {  //The same query selectors as in the find() method are used in param1 
        // Use Update Operators such as $set, $unset, or $rename.
        $set: {   
            author: "K.V ",
            isPublished: false,
            name:'Node.js'
        },
    });
    console.log('Result : ', result);

     // Updates and returns updated course (Only Single queries can be updated)
/*     var course = await Course.findByIdAndUpdate(id, {  
        $set: {
            author: "Microsoft",
            isPublished: false
        }
    }, { new: true });
    console.log('Result : ', course); */
}

async function removeCourse(id) {

    // const result = await Course.deleteOne({ _id: id });  // delete one course and returns confirmation msg
    // const result = await Course.deleteMany({ isPublished : false });  // deletes multiple course at a time
    // console.log('Result : ', result);
    
    const course = await Course.findOneAndRemove(id) // removes and returns the deleted element
    console.log('Result : ', course ) ;
}
// removeCourse('5b8685305212c43920895619');











