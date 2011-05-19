print('\nGenerators\n==================')

function countTo(n){
    for (var i = 0; i < n; i++){
        yield i
    }
}

for (let n: countTo(10))
    print(n)