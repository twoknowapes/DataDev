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
    // identifiersPrefix: "germey", // 控制混淆后的变量前缀
    // renameGlobals: true, // 指定是否混淆全局变量和函数名称、默认false

    // 字符串混淆
    stringArray: true, // 将一个字符串声明放在一个数组里面、使之无法被直接搜索到
    // rotateStringArray: true, // 控制数组化后结果的元素顺序、默认true
    // stringArrayEncoding: true, // 控制数组的编码形式、默认false
    // stringArrayThreshold: 1, // 控制启用编码的概率、[0-1]、默认0.8
    // unicodeEscapeSequence: true, // 对字符串进行Unicode转码

    // 代码自我保护
    selfDefending: true, // 开启代码自我保护、将代码进行格式化或重命名将无法执行

    // 控制流平坦化
    controlFlowFlattening: true, // 控制变量是否开启控制流平坦化、代码执行逻辑会更复杂、时间更长
    // controlFlowFlatteningThreshold: 0.75, // 控制流平坦化比例、[0-1]、默认0.75

    // 无用代码注入
    deadCodeInjection: true, // 控制无用代码注入、默认false
    // deadCodeInjectionThreshold: 1, // 控制无用代码注入比例、[0-1]、默认0.4

    // 对象键名替换
    transformObjectKeys: true, // 对对象的键值进行替换

    // 禁用控制台输出
    disableConsoleOutput: true, // 禁用掉console.log输出功能、加大调试难度

    // 调试保护
    debugProtection: true, // 启用调试保护功能
    // debugProtectionInterval: true, // 启用无限调试（debug）

    // 域名锁定
    domainLock: ['example.com'], // 控制代码只能在特定域名下运行、降低代码被模拟或盗用的风险
};

const obfuscator = require('javascript-obfuscator');

function obfuscate(code, options) {
    return obfuscator.obfuscate(code, options).getObfuscatedCode();
}

console.log(obfuscate(code, options));
