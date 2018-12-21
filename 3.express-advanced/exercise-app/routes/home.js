const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<h2>Welcome to movie Application...</h2>
              <p><a href="http://localhost:3000/api/lists">show genres list</a></p>  `);
});
module.exports = router;
