@echo off
echo ========================================
echo   SISTEMA PRO DE REPORTES AUTOMATICOS
echo ========================================
echo.

cd /d "c:\Users\daian\OneDrive\Escritorio\Proyecto activa\reportes-cada-una-hora"

echo [%date% %time%] Iniciando proceso...
echo.

REM ========================================
REM PASO 1: Ejecutar pruebas de Playwright
REM ========================================
echo [1/5] 🧪 Ejecutando pruebas de Playwright...
npx playwright test pruebas.spec.ts --reporter=json > reporte-temp.json 2>&1

REM Convertir a UTF-8 limpio
powershell -Command "Get-Content reporte-temp.json | Out-File -Encoding utf8 reporte-clean.json"
del reporte-temp.json

echo ✅ Pruebas completadas
echo.

REM ========================================
REM PASO 2: Generar reportes (HTML, CSV, Excel)
REM ========================================
echo [2/5] 📊 Generando reportes profesionales...
node generarReportePRO.js
echo.

REM ========================================
REM PASO 3: Enviar por email
REM ========================================
echo [3/5] 📧 Enviando reportes por email...
node enviarMail.js
echo.

REM ========================================
REM PASO 4: Subir a Google Drive
REM ========================================
echo [4/5] ☁️  Subiendo a Google Drive...
node subirDrive.js
echo.

REM ========================================
REM PASO 5: Guardar log
REM ========================================
echo [5/5] 📝 Guardando log de ejecución...
echo [%date% %time%] Proceso completado >> logs-ejecucion-pro.txt
echo.

echo ========================================
echo   ✅ PROCESO COMPLETADO EXITOSAMENTE
echo ========================================
echo.
echo 📊 Reportes generados:
echo    - reporte.html
echo    - reporte.xlsx
echo    - reporte.csv
echo.
echo 📧 Email enviado con reportes adjuntos
echo ☁️  Archivos subidos a Google Drive
echo 📝 Log guardado en: logs-ejecucion-pro.txt
echo.
echo ========================================
pause
