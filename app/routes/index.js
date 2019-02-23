var express = require('express');
var router = express.Router();
var Controller = require('../controller');

router.all('/api/test', function (req, res, next){
  console.log
  return res.json({
    status: 'UP',
    message:'Hi, From TuneNow'
  })
})
router.get('/api/songs', Controller.Songs.getAll)


module.exports = router;
