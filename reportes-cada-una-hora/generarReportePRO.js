const fs = require('fs');
const XLSX = require('xlsx');
const { Parser } = require('json2csv');

console.log('🚀 Generando reportes profesionales...\n');

// Leer el JSON de Playwright
const data = JSON.parse(fs.readFileSync('reporte-clean.json', 'utf-8'));

const resultados = {};
const estadisticas = {
    total: 0,
    pasadas: 0,
    fallidas: 0,
    omitidas: 0
};

// Procesar resultados
data.suites.forEach(suite => {
    suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
            const nombre = spec.title;
            const browser = test.projectName;
            const estado = test.results[0].status === 'passed' ? '✅ PASA' :
                test.results[0].status === 'failed' ? '❌ FALLA' :
                    '⚠️ OMITIDO';
            const duracion = (test.results[0].duration / 1000).toFixed(2);

            if (!resultados[nombre]) {
                resultados[nombre] = {};
            }

            resultados[nombre][browser] = estado;
            resultados[nombre][`${browser}_duracion`] = `${duracion}s`;

            // Actualizar estadísticas
            estadisticas.total++;
            if (test.results[0].status === 'passed') estadisticas.pasadas++;
            else if (test.results[0].status === 'failed') estadisticas.fallidas++;
            else estadisticas.omitidas++;
        });
    });
});

// Preparar datos para exportación
const filas = Object.keys(resultados).map(prueba => ({
    Prueba: prueba,
    Chromium: resultados[prueba]['chromium'] || 'N/A',
    'Chromium Tiempo': resultados[prueba]['chromium_duracion'] || 'N/A',
    Firefox: resultados[prueba]['firefox'] || 'N/A',
    'Firefox Tiempo': resultados[prueba]['firefox_duracion'] || 'N/A',
    Webkit: resultados[prueba]['webkit'] || 'N/A',
    'Webkit Tiempo': resultados[prueba]['webkit_duracion'] || 'N/A'
}));

// ========================================
// 1️⃣ GENERAR CSV
// ========================================
console.log('📄 Generando CSV...');
const parser = new Parser();
const csv = parser.parse(filas);
fs.writeFileSync('reporte.csv', csv, 'utf-8');
console.log('✅ CSV generado: reporte.csv\n');

// ========================================
// 2️⃣ GENERAR EXCEL
// ========================================
console.log('📊 Generando Excel...');
const wb = XLSX.utils.book_new();

// Hoja 1: Resultados
const ws = XLSX.utils.json_to_sheet(filas);
XLSX.utils.book_append_sheet(wb, ws, "Resultados");

// Hoja 2: Estadísticas
const statsData = [
    { Métrica: 'Total de Pruebas', Valor: estadisticas.total },
    { Métrica: 'Pruebas Pasadas', Valor: estadisticas.pasadas },
    { Métrica: 'Pruebas Fallidas', Valor: estadisticas.fallidas },
    { Métrica: 'Pruebas Omitidas', Valor: estadisticas.omitidas },
    { Métrica: 'Tasa de Éxito', Valor: `${((estadisticas.pasadas / estadisticas.total) * 100).toFixed(2)}%` }
];
const wsStats = XLSX.utils.json_to_sheet(statsData);
XLSX.utils.book_append_sheet(wb, wsStats, "Estadísticas");

XLSX.writeFile(wb, "reporte.xlsx");
console.log('✅ Excel generado: reporte.xlsx\n');

// ========================================
// 3️⃣ GENERAR HTML PROFESIONAL
// ========================================
console.log('🎨 Generando HTML profesional...');

const fecha = new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    dateStyle: 'full',
    timeStyle: 'medium'
});

let html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte de Automatización - Demoblaze</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1600px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 2.8em;
      margin-bottom: 10px;
      font-weight: 700;
    }
    
    .header .subtitle {
      font-size: 1.2em;
      opacity: 0.9;
      margin-top: 10px;
    }
    
    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      padding: 40px;
      background: #f7fafc;
    }
    
    .stat-card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(0,0,0,0.15);
    }
    
    .stat-card .icon {
      font-size: 3em;
      margin-bottom: 15px;
    }
    
    .stat-card .numero {
      font-size: 3em;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    .stat-card .label {
      color: #718096;
      font-size: 1em;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }
    
    .stat-card.total .numero { color: #4299e1; }
    .stat-card.pasadas .numero { color: #48bb78; }
    .stat-card.fallidas .numero { color: #f56565; }
    .stat-card.tasa .numero { color: #9f7aea; }
    
    .tabla-container {
      padding: 40px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    thead {
      background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
      color: white;
    }
    
    th {
      padding: 20px;
      text-align: left;
      font-weight: 600;
      font-size: 1em;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    tbody tr {
      border-bottom: 1px solid #e2e8f0;
      transition: background-color 0.2s;
    }
    
    tbody tr:hover {
      background-color: #f7fafc;
    }
    
    tbody tr:last-child {
      border-bottom: none;
    }
    
    td {
      padding: 18px 20px;
      font-size: 0.95em;
    }
    
    td:first-child {
      font-weight: 600;
      color: #2d3748;
      max-width: 400px;
    }
    
    .badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.85em;
    }
    
    .badge.pasa {
      background: #c6f6d5;
      color: #22543d;
    }
    
    .badge.falla {
      background: #fed7d7;
      color: #742a2a;
    }
    
    .tiempo {
      display: block;
      font-size: 0.8em;
      color: #718096;
      margin-top: 5px;
    }
    
    .footer {
      background: #f7fafc;
      padding: 30px;
      text-align: center;
      color: #718096;
      border-top: 3px solid #e2e8f0;
    }
    
    .footer p {
      margin: 5px 0;
    }
    
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; }
      .stat-card:hover { transform: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Reporte de Automatización</h1>
      <p class="subtitle">🌐 Demoblaze.com - Pruebas E2E con Playwright</p>
      <p class="subtitle">🕐 ${fecha}</p>
    </div>
    
    <div class="stats-container">
      <div class="stat-card total">
        <div class="icon">📋</div>
        <div class="numero">${estadisticas.total}</div>
        <div class="label">Total de Pruebas</div>
      </div>
      
      <div class="stat-card pasadas">
        <div class="icon">✅</div>
        <div class="numero">${estadisticas.pasadas}</div>
        <div class="label">Pruebas Pasadas</div>
      </div>
      
      <div class="stat-card fallidas">
        <div class="icon">❌</div>
        <div class="numero">${estadisticas.fallidas}</div>
        <div class="label">Pruebas Fallidas</div>
      </div>
      
      <div class="stat-card tasa">
        <div class="icon">📈</div>
        <div class="numero">${((estadisticas.pasadas / estadisticas.total) * 100).toFixed(1)}%</div>
        <div class="label">Tasa de Éxito</div>
      </div>
    </div>
    
    <div class="tabla-container">
      <h2 style="margin-bottom: 20px; color: #2d3748;">Resultados Detallados por Navegador</h2>
      <table>
        <thead>
          <tr>
            <th>Prueba</th>
            <th>🌐 Chromium</th>
            <th>🦊 Firefox</th>
            <th>🧭 WebKit</th>
          </tr>
        </thead>
        <tbody>
`;

filas.forEach(f => {
    const chromiumClass = f.Chromium.includes('✅') ? 'pasa' : 'falla';
    const firefoxClass = f.Firefox.includes('✅') ? 'pasa' : 'falla';
    const webkitClass = f.Webkit.includes('✅') ? 'pasa' : 'falla';

    html += `
          <tr>
            <td>${f.Prueba}</td>
            <td>
              <span class="badge ${chromiumClass}">${f.Chromium}</span>
              <span class="tiempo">⏱️ ${f['Chromium Tiempo']}</span>
            </td>
            <td>
              <span class="badge ${firefoxClass}">${f.Firefox}</span>
              <span class="tiempo">⏱️ ${f['Firefox Tiempo']}</span>
            </td>
            <td>
              <span class="badge ${webkitClass}">${f.Webkit}</span>
              <span class="tiempo">⏱️ ${f['Webkit Tiempo']}</span>
            </td>
          </tr>`;
});

html += `
        </tbody>
      </table>
    </div>
    
    <div class="footer">
      <p><strong>Generado automáticamente por Playwright</strong></p>
      <p>Proyecto: Reportes Cada Una Hora | Usuario: daifer18</p>
      <p>Sitio de pruebas: https://www.demoblaze.com</p>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync("reporte.html", html, 'utf-8');
console.log('✅ HTML generado: reporte.html\n');

// ========================================
// RESUMEN FINAL
// ========================================
console.log('========================================');
console.log('   ✅ REPORTES GENERADOS EXITOSAMENTE');
console.log('========================================');
console.log(`📄 CSV:   reporte.csv`);
console.log(`📊 Excel: reporte.xlsx`);
console.log(`🎨 HTML:  reporte.html`);
console.log('========================================');
console.log(`📊 Total: ${estadisticas.total} pruebas`);
console.log(`✅ Pasadas: ${estadisticas.pasadas}`);
console.log(`❌ Fallidas: ${estadisticas.fallidas}`);
console.log(`📈 Tasa de éxito: ${((estadisticas.pasadas / estadisticas.total) * 100).toFixed(2)}%`);
console.log('========================================\n');
