describe('Ejercicio 5 - Desaparece elemento', () => {

    it('Oculta un elemento después de hacer click', () => {
        // Visita la página de Add/Remove Elements
        cy.visit('https://the-internet.herokuapp.com/add_remove_elements/')

        // Agrega un elemento
        cy.contains('Add Element').click()

        // Verifica que el botón "Delete" existe
        cy.get('.added-manually')
            .should('be.visible')

        // Hace click en el botón "Delete"
        cy.get('.added-manually').click()

        // Verifica que el botón "Delete" ya NO existe
        cy.get('.added-manually')
            .should('not.exist')
    })

})
