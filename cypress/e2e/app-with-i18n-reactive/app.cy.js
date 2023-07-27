/* global describe cy before it  */
describe('App with i18nReactive and multiple languages', () => {
  before(() => {
    cy.visit('app-with-i18n-reactive')
  })

  it('has not a `lang` attribute', () => {
    cy.get('mock-app-with-i18n')
      .should('not.have.attr', 'lang')
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
      .should('not.have.attr', 'lang')
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

    it('has a `lang` attribute', () => {
      cy.get('mock-app-with-i18n')
        .should('have.attr', 'lang', 'it')
    })

    it('switches to italian', () => {
      cy.get('language-switcher')
        .should('not.have.attr', 'lang')
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

  describe('switching language to russian', () => {
    before(() => {
      cy.get('language-switcher button').eq(2).click()
    })

    it('has a `lang` attribute', () => {
      cy.get('mock-app-with-i18n')
        .should('have.attr', 'lang', 'ru')
    })

    it('switches to russian', () => {
      cy.get('language-switcher')
        .should('not.have.attr', 'lang')
      cy.get('publish-button button')
        .should('have.text', 'Увеличить')
      cy.get('subscribe-button')
        .should('have.text', 'Вы нажали 5 раз!')
    })

    it('provides russian translations for the language switcher', () => {
      cy.get('language-switcher button').eq(0)
        .should('have.text', 'Английский')
      cy.get('language-switcher button').eq(1)
        .should('have.text', 'Итальянский')
      cy.get('language-switcher button').eq(2)
        .should('have.text', 'Русский')
      cy.get('language-switcher button').eq(3)
        .should('have.text', 'Китайский')
      cy.get('language-switcher button').eq(4)
        .should('have.text', 'Тайваньский')
    })
  })

  describe('switching language to simplified chinese', () => {
    before(() => {
      cy.get('language-switcher button').eq(3).click()
    })

    it('has a `lang` attribute', () => {
      cy.get('mock-app-with-i18n')
        .should('have.attr', 'lang', 'zh-CN')
    })

    it('switches to simplified chinese', () => {
      cy.get('language-switcher')
        .should('not.have.attr', 'lang')
      cy.get('publish-button button')
        .should('have.text', '增加')
      cy.get('subscribe-button')
        .should('have.text', '您点击了 5 次！')
    })

    it('provides simplified chinese translations for the language switcher', () => {
      cy.get('language-switcher button').eq(0)
        .should('have.text', '英语')
      cy.get('language-switcher button').eq(1)
        .should('have.text', '意大利语')
      cy.get('language-switcher button').eq(2)
        .should('have.text', '俄语')
      cy.get('language-switcher button').eq(3)
        .should('have.text', '简体中文')
      cy.get('language-switcher button').eq(4)
        .should('have.text', '繁体中文')
    })
  })

  describe('switching language to traditional chinese', () => {
    before(() => {
      cy.get('language-switcher button').eq(4).click()
    })

    it('has a `lang` attribute', () => {
      cy.get('mock-app-with-i18n')
        .should('have.attr', 'lang', 'zh-TW')
    })

    it('switches to traditional chinese', () => {
    cy.get('language-switcher')
      .should('not.have.attr', 'lang')
      cy.get('publish-button button')
        .should('have.text', '增加')
      cy.get('subscribe-button')
        .should('have.text', '您點擊了 5 次！')
    })

    it('provides traditional chinese translations for the language switcher', () => {
      cy.get('language-switcher button').eq(0)
        .should('have.text', '英語')
      cy.get('language-switcher button').eq(1)
        .should('have.text', '意大利語')
      cy.get('language-switcher button').eq(2)
        .should('have.text', '俄語')
      cy.get('language-switcher button').eq(3)
        .should('have.text', '简体中文')
      cy.get('language-switcher button').eq(4)
        .should('have.text', '繁体中文')
    })
  })
})
