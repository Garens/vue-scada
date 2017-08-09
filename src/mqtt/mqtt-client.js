/**
 * 连接mqtt server，订阅相关数据
 */
'use strict';

import mqtt from 'mqtt'


var client = mqtt.connect('ws://localhost:7410');

var topic = 'opcItem';

client.on('connect', () => {
    console.log('client connected.');
    client.subscribe(topic);
});
client.subscribe(topic);
console.log(client);
console.log(mqtt);

//处理订阅数据
client.on('message', (topic, message) => {
    console.log(topic, message.toString());
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