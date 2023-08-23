const parse = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('@babel/types')
const fs = require('fs')
const path = require('path')

code = fs.readFileSync(path.join(__dirname, './ast_encode.js'), 'utf-8');
// 转语法树
let ast = parse.parse(code);
// console.log(JSON.stringify(ast, null, '\t'))

// 编写插件进行AST语法树结构修改、替换还原代码
vistor_0 = {
    VariableDeclarator(path) {
        console.log(path.node); // 获取当前path下的node节点
        console.log(path.type); //获取当前节点类型
        console.log(path.toString); // 获取源代码
        console.log(path.parentPath.node); // 获取父path
        console.log(path.parent); // 获取父节点
        console.log(path.parent.declarations[0].id.name) // 获取子节点
        console.log(path.parent.declarations[0].init.value) // 获取子节点
        console.log(path.container); // 获取兄弟节点
    }
}
// 遍历、修改AST语法树的各个节点：ast-语法树、vistor-节点插件（自己手写）
// traverse(ast, vistor_0)

// 处理编码
vistor_1 = {
    StringLiteral(path) {
        path.node.extra.raw = path.node.rawValue;
    }
}
traverse(ast, vistor_1)

// 处理数字相加


// fs.writeFile(path.join(__dirname, './ast_decode.js'), code, (err) => { })