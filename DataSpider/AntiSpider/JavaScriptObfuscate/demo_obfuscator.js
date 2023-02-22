const code = `
let x = '1' + 1
console.log('x', x)

var a = 'hello world'
`;

const options = {
    // 代码压缩
    compact: true, // 默认为true、设置为false则混淆的代码会分行显示

    // 变量名混淆
    identifierNamesGenerator: "mangled", // 将变量名替换成普通的简写字符串
    // identifierNamesGenerator: "hexadecimal", // 将变量名替换为十六进制形式的字符串
    identifiersPrefix: "germey", // 控制混淆后的变量前缀
    renameGlobals: true, // 指定是否混淆全局变量和函数名称、默认为false

    // 字符串混淆
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
