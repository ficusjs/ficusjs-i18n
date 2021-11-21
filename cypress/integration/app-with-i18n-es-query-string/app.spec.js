/* global describe cy before it  */
describe('App with i18n and Spanish language set by query string', () => {
  before(() => {
    cy.visit('app-with-i18n-es-query-string?lang=es')
  })

  it('has an increment button', () => {
    cy.get('publish-button')
      .should('exist')
  })

  it('has an output count', () => {
    cy.get('subscribe-button')
      .should('have.text', '¡Has hecho clic 0 veces!')
  })

  function incrementing (expecting) {
    describe('incrementing', () => {
      before(() => {
        cy.get('publish-button button').click()
      })

      it(`increments the output count to ${expecting}`, () => {
        const message = expecting === 1 ? `¡Has hecho clic ${expecting} vez!` : `¡Has hecho clic ${expecting} veces!`
        cy.get('subscribe-button')
          .should('have.text', message)
      })
    })
  }

  [1, 2, 3, 4, 5].forEach(e => incrementing(e))
})
