
// Trade off between performance and consistency 

// APPROCH 1 : USING REFRENCE ( NORMALIZATION ) => PROVIDES CONSISTENCY BUT LOWER PERFORMANCE (2 QUERIES REQUIRED)

let author = {
    name: 'Mosh Hamedani',
    age: 35
}
// We can give refrence of author to access 'author' in another document(course) but it requires 2 queries to access both document, Hence low performance 
let course = {
    name: 'Node.js',
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Author'  
    }
}

// APPROCH 2 : Using Embedded documents (Denormalization) => LOW CONSISTENCY BUT MAX PERFORMANCE ( ONLY 1 QUERIES REQUIRED )

let course = {
    name : 'Node.js',
    // implementing author inside course, hence grest performance ( Only 1 query required to acess both data )
    author: {   
        name: 'Mosh Hamedani'
    }
}

// APPROACH 3 : Hybrid (Using refrence but only implement required properties instead of all the property)

let course = {
    name : 'Node.js',
    // Only defining required properties instead of all properties of auther ( Good Performance ) 
    author:{
        id:'ref',   
        name:'Mosh'
    }
}





