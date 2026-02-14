import { test, expect } from '@playwright/test';

test('Login válido - verifica que el usuario pueda iniciar sesión correctamente', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');

    // Abrir modal de login
    await page.click('#login2');

    // Esperar a que el modal sea visible y llenar datos
    await page.waitForSelector('#loginusername', { state: 'visible' });
    await page.fill('#loginusername', 'daifer18');
    await page.fill('#loginpassword', 'd21997a');

    // Hacer clic en el botón Log in del modal
    await page.click('button[onclick="logIn()"]');

    // Verificar que el nombre de usuario aparezca en el navbar
    await expect(page.locator('#nameofuser')).toBeVisible({ timeout: 5000 });
});

test('Navegación por categorías - valida que se muestren productos de Laptops', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');

    // Hacer clic en la categoría Laptops
    await page.click('text=Laptops');

    // Esperar a que carguen los productos
    await page.waitForTimeout(1500);

    // Verificar que se muestren productos en la página
    const primerProducto = page.locator('#tbodyid .card-title').first();
    await expect(primerProducto).toBeVisible();
});

test('Visualización de producto - verifica que se pueda ver el detalle de un producto', async ({ page }) => {
    await page.goto('https://www.demoblaze.com');

    // Hacer clic en el primer producto visible
    await page.click('#tbodyid .card-title a');

    // Verificar que estamos en la página de detalle del producto
    await expect(page.locator('.name')).toBeVisible();
    await expect(page.locator('.price-container')).toBeVisible();

    // Verificar que el botón "Add to cart" esté visible
    await expect(page.locator('text=Add to cart')).toBeVisible();
});
