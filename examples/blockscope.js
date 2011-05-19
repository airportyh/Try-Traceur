print('\nBlock Scope\n==========================')
let funcs = []
for (let i : [4,5,6]) {
    let x = i + 2
    funcs.push(function() { return x })
}
for (let func : funcs) {
    print(func())
}