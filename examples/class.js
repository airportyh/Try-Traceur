print('\nClasses\n=============')
class Animal{
    new(name){
        this.age = 0
        this.name = name
        Animal.totalAnimalCount++
    }
    
    function breed(){
        return new Animal(this.name + ' Jr.')
    }
    
    function toString(){
        return this.constructor.name + ' ' + this.name
    }
    
    class var totalAnimalCount = 0;
}

var elmo = new Animal('Elmo')
print(elmo.name)
var elmoJr = elmo.breed()
print(elmoJr.name)

class Cat: Animal{
    new(name){
        super(name)
    }
    
    function breed(){
        return new Cat(this.name + ' Jr.')
    }
    
    function meow(){
        print('Meow! My name is ' + this.name)
    }
}

var kitty = new Cat('Kitty')
kitty.meow()
print('Kitty is Cat? ' + (kitty instanceof Cat))
print('Kitty is Animal? ' + (kitty instanceof Animal))
print('Total animals: ' + Animal.totalAnimalCount)

// properties


