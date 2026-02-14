const nodemailer = require('nodemailer');
const fs = require('fs');

async function enviarMail() {
    console.log('📧 Preparando envío de email...\n');

    // Configurar el transporter con Gmail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'daianaanabelfer1@gmail.com',
            pass: 'seisa2010anabel2010' // Nota: Usa App Password en producción
        }
    });

    // Leer estadísticas del reporte
    let estadisticas = '';
    try {
        const reporteJson = JSON.parse(fs.readFileSync('reporte-clean.json', 'utf-8'));
        let total = 0, pasadas = 0, fallidas = 0;

        reporteJson.suites.forEach(suite => {
            suite.specs.forEach(spec => {
                spec.tests.forEach(test => {
                    total++;
                    if (test.results[0].status === 'passed') pasadas++;
                    else fallidas++;
                });
            });
        });

        estadisticas = `
📊 ESTADÍSTICAS:
- Total de pruebas: ${total}
- Pruebas pasadas: ${pasadas} ✅
- Pruebas fallidas: ${fallidas} ❌
- Tasa de éxito: ${((pasadas / total) * 100).toFixed(2)}%
`;
    } catch (error) {
        estadisticas = 'No se pudieron cargar las estadísticas.';
    }

    const fecha = new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        dateStyle: 'full',
        timeStyle: 'medium'
    });

    // Configurar el email
    const mailOptions = {
        from: 'daianaanabelfer1@gmail.com',
        to: 'daianaanabelfer1@gmail.com', // Cambiar por el email del destinatario
        subject: `📊 Reporte de Automatización - ${new Date().toLocaleDateString('es-AR')}`,
        text: `
Hola,

Adjunto encontrarás el reporte automático de las pruebas de Playwright ejecutadas en Demoblaze.com.

🕐 Fecha y hora: ${fecha}
🌐 Sitio probado: https://www.demoblaze.com
🔧 Framework: Playwright
🖥️ Navegadores: Chromium, Firefox, WebKit

${estadisticas}

Los archivos adjuntos incluyen:
- 📊 reporte.xlsx (Excel con resultados y estadísticas)
- 🎨 reporte.html (Reporte visual interactivo)
- 📄 reporte.csv (Datos en formato CSV)

Saludos,
Sistema de Automatización
    `,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="margin: 0;">📊 Reporte de Automatización</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Pruebas E2E con Playwright</p>
        </div>
        
        <div style="background: white; padding: 30px; margin-top: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2d3748; margin-top: 0;">Hola,</h2>
          <p style="color: #4a5568; line-height: 1.6;">
            Adjunto encontrarás el reporte automático de las pruebas de Playwright ejecutadas en <strong>Demoblaze.com</strong>.
          </p>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0; color: #2d3748;"><strong>🕐 Fecha y hora:</strong> ${fecha}</p>
            <p style="margin: 5px 0; color: #2d3748;"><strong>🌐 Sitio probado:</strong> <a href="https://www.demoblaze.com">Demoblaze.com</a></p>
            <p style="margin: 5px 0; color: #2d3748;"><strong>🔧 Framework:</strong> Playwright</p>
            <p style="margin: 5px 0; color: #2d3748;"><strong>🖥️ Navegadores:</strong> Chromium, Firefox, WebKit</p>
          </div>
          
          <div style="background: #e6fffa; border-left: 4px solid #48bb78; padding: 15px; margin: 20px 0;">
            <pre style="margin: 0; font-family: monospace; white-space: pre-wrap;">${estadisticas}</pre>
          </div>
          
          <h3 style="color: #2d3748;">📎 Archivos Adjuntos:</h3>
          <ul style="color: #4a5568; line-height: 1.8;">
            <li>📊 <strong>reporte.xlsx</strong> - Excel con resultados y estadísticas</li>
            <li>🎨 <strong>reporte.html</strong> - Reporte visual interactivo</li>
            <li>📄 <strong>reporte.csv</strong> - Datos en formato CSV</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #718096; font-size: 12px;">
          <p>Generado automáticamente por el Sistema de Automatización</p>
          <p>Proyecto: Reportes Cada Una Hora | Usuario: daifer18</p>
        </div>
      </div>
    `,
        attachments: [
            {
                filename: 'reporte.xlsx',
                path: './reporte.xlsx'
            },
            {
                filename: 'reporte.html',
                path: './reporte.html'
            },
            {
                filename: 'reporte.csv',
                path: './reporte.csv'
            }
        ]
    };

    try {
        // Enviar el email
        let info = await transporter.sendMail(mailOptions);

        console.log('✅ Email enviado exitosamente!');
        console.log(`📧 ID del mensaje: ${info.messageId}`);
        console.log(`📬 Destinatario: ${mailOptions.to}`);
        console.log(`📎 Archivos adjuntos: 3 (Excel, HTML, CSV)\n`);

        return true;
    } catch (error) {
        console.error('❌ Error al enviar el email:', error.message);
        console.error('\n💡 Sugerencias:');
        console.error('   1. Verifica que las credenciales sean correctas');
        console.error('   2. Si usas Gmail, activa "Acceso de aplicaciones menos seguras"');
        console.error('   3. O mejor aún, usa una "Contraseña de aplicación" (App Password)');
        console.error('   4. Verifica tu conexión a internet\n');

        return false;
    }
}

// Ejecutar
enviarMail();
