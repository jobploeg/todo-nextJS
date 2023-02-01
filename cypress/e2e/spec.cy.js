describe('Homepage test', () => {

  it('Ads a todo to the page with the input field', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-testid="input"]').type('todo 1')
    cy.get('[data-testid="add-button"]').click()
    cy.contains('todo 1')

  })

  it ('Gives an error saying: "Product cant be empty!" when the input field is empty', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-testid="input"]').type('  ')
    cy.get('[data-testid="add-button"]').click()
    cy.contains('Product cant be empty!')
  })

  it ('navigates to /completed when pressing on the link', () => {
    cy.visit('http://localhost:3000')

    cy.get('a').contains('Completed').click()
    cy.url().should('include', '/completed')
  })

  it ('navigates to /deleted when pressing on the link', () => {
    cy.visit('http://localhost:3000')

    cy.get('a').contains('Deleted').click()
    cy.url().should('include', '/deleted')
  })

  it ('Completes a todo when pressing on the button', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-testid="input"]').type('todo completed')
    cy.get('[data-testid="add-button"]').click()

    cy.get('[data-testid="completed-button"]').click()

  // go to completed page and check if the todo is there
    cy.get('a').contains('Completed').click()
    cy.contains('todo completed')
  })

  it ('Deleted a todo when pressing on the button', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-testid="input"]').type('todo deleted')
    cy.get('[data-testid="add-button"]').click()

    cy.get('[data-testid="deleted-button"]').click()

    // go to completed page and check if the todo is there
    cy.get('a').contains('Deleted').click()
    cy.contains('todo deleted')
  })

})

describe('Completed page test', () => {

  it ('shows the completed todos when there are completed todos', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="input"]').type('todo 1')
    cy.get('[data-testid="add-button"]').click()

    cy.get('a').contains('Completed').click()
    cy.contains('todo 1')
  })

  it ('shows: "No completed todos" when there are no completed todos', () => {
    cy.visit('http://localhost:3000/completed')

    cy.contains('No completed todos')
  })


})