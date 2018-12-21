const bcrypt = require('bcrypt');

async function encrypt(password) {
    
    const salt =  await bcrypt.genSalt(10); //generates the salt. 10 is no. of round ( bigger round => strong encryption) 
    console.log(`Salt : ${salt}`);
    
    const hashed =  await bcrypt.hash(password, salt); // also returns promise
    console.log(`Hashed Data : ${hashed}`);

}
// encrypt('12345');

async function validate(password) {

    const hashedPwd = '$2b$10$F4XVucF2c74maLuzP6BXkebVNMuuR6CgMQXS9q9YEEKh3ucVXJ9tC' ;
    const match = await bcrypt.compare(password, hashedPwd );

    console.log(match); // true
}
validate('12345') 