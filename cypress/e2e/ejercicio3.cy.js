describe('Ejercicio 3 - Input', () => {

    it('Escribe en un campo de texto', () => {
        // Visita la página de inputs
        cy.visit('https://the-internet.herokuapp.com/inputs')

        // Escribe un número en el campo
        cy.get('input[type="number"]')
            .clear()
            .type('12345')
            .should('have.value', '12345')

        // Limpia el campo y escribe otro número
        cy.get('input[type="number"]')
            .clear()
            .type('999')
            .should('have.value', '999')
    })

})
