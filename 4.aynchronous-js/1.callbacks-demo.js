console.log('Before');

getUser(1, function (user) {   //we are just passing reference of this function as parameter, it can be separately defined
    console.log(`User : ${user}`);

    //getting repository
    const username = user.githubusername;
    getRepositeries(username, function (repo) {
        console.log(repo);
    }) ;

});

// Callbacks
// Promises
// Async/await

function getUser(id, callback) {
    setTimeout( () => {
        console.log('Reading user from database...');
        const userDetails = { id: id , githubusername: 'vikashkumargaurav' } ;
        callback(userDetails);

        // return { id: id, githubusername: 'vikash'}; //simple return statement is not valid while dealing with aync tasks [Use callbacks instead]
    }, 2000 );
}

function getRepositeries(user, callback) {
    setTimeout( () => {
        console.log("Calling Github API...");
        const repo = [ 'rep1', 'rep2', 'rep3', 'rep4' ];
        callback(repo);
    }, 3000 );
}

console.log('After');
