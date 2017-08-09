var express = require('express');
var router = express.Router();
var model = require('../models/model.js');
var OpcData = require('../models/scada/opcData');

//获取opc数据
router.get('/getOpcDataTable', function (req, res) {
    var params = {};
    OpcData.getOpcDataTable(params, function(ret) {
        res.send(ret);
    })
})


module.exports = router;