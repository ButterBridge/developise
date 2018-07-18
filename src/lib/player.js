export class Person {
    constructor (name) {
        this.name = name;
    }

    cloneMe () {
        const newThis = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        console.log(Object.entries(this))
    }
}
