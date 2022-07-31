import { CAR_GO_OR_NOT_STANDARD } from '../constant/number.js'
import { getRandomInt } from '../utils.js'

class Car {
	constructor(name) {
		this.name = name
		this.position = 0
	}

	go() {
		this.position += 1
	}

	isOkToGo() {
		return CAR_GO_OR_NOT_STANDARD > getRandomInt(0, 9)
	}
}

export const generateCars = (carNames) => {
	return carNames.map((name) => new Car(name))
}
