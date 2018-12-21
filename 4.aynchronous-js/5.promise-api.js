/* // Using promises for Unit Testing
const p = Promise.resolve({id:1});
p.then(result => console.log(p));

const p2 = Promise.reject(new Error('Reason For rejection'));
p2.catch(err => console.log(p2));

 */

    /* Running Parallel Promises  */

 const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Asynchronous Operation 1 ..');
        resolve(1);
        reject(new Error('Some Error Occured'));

    },5000);
 });

 const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Asynchronous Operation 2 ..');
        resolve(2);
        reject(new Error('Error in promise2...'));        
    },2000);
 });

/*  Waits for all the promises to complete then returns array of result or rejection msg  
    Promise.all([p1, p2]) 
    .then(result => console.log('Result of Promise 1 :', result[0], ', Result of Promise 2 :', result[1]))
    .catch(err => console.log('Error : ',err )); //if any one of the promises gets rejected the final promises will result is also rejected. we will not be able to get result in this senerio
*/

 // When any of the promises get resolved it kicks-off the result instead of waiting for all promises to complete the provide result
 Promise.race([p1, p2])
 .then(result => console.log('Result : ', result)) // returns result of first executed Promise
 .catch(err => console.log('Error : ',err ));


