var express = require('express');
var router = express.Router();
var Async = require("async");//流程控制
// 定义全局的Vue为了服务端的app.js
global.Vue = require('vue')
// 创建一个渲染器
var renderer = require('vue-server-renderer').createRenderer()


/* GET home page. */
router.get('*', function(req, res, next) {

  console.time('series');
  //1 串行 这种流程只适合按顺序执行且每一步没有关联
Async.series({
  one:function(done){
    done(null, 'one');
  },
  two:function(done){
    done(null, 'two');
  }
},function(error,result){
      console.log('one:', result.one);
      console.log('two:', result.two);
      console.timeEnd('series');
})
  //2 并行 这种流程只适合按并行且无关联
  Async.parallel({
    one:function(done){
      done(null, 'one');
    },
    two:function(done){
      done(null, 'two');
    }
  },function(error,result){
        console.log('one:', result.one);
        console.log('two:', result.two);
        console.timeEnd('series');
  })



  res.render('index', { title: 'Express' });


});

module.exports = router;
