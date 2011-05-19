print('\nTraits\n=====================')
trait SaysHello{
    requires name;
    
    function greet(name){
        print(['Hello', name, '. My name is', this.name(), '.'].join(' '))
    }
    
}

class Dude{
    mixin SaysHello;
    
    new(name){
        this._name = name
    }
    
    function name(){
        return this._name
    }
}

new Dude('Bob').greet('Jane')