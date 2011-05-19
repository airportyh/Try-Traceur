print("\nArgument Unpack\n=====================")

var [a, b, c] = [1, 2, 3]
print('a: ' + a)

var [a, [b, d], c] = [1, [2, 4, 5], 3]

print('b: ' + b)
print('d: ' + d)

var {x, y} = {x: 1, y: 2}
print('x: ' + x)
print('y: ' + y)