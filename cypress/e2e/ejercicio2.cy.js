describe('Ejercicio 2 - Hacer click en un botón', () => {

    it('Hace click en un link y navega a otra página', () => {
        // Visita la página principal
        cy.visit('https://the-internet.herokuapp.com/')

        // Busca el link "Add/Remove Elements" y hace click
        cy.contains('Add/Remove Elements')
            .click()

        // Verifica que navegó a la página correcta
        cy.url().should('include', '/add_remove_elements')

        // Hace click en el botón "Add Element"
        cy.contains('Add Element')
            .click()

        // Verifica que apareció el botón "Delete"
        cy.contains('Delete')
            .should('be.visible')
    })

})
