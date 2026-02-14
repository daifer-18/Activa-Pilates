const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function subirADrive() {
    console.log('☁️  Preparando subida a Google Drive...\n');

    try {
        // Verificar si existe el archivo de credenciales
        if (!fs.existsSync('credentials.json')) {
            console.log('⚠️  No se encontró el archivo credentials.json');
            console.log('\n📖 INSTRUCCIONES PARA CONFIGURAR GOOGLE DRIVE:');
            console.log('='.repeat(60));
            console.log('1. Ve a: https://console.cloud.google.com/');
            console.log('2. Crea un nuevo proyecto o selecciona uno existente');
            console.log('3. Habilita la API de Google Drive:');
            console.log('   - Busca "Google Drive API"');
            console.log('   - Haz clic en "Habilitar"');
            console.log('4. Crea credenciales:');
            console.log('   - Ve a "Credenciales" en el menú lateral');
            console.log('   - Clic en "Crear credenciales" → "Cuenta de servicio"');
            console.log('   - Completa el formulario y crea la cuenta');
            console.log('   - En la cuenta creada, ve a "Claves"');
            console.log('   - Clic en "Agregar clave" → "Crear clave nueva"');
            console.log('   - Selecciona "JSON" y descarga');
            console.log('5. Renombra el archivo descargado a "credentials.json"');
            console.log('6. Colócalo en la carpeta del proyecto');
            console.log('='.repeat(60));
            console.log('\n💡 Archivo de ejemplo creado: credentials-example.json\n');

            // Crear archivo de ejemplo
            const example = {
                "type": "service_account",
                "project_id": "tu-proyecto-id",
                "private_key_id": "tu-private-key-id",
                "private_key": "-----BEGIN PRIVATE KEY-----\\nTU_CLAVE_PRIVADA\\n-----END PRIVATE KEY-----\\n",
                "client_email": "tu-cuenta@tu-proyecto.iam.gserviceaccount.com",
                "client_id": "tu-client-id",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/tu-cuenta%40tu-proyecto.iam.gserviceaccount.com"
            };

            fs.writeFileSync('credentials-example.json', JSON.stringify(example, null, 2));

            return false;
        }

        // Autenticar con Google
        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        const drive = google.drive({ version: 'v3', auth });

        // Crear carpeta para los reportes (si no existe)
        const folderName = `Reportes Playwright - ${new Date().toLocaleDateString('es-AR').replace(/\//g, '-')}`;

        console.log(`📁 Creando carpeta: ${folderName}...`);

        const folderMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder'
        };

        const folder = await drive.files.create({
            requestBody: folderMetadata,
            fields: 'id, name'
        });

        const folderId = folder.data.id;
        console.log(`✅ Carpeta creada: ${folder.data.name} (ID: ${folderId})\n`);

        // Archivos a subir
        const archivos = [
            { nombre: 'reporte.xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', icono: '📊' },
            { nombre: 'reporte.html', mime: 'text/html', icono: '🎨' },
            { nombre: 'reporte.csv', mime: 'text/csv', icono: '📄' }
        ];

        console.log('📤 Subiendo archivos a Google Drive...\n');

        for (const archivo of archivos) {
            if (!fs.existsSync(archivo.nombre)) {
                console.log(`⚠️  Archivo no encontrado: ${archivo.nombre}`);
                continue;
            }

            const fileMetadata = {
                name: archivo.nombre,
                parents: [folderId]
            };

            const media = {
                mimeType: archivo.mime,
                body: fs.createReadStream(archivo.nombre)
            };

            const file = await drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: 'id, name, webViewLink'
            });

            console.log(`${archivo.icono} ${archivo.nombre} → Subido exitosamente`);
            console.log(`   🔗 Link: ${file.data.webViewLink || 'N/A'}`);
            console.log(`   🆔 ID: ${file.data.id}\n`);
        }

        // Hacer la carpeta compartida (opcional)
        try {
            await drive.permissions.create({
                fileId: folderId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            });

            const folderLink = await drive.files.get({
                fileId: folderId,
                fields: 'webViewLink'
            });

            console.log('========================================');
            console.log('   ✅ SUBIDA COMPLETADA');
            console.log('========================================');
            console.log(`📁 Carpeta: ${folderName}`);
            console.log(`🔗 Link de la carpeta: ${folderLink.data.webViewLink}`);
            console.log('========================================\n');
        } catch (permError) {
            console.log('⚠️  No se pudo hacer pública la carpeta (requiere permisos adicionales)');
        }

        return true;

    } catch (error) {
        console.error('❌ Error al subir a Google Drive:', error.message);

        if (error.message.includes('invalid_grant')) {
            console.error('\n💡 El archivo credentials.json puede estar corrupto o expirado.');
            console.error('   Genera nuevas credenciales desde Google Cloud Console.\n');
        } else if (error.message.includes('ENOENT')) {
            console.error('\n💡 Verifica que los archivos de reporte existan.\n');
        }

        return false;
    }
}

// Ejecutar
subirADrive();
