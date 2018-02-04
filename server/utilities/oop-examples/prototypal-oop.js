if (!Object.create) {
    Object.create = function(proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}

var Animal = {
    init: function(name, species) {
        this._name = name;
        this._species = species;
    },
    produceSound: function() {
        throw new Error('Cannot call the abstract method');
    },
    walk: function() {
        return this._name + ' is walking...';
    }
};

var Tiger = Object.create(Animal);
Tiger.init = function(name, isSaberToothTiger) {
    Animal.init.call(this, name, isSaberToothTiger);
    this._isSaberToothTiger = isSaberToothTiger;
};

var tigger = Object.create(Tiger);
tigger.init('Tigger', false);
tigger.produceSound = function() {
    return 'AAARRRRRRRGGGGGGHHHHHHH!!!';
};
Tiger.jump = function() {
    return this._name + ' is jumping!';
};

var normalTiger = Object.create(Tiger);
normalTiger.init('normal tiger', false);

console.log(normalTiger.jump());