// Single responsiblity Principle


// Liskov Substitution Principle

class vehicle {
    constructor(name, brand, topSpeed, average, price, tier){
        this.name = name
        this.brand = brand
        this.topSpeed = topSpeed
        this.average = average
        this.price = price
        this.tier = tier
    }

    tierCount() {
        console.log(`${this.name} have ${this.tier} tier`)
    }
}

class bike extends vehicle{
    constructor(name, brand, topSpeed, average, price, tier) {
        super(name, brand, topSpeed, average, price, tier)
        this.name = `${name}-${brand}`
    }

    tierCount() {
        console.log(`most ${this.name} have  2 tier`)
    }
}

class car extends vehicle{
    constructor(name, brand, topSpeed, average, price, tier) {
        super(name, brand, topSpeed, average, price, tier)
    }

    tierCount() {
        console.log(`${this.name} have  4 tier`)
    }
}

const bike1 = new bike('himalyan', 'royal enfield', 120, 30, 400000, 2)

bike1.tierCount()
console.log(bike1.name)

const bikes = new vehicle('himalyan', 'royal enfield', 120, 30, 400000, 2)

bikes.tierCount()