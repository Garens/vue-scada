
var gmodel = require('../model');


exports.getOpcDataTable = function(params, callback) {
  gmodel.opcData.findAll().then(function(ret) {
    callback({flag: true, data: ret});
  }).catch(function(err) {
    callback({flag: false, msg: '获取列表失败'});
  });
}

