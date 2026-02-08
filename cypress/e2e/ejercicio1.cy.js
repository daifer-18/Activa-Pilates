describe('Ejercicio 1 - Visitar página', () => {

    it('La página carga correctamente', () => {
        // Visita la página principal
        cy.visit('https://the-internet.herokuapp.com/')

        // Verifica que el título principal sea visible
        cy.contains('Welcome to the-internet')
            .should('be.visible')

        // Verifica que el subtítulo esté presente
        cy.contains('Available Examples')
            .should('be.visible')
    })

})
