/// <reference types="cypress"/>

import HomePage_PO from "../support/pageObjects/HomePage_PO";

describe("Search for flight", () => {
    const homepage = new HomePage_PO();
    beforeEach(function () {
        cy.visit(Cypress.env('homepage'))
        homepage.acceptCookies();
        homepage.uncheckBooking()
    });

    it("Search for a flight with specific arrival/departure time", () => {
        homepage.enterDestination(Cypress.env('destination'))
        homepage.selectOutboundDate()
        homepage.selectDate('departure', 3)

        homepage.selectInboundDate()
        homepage.selectDate('return', 5)
        homepage.searchFlight()
        homepage.firstResultIncludesDestination(Cypress.env('destination'))

    });

    it("Search for a first class flight", () => {
        homepage.openClassOverlay()
        homepage.selectFirstClass()
        homepage.uncheckMixedClass()
        homepage.saveClassOverlay()
        homepage.searchFlight()
    });

})