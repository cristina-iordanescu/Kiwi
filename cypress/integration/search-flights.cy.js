/// <reference types="cypress"/>

import HomePage_PO from "../support/pageObjects/HomePage_PO";

describe("Search for flight", () => {
    const homepage = new HomePage_PO();
    beforeEach(function () {
        cy.visit('/')
        cy.get('[data-test="CookiesPopup-Accept"]').click()
    });

    it("Search for a flight with specific arrival/departure time", () => {
        let destination = Cypress.env('destination');

        homepage.enterDestination(destination)
        homepage.selectOutboundDate()
        homepage.selectDate('departure', 3)

        homepage.selectInboundDate()
        homepage.selectDate('return', 5)
        homepage.searchFlight()
        homepage.firstResultIncludesDestination(destination)

    });
})