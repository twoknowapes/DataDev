const code = `
var a = 'hello world'
`;

const options = {
    stringArray: true, // 将一个字符串声明放在一个数组里面、使之无法被直接搜索到
    rotateStringArray: true, // 控制数组化后结果的元素顺序、默认为true
    // stringArrayEncoding: true, // 控制数组的编码形式、默认为false
    stringArrayThreshold: 1, // 控制启用编码的概率、默认为0.8、[0-1]
    unicodeEscapeSequence: true, // 对字符串进行Unicode转码
};

const obfuscator = require("javascript-obfuscator");

function obfuscate(code, options) {
    return obfuscator.obfuscate(code, options).getObfuscatedCode();
}

console.log(obfuscate(code, options));
