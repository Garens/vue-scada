/**
 * 数据库表对象及关系
 * Date: 2017年8月2日13:39:52
 * @author：swh
 */

var Sequelize = require('sequelize');
var conn = require('./conn');


var tb_opcdata = require('./table_models/tb_opcdata');

var opcData = tb_opcdata(conn,Sequelize);

// Article.belongsTo(User, {foreignKey: 'author', as: 'user'});
// Article.belongsTo(Sort, {foreignKey: 'sortid', as: 'sort'});
// Article.hasMany(Comm, {foreignKey: 'gid', targetKey: 'gid', as: 'comm'});
// Sort.hasMany(Article, {foreignKey: 'sortid', targetKey: 'sortid', as: 'article'});


exports.opcData = opcData;