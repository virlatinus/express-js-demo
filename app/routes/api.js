var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var feedbackData = require('../data/feedback.json');

router.get('/api', (req, res) => {
  res.json(feedbackData);
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/api', (req, res) => {
  feedbackData.unshift(req.body);
  fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.json(feedbackData);
});


router.delete('/api/:id', (req, res) => {
  feedbackData.splice(req.params.id, 1);
  fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.json(feedbackData);
});



module.exports = router;
