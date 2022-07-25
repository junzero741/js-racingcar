import { freezeCarTryView } from "../view/car-try-input.js"
import { racingGameStore } from "../model/index.js"
import { validateCarTry } from "../validate/car-try.js"
import { race } from "../model/racing.js"
import { sendCarsToView } from "./car.js"

export const handleCarTryInput = function (carTryInput) {
  if(validateCarTry(carTryInput)) {
    freezeCarTryView()
    racingGameStore.setCarTry(carTryInput);
    sendCarsToView();
    race()
  }
}
