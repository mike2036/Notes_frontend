describe('Note app', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science')
  })
})