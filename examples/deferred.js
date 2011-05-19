print('\nDeferred\n===============')

var box = document.createElement('div')
box.style.height = 50
box.style.width = 50
box.style.backgroundColor = 'bada55'
box.style.position = 'absolute'
box.style.top = 10
box.style.right = 10

document.body.appendChild(box)

function sleep(delay) {
    var deferred = new Deferred()
    window.setTimeout(function() {
        deferred.callback({})
    }, delay)
    return deferred
}

function animate(element) {
    for (var i = 10; i < 500; ++i) {
        element.style.right = i
        await sleep(20)
    }
}

animate(box)