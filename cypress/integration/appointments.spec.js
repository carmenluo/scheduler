describe('Appointments', () => {
  beforeEach(() => {
    cy.request('get', '/api/debug/reset')
    cy.visit('/');
    cy.contains('Monday');
  })
  it('should book an interview', () => {
    cy.contains('[data-testid=day]', 'Monday').click();
    // cy.contains('[data-testid=appointment]').should('have.length', 3);
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('[alt="Sylvia Palmer"]').click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it('should edit an interview', () => {
    cy.get('.appointment__card-right').children().first().click({ force: true });
    cy.get('[alt="Edit"]').click({ force: true });
    cy.get('[alt="Tori Malcolm"]').click();
    cy.get("[data-testid=student-name-input]").clear()
      .type("carmen", { delay: 500 });
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "carmen");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it('should cancel an interview', () => {
    cy.get("[alt=Delete]")
      .click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
})