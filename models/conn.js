/**
 * 连接MySQL数据库
 * Date: 2017年8月2日13:40:04
 */

var Sequelize = require('sequelize');
var config = require('../config/config');

var conn = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password,
    {
      host : config.mysql.host,
      port : config.mysql.port,
      dialect : 'mysql',
      // logging:false,    //是否打印查询语句
      timezone : "+08:00",
      define: {
        // 字段以下划线（_）来分割（默认是驼峰命名风格）
        //underscored: true,
        // timezone : "+08:00",
        timestamps: false,
      }
    });

module.exports=conn;
