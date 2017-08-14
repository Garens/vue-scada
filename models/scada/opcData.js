/**
 * opc数据数据操作
 * @author garens
 * date: 2017年8月14日18:06:37
 */

var gmodel = require('../model');


exports.getAllOpcData = function(params, callback) {
  gmodel.opcData.findAll().then(function(ret) {
    callback({flag: true, data: ret});
  }).catch(function(err) {
    callback({flag: false, msg: '获取列表失败'});
  });
}

exports.changeItem = function(params, callback) {
  if(!params) {
    return callback({flag: false, msg: '传入数据有误'});
  }
  gmodel.opcData.upset(params).then(function(ret) {
    callback({flag: true, data: ret});
  }).catch(function(err) {
    callback({flag: false, msg: '更新数据失败'});
  }); 
}

