const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Ejecutando pruebas y generando reporte...\n');

// Ejecutar las pruebas con reporter JSON
try {
    execSync('npx playwright test pruebas.spec.ts --reporter=json', {
        stdio: ['pipe', 'pipe', 'pipe'],
        encoding: 'utf-8',
        cwd: __dirname
    });
} catch (error) {
    // Capturar el output incluso si hay errores
    const output = error.stdout || error.output?.join('') || '';

    if (output) {
        // Guardar el JSON
        fs.writeFileSync('reporte-temp.json', output, 'utf-8');

        try {
            const reporteJSON = JSON.parse(output);
            generarMatriz(reporteJSON);
        } catch (parseError) {
            console.error('❌ Error al parsear JSON:', parseError.message);
            process.exit(1);
        }
    }
}

function generarMatriz(reporteJSON) {
    // Extraer información relevante
    const suites = reporteJSON.suites[0].suites;
    const fecha = new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        dateStyle: 'full',
        timeStyle: 'medium'
    });

    // Estructura para la matriz
    const matriz = {};
    const navegadores = ['chromium', 'firefox', 'webkit'];

    // Procesar cada suite (archivo de test)
    suites.forEach(suite => {
        suite.specs.forEach(spec => {
            const nombreTest = spec.title;

            if (!matriz[nombreTest]) {
                matriz[nombreTest] = {
                    chromium: { status: 'N/A', duracion: 0 },
                    firefox: { status: 'N/A', duracion: 0 },
                    webkit: { status: 'N/A', duracion: 0 }
                };
            }

            // Procesar resultados por navegador
            spec.tests.forEach(test => {
                const proyecto = test.projectName;
                const resultado = test.results[0];
                const status = resultado.status === 'passed' ? '✅ PASÓ' :
                    resultado.status === 'failed' ? '❌ FALLÓ' :
                        '⚠️ OMITIDO';
                const duracion = (resultado.duration / 1000).toFixed(2);

                if (matriz[nombreTest][proyecto]) {
                    matriz[nombreTest][proyecto] = { status, duracion };
                }
            });
        });
    });

    // Generar HTML tipo matriz
    let html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte de Pruebas - Matriz</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      font-weight: 700;
    }
    
    .header .fecha {
      font-size: 1.1em;
      opacity: 0.9;
      margin-top: 10px;
    }
    
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 30px 40px;
      background: #f7fafc;
      border-bottom: 3px solid #e2e8f0;
    }
    
    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.2s;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
    }
    
    .stat-card .numero {
      font-size: 2.5em;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .stat-card .label {
      color: #718096;
      font-size: 0.9em;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .stat-card.pasadas .numero { color: #48bb78; }
    .stat-card.fallidas .numero { color: #f56565; }
    .stat-card.total .numero { color: #4299e1; }
    
    .tabla-container {
      padding: 40px;
      overflow-x: auto;
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
      font-size: 1.1em;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    th:first-child {
      border-radius: 12px 0 0 0;
    }
    
    th:last-child {
      border-radius: 0 12px 0 0;
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
      padding: 20px;
      font-size: 1em;
    }
    
    td:first-child {
      font-weight: 600;
      color: #2d3748;
      max-width: 400px;
    }
    
    .resultado {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9em;
    }
    
    .resultado.pasado {
      background: #c6f6d5;
      color: #22543d;
    }
    
    .resultado.fallido {
      background: #fed7d7;
      color: #742a2a;
    }
    
    .duracion {
      display: block;
      font-size: 0.85em;
      color: #718096;
      margin-top: 5px;
    }
    
    .footer {
      background: #f7fafc;
      padding: 20px 40px;
      text-align: center;
      color: #718096;
      font-size: 0.9em;
      border-top: 3px solid #e2e8f0;
    }
    
    @media (max-width: 768px) {
      .header h1 {
        font-size: 1.8em;
      }
      
      .tabla-container {
        padding: 20px;
      }
      
      th, td {
        padding: 12px;
        font-size: 0.9em;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Reporte de Pruebas Automatizadas</h1>
      <p class="fecha">🕐 ${fecha}</p>
    </div>
    
    <div class="stats">
      <div class="stat-card total">
        <div class="numero">${Object.keys(matriz).length * 3}</div>
        <div class="label">Total de Pruebas</div>
      </div>
      <div class="stat-card pasadas">
        <div class="numero" id="pasadas">0</div>
        <div class="label">Pruebas Pasadas</div>
      </div>
      <div class="stat-card fallidas">
        <div class="numero" id="fallidas">0</div>
        <div class="label">Pruebas Fallidas</div>
      </div>
    </div>
    
    <div class="tabla-container">
      <table>
        <thead>
          <tr>
            <th>📝 Nombre del Test</th>
            <th>🌐 Chromium</th>
            <th>🦊 Firefox</th>
            <th>🧭 WebKit</th>
          </tr>
        </thead>
        <tbody>
`;

    let totalPasadas = 0;
    let totalFallidas = 0;

    // Generar filas de la tabla
    Object.keys(matriz).forEach(nombreTest => {
        html += `          <tr>\n`;
        html += `            <td>${nombreTest}</td>\n`;

        navegadores.forEach(nav => {
            const resultado = matriz[nombreTest][nav];
            const clase = resultado.status.includes('✅') ? 'pasado' : 'fallido';

            if (resultado.status.includes('✅')) totalPasadas++;
            if (resultado.status.includes('❌')) totalFallidas++;

            html += `            <td>
                <span class="resultado ${clase}">${resultado.status}</span>
                <span class="duracion">⏱️ ${resultado.duracion}s</span>
              </td>\n`;
        });

        html += `          </tr>\n`;
    });

    html += `
        </tbody>
      </table>
    </div>
    
    <div class="footer">
      <p>Generado automáticamente por Playwright • Demoblaze.com</p>
    </div>
  </div>
  
  <script>
    document.getElementById('pasadas').textContent = '${totalPasadas}';
    document.getElementById('fallidas').textContent = '${totalFallidas}';
  </script>
</body>
</html>
`;

    // Guardar el HTML
    fs.writeFileSync('reporte-matriz.html', html, 'utf-8');

    console.log('\n✅ Reporte tipo matriz generado exitosamente: reporte-matriz.html');
    console.log(`📊 Total de pruebas: ${Object.keys(matriz).length * 3}`);
    console.log(`✅ Pasadas: ${totalPasadas}`);
    console.log(`❌ Fallidas: ${totalFallidas}`);
}
