const CryptoJS = require('crypto-js')

function desEncrypt() {
    var key = CryptoJS.enc.Utf8.parse(desKey),
        iv = CryptoJS.enc.Utf8.parse(desIv),
        srcs = CryptoJS.enc.Utf8.parse(text),
        // CBC解密模式、Pkcs7填充模式
        encrypted = CryptoJS.DES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
}

function desDecrypt(data) {
    var key = CryptoJS.enc.Utf8.parse(desKey),
        iv = CryptoJS.enc.Utf8.parse(desIv),
        srcs = data,
        // CBC加密模式、Pkcs7填充方式
        decrypted = CryptoJS.DES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8)
}

var desKey = '6f726c64f2c2057c'
var desIv = '0123456789ABCDEF'
var text = '1234561231213123123'

var encryptedData = desEncrypt()
var decryptedData = desDecrypt(encryptedData)

console.log('加密字符串：', encryptedData)
console.log('解密字符串：', decryptedData)