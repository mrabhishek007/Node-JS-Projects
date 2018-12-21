// In this approach we are just storing refrence of the 'genres' collection in 'movies' collection. Only 'id' of 'genres' is stored noting else. While retriveing movie, we can use that id to also retrieve the data of genres collection along with movies collection 

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then( result => console.log('Connected to mongo......') )
    .catch( err => console.log('can\'t connect to mongoose', err));

    // Defining genre Schema & Model
 const genreSchema  = new mongoose.Schema({
     name: {
         type: String,
         required: true,
         minlength: 3,
         maxlength: 10
     }
 });  
 const Genre = mongoose.model('genres', genreSchema);

 // Defining movie Schema & Model 
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength:3,
        maxlength:20
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genres'
    },
    numberInStock: {
        type: Number,
        default:0
    },
    dailyRentalRate:{
        type: Number,
        default:0
    }
});

const Movies = mongoose.model('movies', movieSchema);

// Creating a genra
async function createGenra(name) {
    let genre  = new Genre({
        name: name
    })
    try{
        const result = await genre.save();
        console.log('Genre : ',  result);

    }
    catch(e){
        console.log('Error : ', e.message);
    } 
}

// createGenra('Sci-fi')

// Creating a Movie
async function createMovie( title, numberInStock, dailyRentalRate, genre ) {

    let movie = new Movies({
        title,
        numberInStock,
        dailyRentalRate,
        genre,        
    });
    try{
        const result = await movie.save();
        console.log('Movie : ',  result); //genre refrence set to 'movie' collection.Use retrieveMovie() to retrieve both info
    }
    catch(e){
        console.log('Error : ', e.message);
    }
}

// createMovie( 'Iron Man2',  15, 12, '5b8a6fee3c152a32788f99bc' );

// Retrieving Movie

async function retrieveMovie(movieId) {
    const movie = await  Movies
     .findById(movieId)
     .populate('genre', 'name -_id') //excuding _id(only retriveing name )
     .select();
    console.log(movie);    
    }

retrieveMovie('5b8a7022aa101d2d8cab5cc0');











