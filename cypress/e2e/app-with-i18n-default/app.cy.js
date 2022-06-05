/* global describe cy before it  */
describe('App with i18n defaults', () => {
  before(() => {
    cy.visit('app-with-i18n-default')
  })

  it('has an increment button', () => {
    cy.get('publish-button')
      .should('exist')
  })

  it('has an output count', () => {
    cy.get('subscribe-button')
      .should('have.text', 'You have clicked 0 times!')
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
})
