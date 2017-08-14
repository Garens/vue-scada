/**
 * 后台处理前端http请求路径为'/api'的路由文件
 * 
 * @author garens
 * date: 2017年8月14日18:07:59
 */

var express = require('express');
var router = express.Router();
var model = require('../models/model.js');
var OpcData = require('../models/scada/opcData');

//获取opc数据
router.get('/getAllOpcData', function (req, res) {
    var params = {};
    OpcData.getAllOpcData(params, function(ret) {
        res.send(ret);
    })
});

//修改opc数据
router.get('/changeItem', function (req, res) {
    var params = req.body;
    OpcData.changeItem(params, function(ret) {
        res.send(ret);
    })
});


module.exports = router;