// 数组模式
var xl;
!(function (e) {
    var t = {};
    function n(r) {
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    };
    // 入口
    n.m = e, xl = n
}([
    function () {
        console.log('123');
    },
    function () {
        console.log('456')
    }
]))
// 可以直接根据形参来定位JS里面的模块
console.log(xl.m[0])
xl(0)

// 对象模式
var xl;
!(function (e) {
    var t = {};
    function n(r) {
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    };
    // 入口
    n.m = e, xl = n
}({
    0: function () {
        console.log('123');
    },
    '9527': function () {
        console.log('456')
    },
}))
// 可以直接根据形参来定位JS里面的模块
console.log(xl.m[0])
xl('9527')