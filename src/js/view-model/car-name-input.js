import { generateCars } from "../model/index.js";
import { isOKToSendCarNamesToModel } from "../validate/validate-car-name.js"
import { freezeCarNameView } from "../view/car-name-input.js";
import { showCarTryInput } from "../view/car-try-input.js";


export const handleCarNameInput = function (carNameInput) {
  const carNames = carNameInput.split(",");
  if(isOKToSendCarNamesToModel(carNames)) {
    freezeCarNameView();
    showCarTryInput();
    const cars = generateCars(carNames);
    console.log(cars)
  }

}
