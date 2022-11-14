/* global describe cy before it  */
describe('App with i18nReactive and multiple languages', () => {
  before(() => {
    cy.visit('app-with-i18n-reactive')
  })

  it('has an increment button', () => {
    cy.get('publish-button')
      .should('exist')
  })

  it('has an output count', () => {
    cy.get('subscribe-button')
      .should('have.text', 'You have clicked 0 times!')
  })

  it('has language switcher', () => {
    cy.get('language-switcher')
      .should('exist')
    cy.get('language-switcher button')
      .should('have.length', 5)
  })

  function incrementing (expecting) {
    describe('incrementing', () => {
      before(() => {
        cy.get('publish-button button').click()
      })

      it(`increments the output count to ${expecting}`, () => {
        const message = expecting === 1 ? `You have clicked ${expecting} time!` : `You have clicked ${expecting} times!`
        cy.get('subscribe-button')
          .should('have.text', message)
      })
    })
  }

  [1, 2, 3, 4, 5].forEach(e => incrementing(e))

  describe('switching language to italian', () => {
    before(() => {
      cy.get('language-switcher button').eq(1).click()
    })

    it('switches to italian', () => {
      cy.get('publish-button button')
        .should('have.text', 'Aumenta')
      cy.get('subscribe-button')
        .should('have.text', 'Hai cliccato 5 volte!')
    })

    it('provides italian translations for the language switcher', () => {
      cy.get('language-switcher button').eq(0)
        .should('have.text', 'Inglese')
      cy.get('language-switcher button').eq(1)
        .should('have.text', 'Italiano')
      cy.get('language-switcher button').eq(2)
        .should('have.text', 'Russo')
      cy.get('language-switcher button').eq(3)
        .should('have.text', 'Cinese')
      cy.get('language-switcher button').eq(4)
        .should('have.text', 'Taiwanese')
    })
  })
})
