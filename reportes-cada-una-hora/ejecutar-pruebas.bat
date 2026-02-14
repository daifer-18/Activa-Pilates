@echo off
echo ========================================
echo   EJECUTANDO PRUEBAS AUTOMATIZADAS
echo ========================================
echo.

cd /d "c:\Users\daian\OneDrive\Escritorio\Proyecto activa\reportes-cada-una-hora"

echo [%date% %time%] Ejecutando pruebas...
npx playwright test pruebas.spec.ts --reporter=json > reporte.json 2>&1

echo [%date% %time%] Generando reporte en consola...
node generarReporte.js

echo [%date% %time%] Generando reporte HTML...
node generar-matriz.js

echo.
echo ========================================
echo   REPORTES GENERADOS EXITOSAMENTE
echo ========================================
echo.
echo Reporte en consola: reporte-consola.txt
echo Reporte HTML: reporte-matriz.html
echo.

REM Guardar log de ejecución
echo [%date% %time%] Reportes generados >> logs-ejecucion.txt
