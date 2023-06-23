describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function () {
    cy.contains('Log in').click()
  })

  it('user can login', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('sink')
    cy.get('#password').type('abcd1234')
    cy.get('#login-button').click()

    cy.contains('current user:Lincoln')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Log in').click()
      cy.get('#username').type('sink')
      cy.get('#password').type('abcd1234')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by')
    })
  })
})
