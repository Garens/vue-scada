/**
 * memory-cache 测试
 */

var cache = require('memory-cache');


for(var i = 0; i < 100000; i++) {
    cache.put(i, {tagName:i,value:i});
}


console.log(111, cache.size());


console.log(222, cache.get(1002));
console.log(444, cache.get(435));
console.log(555, cache.get(6666));

cache.del(1002);

console.error(333, cache.get(1002));

console.log('这是一个警告', newGuid());

function newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
