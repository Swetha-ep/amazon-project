class Car {

    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model
        // this.speed = 0; we can here directly like this if we want
    }

    displayInfo(){
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed'
        console.log(
            `
            ${this.#brand} ${this.#model}, Speed : ${this.speed} km/h,
            Trunk : ${trunkStatus}
            `
        );
    }

    go(){

        if(!this.isTrunkOpen){
            this.speed += 5;
        }

        if (this.speed > 200){
            this.speed = 200;
        }
    }

    brake(){
        this.speed -= 5;

        if(this.speed < 0){
            this.speed = 0;
        }
    }

    openTrunk(){
        if(this.speed === 0){
            this.isTrunkOpen = true;
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }

}

// if we make speed a private property, the child class (ie RaceCar) cannot access the speed property any longer
// private properties can only be accessed in the same class only. In other languages, a property can be private,public and protected(ie it can be accessed inside a class and its child classes)
// oop in Js is less popular beacuse of it's missing features of oop like protected properties.

class RaceCar extends Car{

    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){
        this.speed += this.acceleration;

        if(this.speed > 300){
            this.speed = 300;
        }
    }

    openTrunk(){
        console.log('Race cars do not have a trunk');
    }

    closeTrunk(){
        console.log('Race cars do not have a trunk');
    }

}

const car1 = new Car({
    brand : 'Toyota',
    model :'Corolla'
});

const car2 = new Car({
    brand : 'Tesla',
    model : 'Model 3'
});

const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
});

console.log(car1);
console.log(car1.displayInfo());

console.log(car2);
console.log(car2.displayInfo());

car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();
car1.openTrunk();
car1.displayInfo();


car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();
car2.openTrunk();
car2.go();
car2.displayInfo();


raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.closeTrunk();
raceCar.brake();
raceCar.displayInfo();

