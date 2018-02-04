if (!Object.create) {
    Object.create = function(proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}

if (!Object.prototype.extends) {
    Object.prototype.extends = function(parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    };
}

var Animal = (function() {
    function Animal(name, species) {
        this._name = name;
        this._species = species;
    }
    Animal.prototype.produceSound = function() {
        throw new Error('Cannot call the abstract method');
    };

    Animal.prototype.walk = function() {
        return this._name + ' is walking...';
    };
    return Animal;
})();

// var animal = new Animal('Pinko', 'panther');
// // animal.walk = function() {
// //     return 'Re...spect! Walk!';
// // };
// console.log(animal.walk());

var Cougar = (function () {
    function Cougar(name, isSaberTooth) {
        Animal.call(this, name, 'cougar');
        this._isSaberTooth = isSaberTooth;
    }

    Cougar.extends(Animal);

    Cougar.prototype.walk = function() {
        return Animal.prototype.walk.call(this) + ' and is cougar!';
    };

    Cougar.prototype.produceSound = function() {
        return 'I will eat you!';
    };

    return Cougar;
})();

var bigCat = new Cougar('Biggie', false);

// bigCat.doSomething = function() {
//     return 'Something done!';
// };

console.log(bigCat.produceSound());