var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/partials/:name', function (req, res) {
    res.render('partials/' + req.params.name);
});

router.get('*', function(req, res) {
    res.render('index', { title: 'Timelord' });
});


module.exports = router;
