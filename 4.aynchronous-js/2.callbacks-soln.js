/* We can use named function to overcome the callback - hell problem i.e. passing name of a function as parameter
   instead directly defining the function whole logic in parameter............   */

console.log('Before');

getUser(1, printGitUser );

function getUser(id, printUser) {
    setTimeout( () => {
        console.log('Reading user from database...');
        const userDetails = { id: id , githubusername: 'vikashkumargaurav' } ;

        printUser(userDetails);  // control jumps to  fun 1 bcz printUser() is just a reference pointing to printGitUser()
        // return { id: id, githubusername: 'vikash'}; //simple return statement is not valid while dealing with aync tasks [Use callbacks instead]
    }, 2000 );
}

function printGitUser(user) {   // ------------   fun 1
    console.log(`User : ${user}`);

    getRepositories1(user.githubusername, getCommits) ;
}

function getRepositories1(user, commits) {
    setTimeout( () => {
        console.log("Calling Github API...");
        const repo = [ 'rep1', 'rep2', 'rep3', 'rep4' ];

        commits(repo);  //it is calling getCommits(repo)  bcz commits() is just a reference pointing to getCommits() // control jumps to fun 2
    },3000);
}


function getCommits(repo) {   // ------------   fun 2
    console.log(repo);
    getCommitedRepoList(repo, printCommitedRepo);
}

function getCommitedRepoList(repo, printCommited) {
    setTimeout(() => {
        console.log('Calling Github API.......');
        printCommited(repo[0]);    // calling printCommitedRepo()
    },2000)
}

function printCommitedRepo(reposList) {
  console.log('Commited Projects : ' +  reposList);
}

console.log('After');
