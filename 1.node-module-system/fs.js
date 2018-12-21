const fs = require('fs');

/*   reading a directory (synchronous)
    const files = fs.readdirSync('./');
    console.log(files);
*/

fs.readdir('./', (err, file) => {
    if(!err){
        console.log('Files : '+ file);
    }else{
        console.log('Error : '+ err);
    }
});




