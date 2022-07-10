class HomePage_PO {

    enterDestination(destination) {
        cy.get('[data-test="SearchFieldItem-destination"]').type(destination)
        cy.get('[data-test="PlacepickerModalOpened-destination"]').contains(destination).click({force: true})
    }

    uncheckBooking() {
        cy.get('.Checkbox__Input-sc-1xqef2c-4').uncheck({force: true}).should('not.be.checked')
    }

    acceptCookies() {
        cy.get('[data-test="CookiesPopup-Accept"]').click()
    }

    selectOutboundDate() {
        cy.get('[data-test="SearchFieldDateInput"]').first().click({force: true})
    }

    selectInboundDate() {
        cy.get('[data-test="SearchFieldDateInput"]').last().click({force: true})
    }

    selectDate(departureOrReturn, plusDays) {
        cy.get('[data-test="DatepickerMonthButton"] > .ButtonPrimitiveContent__StyledButtonPrimitiveContent-sc-1r81o9a-0 > .ButtonPrimitiveContentChildren__StyledButtonPrimitiveContentChildren-sc-1m4y8u8-0').as('yearMonth')

        var date = new Date();
        date.setDate(date.getDate() + plusDays);

        var futureYear = date.getFullYear();
        var futureMonth = date.toLocaleString("default", { month: "long" });
        var futureDay = date.getDate();

        departureOrReturn = departureOrReturn.toLowercase;

        function selectMonthAndYear() {
            if (departureOrReturn = 'departure') {
                cy.get('@yearMonth').first().then(currentMonthYear => {
                    if (!currentMonthYear.text().includes(futureYear)) {
                        cy.get('[data-test="CalendarMoveNextButton"]').click({force: true});
                        selectMonthAndYear();
                    }
                }).then(() => {
                    cy.get('@yearMonth').first().then(currentMonthYear => {
                        if (!currentMonthYear.text().includes(futureMonth)) {
                            cy.get('[data-test="CalendarMoveNextButton"]').click({force: true});
                            selectMonthAndYear();
                        }
                    })
                })
            }else{
                cy.get('@yearMonth').last().then(currentMonthYear => {
                    if (!currentMonthYear.text().includes(futureYear)) {
                        cy.get('[data-test="CalendarMoveNextButton"]').click({force: true});
                        selectMonthAndYear();
                    }
                }).then(() => {
                    cy.get('@yearMonth').last().then(currentMonthYear => {
                        if (!currentMonthYear.text().includes(futureMonth)) {
                            cy.get('[data-test="CalendarMoveNextButton"]').click({force: true});
                            selectMonthAndYear();
                        }
                    })
                })
            }

        }

        function selectDay() {
            cy.get('[data-test="DayDateTypography"]').contains(futureDay).click({force: true})
        }

        selectMonthAndYear();
        selectDay();
        this.submitDateForm();
    }

    submitDateForm() {
        cy.get('[data-test="SearchFormDoneButton"]').click()
    }

    searchFlight() {
        cy.get('[data-test="LandingSearchButton"]').click()
        cy.get('.LoadingProvidersstyled__Wrapper-sc-1rkbefj-0').should('not.exist')
    }

    firstResultIncludesDestination(destination) {
        cy.get('[data-test="ResultCardWrapper"]').should('contain', destination)
    }
}

export default HomePage_PO;