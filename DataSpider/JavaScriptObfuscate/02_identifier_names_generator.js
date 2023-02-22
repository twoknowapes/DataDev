const code = `
let hello = '1' + 1
console.log('hello',hello)
`;

const options = {
    compact: true,
    // identifierNamesGenerator: "mangled", // 将变量名替换成普通的简写字符串
    identifierNamesGenerator: "hexadecimal", // 将变量名替换为十六进制形式的字符串
    identifiersPrefix: "germey", // 控制混淆后的变量前缀
    renameGlobals: true, // 指定是否混淆全局变量和函数名称、默认为false
};

const obfuscator = require("javascript-obfuscator");

function obfuscate(code, options) {
    return obfuscator.obfuscate(code, options).getObfuscatedCode();
}

console.log(obfuscate(code, options));
