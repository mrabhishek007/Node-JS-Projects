const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // embedded / sub documents
  author:{
    type: [ authorSchema ],
    required: true
  }
}));

async function createCourse(name, arrayAuthors) {
  const course = new Course({
    name:name, 
    author: arrayAuthors // creating array of embedded documents
  }); 

  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));

           // Updating an embedded document

/*           //  APPROACH 1
  async function updateCourse(id) {
  const course = await Course.findById(id);
  course.author.name = "K.V Rao";   // updating an embedded document
  course.save();
} 
*/

            //  APPROACH 2 
async function updateCourse(id) {
  const course = await Course.update({_id: id}, {
    $set : {
      'author.name': 'John Snow'
    }
  });
}

// updateCourse('5b898bc33e0a891fc0fe1587');

      // Deleting an Embedded document

async function deleteCourseAuthor(id) {
  const course = await Course.update({_id: id}, {
    $unset : {
      'author': ''
    }
  });
}
// deleteCourseAuthor('5b898bc33e0a891fc0fe1587');

  // Creating array of Embedded documents
  /* 
  createCourse('Node Course', [
    new Author({ name: 'Mosh' }),
    new Author({ name: 'Raunak' }),
  ]);
  */

 // Adding new author in the existing Array of Embedded documents

 async function addnewAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.author.push(author);
  course.save();
 }
//  addnewAuthor('5b89a240131588135003a9cd', new Author({ name : 'Andrew' })) ;

 // Removing an author in the existing Array of Embedded documents

 async function removeAnAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.author.id(authorId)
  author.remove();
  course.save();
 }
 removeAnAuthor('5b89a240131588135003a9cd', '5b89a240131588135003a9cc') ;


  