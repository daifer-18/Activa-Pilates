const fs = require('fs');

const data = JSON.parse(fs.readFileSync('reporte-clean.json', 'utf-8'));

const resultados = {};

data.suites.forEach(suite => {
    suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
            const nombre = spec.title;
            const browser = test.projectName;
            const estado = test.results[0].status;

            if (!resultados[nombre]) {
                resultados[nombre] = {};
            }

            resultados[nombre][browser] = estado === 'passed' ? '✅ PASA' : '❌ FALLA';
        });
    });
});

console.log('\n========================================');
console.log('       REPORTE POR NAVEGADOR');
console.log('========================================\n');

console.table(resultados);

// También generar un reporte en texto plano
let reporteTexto = '\n========================================\n';
reporteTexto += '       REPORTE POR NAVEGADOR\n';
reporteTexto += '========================================\n\n';

reporteTexto += '┌─────────────────────────────────────────────────────────────────┬───────────┬───────────┬───────────┐\n';
reporteTexto += '│ Prueba                                                          │ chromium  │ firefox   │ webkit    │\n';
reporteTexto += '├─────────────────────────────────────────────────────────────────┼───────────┼───────────┼───────────┤\n';

Object.keys(resultados).forEach(prueba => {
    const chromium = resultados[prueba].chromium || 'N/A';
    const firefox = resultados[prueba].firefox || 'N/A';
    const webkit = resultados[prueba].webkit || 'N/A';

    // Truncar nombre de prueba si es muy largo
    const nombreCorto = prueba.length > 63 ? prueba.substring(0, 60) + '...' : prueba;
    const nombrePadded = nombreCorto.padEnd(63, ' ');

    reporteTexto += `│ ${nombrePadded} │ ${chromium.padEnd(9, ' ')} │ ${firefox.padEnd(9, ' ')} │ ${webkit.padEnd(9, ' ')} │\n`;
});

reporteTexto += '└─────────────────────────────────────────────────────────────────┴───────────┴───────────┴───────────┘\n';

// Guardar en archivo
fs.writeFileSync('reporte-consola.txt', reporteTexto, 'utf-8');

console.log('\n✅ Reporte guardado en: reporte-consola.txt');
