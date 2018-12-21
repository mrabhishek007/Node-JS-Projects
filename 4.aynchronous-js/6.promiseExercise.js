          // Replacing Callbacks with Promises
console.log('Before');

function getUser(id) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            console.log('Reading user from database...');
            const userDetails = { id: id , githubUserName: 'vikashkumargaurav' } ;
            resolve(userDetails);
            reject(new Error('Error while fetching User...'));
        }, 2000 );
    });
}

/* 
 // Using traditional way to handle promise results
   getUser(1)
    .then(user => getRepositories(user.githubUserName))
    .then(repos => getCommits(repos))
    .then(commits => console.log('Commits : ', commits))
    .catch( err => console.log('Error : ' , err.message ));
 */

 // Using async & await to handle above task (it's just a syntectical sugar, internally it uses promise similar to above )
async function displayCommits(){
    try{
        const user = await getUser(1);  //await is necessary to make async call otherwise treatead as noral function
        const repos = await getRepositories(user.githubUserName);
        const commits = await getCommits(repos);
        console.log('Commits : '+commits);
    }catch(err){
        console.log('Error : ' + err ); // returns error if any one of promise is rejected
    }
}
displayCommits(); // Calling async function (Syntectical sugar. Internally uses promises (.then ) to resolve promises)


function getRepositories(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling Github API...");
            const repo = ['rep1', 'rep2', 'rep3', 'rep4'];
            resolve(repo);
            reject(new Error('Error while fetching repositories...'));
        }, 2000 );
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github API...');
            resolve(repo[0]);
            reject( new Error('Error while fetching Commit files..'))
        },2000 ) ;
    });
}

console.log('After');