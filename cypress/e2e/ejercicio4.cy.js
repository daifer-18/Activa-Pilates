describe('Ejercicio 4 - Aparece contenido', () => {

    it('Muestra mensaje después de hacer click', () => {
        // Visita la página de Add/Remove Elements
        cy.visit('https://the-internet.herokuapp.com/add_remove_elements/')

        // Verifica que inicialmente no hay botones "Delete"
        cy.get('.added-manually').should('not.exist')

        // Hace click en "Add Element"
        cy.contains('Add Element').click()

        // Verifica que ahora SÍ aparece el botón "Delete"
        cy.get('.added-manually')
            .should('be.visible')
            .and('contain', 'Delete')
    })

})
