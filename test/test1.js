

function test1() {
    var test2 = function() {
        console.log(11111);
        return 111;
    }
    return test2();
}

var a = test1();
console.log(a);