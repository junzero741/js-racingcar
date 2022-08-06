import { fieldsetSelector } from './constant/selector.js'
import validator from './validator.js'
import { $ } from './utils.js'
import { errorMessage } from './constant/message.js'
import { createCars, racingGameStore } from './models/index.js'
import {
	carsView,
	fieldsetView,
	trackView,
	winnersView,
} from './views/index.js'
import { userInteractionType } from './constant/interaction.js'

const completeFieldsetElement = function ({
	fieldsetSelector,
	saveValue,
	stateKey,
}) {
	try {
		if (!!saveValue && !!fieldsetSelector) {
			fieldsetSelector.disabled = true
			racingGameStore[stateKey].setState(saveValue)
			racingGameStore[stateKey].freeze()
		}
		if (!saveValue) {
			throw new Error(errorMessage.INVALID_SAVE_VALUE)
		}
		if (!fieldsetSelector) {
			throw new Error(errorMessage.INVALID_FIELDSET_ELEMENT)
		}
	} catch (err) {
		console.error(err)
	}
}

const handleCarNameInput = function (ev) {
	const { target, key } = ev
	if (key === userInteractionType.ENTER) {
		const cars = createCars(target.value)

		completeFieldsetElement({
			fieldsetSelector: $(fieldsetSelector.CAR_NAME_FIELD),
			saveValue: cars,
			stateKey: 'cars',
		})
	}
}

const handleClickCarNameSubmitButton = function (carNameInputValue) {
	const cars = createCars(carNameInputValue)
	completeFieldsetElement({
		fieldsetSelector: $(fieldsetSelector.CAR_NAME_FIELD),
		saveValue: cars,
		stateKey: 'cars',
	})
}

const handleRaceCountInput = function (ev) {
	const { target, key } = ev
	if (key === userInteractionType.ENTER) {
		const raceCount = target.valueAsNumber

		if (validator.validateRaceCount(raceCount)) {
			completeFieldsetElement({
				fieldsetSelector: $(fieldsetSelector.RACE_COUNT_FIELD),
				saveValue: raceCount,
				stateKey: 'raceCount',
			})
		}
	}
}

const handleClickRaceCountSubmitButton = function (raceCountInput) {
	const raceCount = raceCountInput.valueAsNumber

	if (validator.validateRaceCount(raceCount)) {
		completeFieldsetElement({
			fieldsetSelector: $(fieldsetSelector.RACE_COUNT_FIELD),
			saveValue: raceCount,
			stateKey: 'raceCount',
		})
	}
}

const initGame = function () {
	racingGameStore.isRaceStarted.setState(true)
}

const runGame = function () {
	const { cars, raceCount } = racingGameStore
	trackView.renderTrack({
		cars: cars.getState(),
		raceCount: raceCount.getState(),
	})
	setWinner({ cars: cars.getState() })
}

const setWinner = function ({ cars }) {
	const winnerPosition = cars.reduce((maxPosition, { position }) => {
		return position > maxPosition ? position : maxPosition
	}, 0)
	const winners = cars.filter((car) => car.position === winnerPosition)

	racingGameStore.winners.setState(winners)
}

const subscribeViews = (() => {
	racingGameStore.cars.subscribe(() => {
		fieldsetView.showFieldset($(fieldsetSelector.RACE_COUNT_FIELD))
	})
	racingGameStore.raceCount.subscribe(() => {
		carsView.renderCarList({ cars: racingGameStore.cars.getState() })
		initGame()
	})
	racingGameStore.isRaceStarted.subscribe(runGame)
	racingGameStore.winners.subscribe(() => {
		winnersView.renderWinners({ winners: racingGameStore.winners.getState() })
	})
})()

export default {
	handleCarNameInput,
	handleClickCarNameSubmitButton,
	handleRaceCountInput,
	handleClickRaceCountSubmitButton,
}
