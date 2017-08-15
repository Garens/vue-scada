/**
 * mqtt 连接
 * 读取数据库中的配置数据到缓存
 * 缓存订阅到的数据
 * 添加新的数据到数据库中
 * 
 * @author: swh
 * Date: 2017年8月2日11:47:04 * 
 */

var mqtt = require('mqtt');
var cache = require('memory-cache');
var gmodel = require('../models/model');

module.exports = (url, io) => {

    var client = mqtt.connect(url);
    var opcTopic = 'opcItem';

    var socket;

    io.sockets.on('connection', (_socket) => {
        console.log('socket.io connected.');
        socket = _socket;
    });

    client.on('connect', () => {
        console.log('client connected.');
        getDataToCache();
        client.subscribe(opcTopic);
        client.subscribe('test');
    });

    //处理订阅数据
    client.on('message', (topic, message) => {
        console.log(topic, message.toString());
        switch (topic) {
            case 'opcItem':
                insertToCache(message.toString());
                break;
            default:

                break;
        }
    });

    //连接关闭时触发
    client.on('close', () => {
        console.log('client close.');
    });

    //连接错误时触发
    client.on('error', (err) => {
        console.log('ERROR', err);
    });

    //连接关闭时触发
    client.on('offline', () => {
        console.log('offline');
    });



    /**
     * 读取数据库中的数据到缓存中
     */
    function getDataToCache() {
        findDataAll().then((ret) => {
            for (var i in ret) {
                cache.put(ret[i].tagName, ret[i].dataValues);
            }
        }).catch((err) => {
            console.log('getDataToCache ERROR:', err);
        })
    }

    /**
     * 查询opcData中的所有数据
     */
    function findDataAll() {
        return new Promise((resolve, reject) => {
            gmodel.opcData.findAll().then((ret) => {
                resolve(ret);
            }).catch((err) => {
                console.error('findDataAll ERROR:', err);
                reject(err);
            });
        });
    }

    /**
     * 把订阅到的数据进行缓存
     * @param {String} msg 
     */
    function insertToCache(msg) {
        var obj = JSON.parse(msg) || {};
        var tagName = obj.tagName;
        if (!tagName) {
            return console.error('insertToCache ERROR:', '数据格式出错，请检查mqtt发布的数据格式');
        }
        var isCache = cache.get(tagName);

        if (!isCache) {
            insertToDb(obj);
            cache.put(obj.tagName, obj);
            return;
        }
        // cache.put(tagName, obj);        //更新或添加cache中的数据

        isCache.value = obj.value || 0;
        isCache.timer = obj.timer || new Date().toLocaleString();

        //把消息以数据库的id发布到mqtt代理服务器
        client.publish('device/' + isCache.id, JSON.stringify(isCache));
        if (socket) {
            socket.emit('device', isCache);

        }
    }

    /**
     * 把新数据添加到数据库中
     * @param {Object} obj 
     */
    function insertToDb(obj) {
        if (!obj.tagName) {
            return console.log('insertToDb WARN:', 'tagMame为空，无法插入数据');
        }
        var _obj = {};
        _obj.id = newGuid();
        _obj.tagName = obj.tagName;
        _obj.type = obj.type || 'int';
        _obj.value = obj.value || '0';
        _obj.timer = obj.timer || new Date().toLocaleString();
        _obj.desc = obj.desc || '';

        gmodel.opcData.findCreateFind({
            where: {
                tagName: obj.tagName
            },
            defaults: _obj
        }).then((ret) => {
            console.log('插入成功');
        }).catch((err) => {
            console.error('insertToDb ERROR:', err);
        })

    }

    /**
     * 生成guid
     */
    function newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}


