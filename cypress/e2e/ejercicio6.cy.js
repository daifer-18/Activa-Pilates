describe('Ejercicio 6 - Login', () => {

    it('Login exitoso con credenciales correctas', () => {
        // Visita la página de login
        cy.visit('https://the-internet.herokuapp.com/login')

        // Escribe el usuario
        cy.get('#username')
            .type('tomsmith')

        // Escribe la contraseña
        cy.get('#password')
            .type('SuperSecretPassword!')

        // Hace click en el botón de login
        cy.get('button[type="submit"]')
            .click()

        // Verifica que el login fue exitoso
        cy.get('.flash.success')
            .should('be.visible')
            .and('contain', 'You logged into a secure area!')

        // Verifica que la URL cambió
        cy.url().should('include', '/secure')
    })

})
