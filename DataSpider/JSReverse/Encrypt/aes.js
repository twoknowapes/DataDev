var CryptoJS = require('crypto-js')

function tripleAesEncrypt() {
    var key = CryptoJS.enc.Utf8.parse(aesKey),
        iv = CryptoJS.enc.Utf8.parse(aesIv),
        srcs = CryptoJS.enc.Utf8.parse(text),
        // CBC加密方式、Pkcs7填充方式
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
    // return CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
}

function tripleAesDecrypt() {
    var key = CryptoJS.enc.Utf8.parse(aesKey),
        iv = CryptoJS.enc.Utf8.parse(aesIv),
        srcs = encryptedData,
        // CBC加密方式、Pkcs7填充方式
        decrypted = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

var aesKey = '6f726c64f2c2057c'
var aesIv = '0123456789ABCDEF'
var text = '1234561231213123123'

var encryptedData = tripleAesEncrypt()
var decryptedData = tripleAesDecrypt()

console.log('加密字符串：', encryptedData)
console.log('解密字符串：', decryptedData)


// 案例分析
// 目标：建筑市场数据采集
// 主页：https://jzsc.mohurd.gov.cn/data/company
// 接口：https://jzsc.mohurd.gov.cn/api/webApi/dataservice/query/comp/list
function h(t) {
    f = CryptoJS.enc.Utf8.parse('jo8j9wGw%6HbxfFn')
    m = CryptoJS.enc.Utf16.parse('0123456789ABCDEF');

    var key = e = CryptoJS.enc.Hex.parse(t)
    n = CryptoJS.enc.Base64.stringify(e)

    var decrypted = CryptoJS.AES.decrypt(n, f, {
        iv: m,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypt.toString(CryptoJS.enc.Utf8).toString();
}