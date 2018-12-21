const promise = new Promise((resolve, reject) => {
    //kick off some async work....
   setTimeout( () => {
       resolve(1);  //  pending => resolved, fulfilled   (passing result when operation is fulfilled )
      // reject(new Error('message')) // pending => rejected
   },2000);
});

promise
    .then( (result) => console.log('Result : ', result) )
    .catch( (err) => console.log('Error : ', err.message)) ;
