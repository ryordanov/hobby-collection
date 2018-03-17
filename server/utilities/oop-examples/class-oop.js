class Animal {
    constructor(name, species) {
        // if (new.target === Animal) {
        //     throw Error('Cannot instantiate abstract classes directly!')
        // }
        console.log('new.target', new.target);

        this.name = name;
        this.species = species;
    }

    toString() {
        let className = this.constructor.name;
        return `${className} (name: ${this.name})`;
    }
}

class Tiger extends Animal {
    constructor(name, species, someAction) {
        super(name, species);
        this.someAction = someAction;
    }
}

let animal = new Animal('animal', 'generaltype');
console.log(animal);
let tigger = new Tiger('tiggercho', 'beast');
console.log(tigger);