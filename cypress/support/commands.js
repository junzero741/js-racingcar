// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { buttonSelector, inputSelector } from '../../src/js/constant/selector'
import { eventType } from '../../src/js/constant/eventType'

Cypress.Commands.add('submitCarName', ({ carName, submitType }) => {
	if (submitType === eventType.ENTER) {
		cy.get(inputSelector.INPUT_CAR_NAME).type(`${carName}{enter}`)
	}
	if (submitType === eventType.CLICK) {
		cy.get(inputSelector.INPUT_CAR_NAME).type(carName)
		cy.get(buttonSelector.SUBMIT_CAR_NAME).click()
	}
})

Cypress.Commands.add('submitRaceCount', ({ raceCount, submitType }) => {
	if (submitType === eventType.ENTER) {
		cy.get(inputSelector.INPUT_RACE_COUNT).type(`${raceCount}{enter}`)
	}
	if (submitType === eventType.CLICK) {
		cy.get(inputSelector.INPUT_RACE_COUNT).type(raceCount)
		cy.get(buttonSelector.SUBMIT_RACE_COUNT).click()
	}
})
