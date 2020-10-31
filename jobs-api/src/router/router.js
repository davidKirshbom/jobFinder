const express = require('express');
const router = express.Router();
router.get('/l',(req, res)=> {
    
    res.send('ok');
})
module.exports = router;
