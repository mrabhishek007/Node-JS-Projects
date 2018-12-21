/* Node-config organizes hierarchical configurations for your app deployments.

   It lets you define a set of default parameters, and extend them for different deployment environments (development, qa, staging, production, etc.).

 */

// create a folder 'config' and define various json files to access the config variables 

const config = require('config'); //Node-config organizes hierarchical configurations for your app deployments.

// Configuration 
console.log('Application Name : ' + config.get('name'));
console.log('Mail Server : ' + config.get('mail.name'));
console.log('Mail Password : ' + config.get('mail.password')); // set Mail Password using 'set app_password=000'

// To enable production/developement mode run 'set NODE_ENV=production/development' in cmd

const port = process.env.PORT || 3000;   // 'set PORT = PORT_NO' in cmd to set environmental variable
app.listen(port, () => console.log(`Server listening at port ${port}`));