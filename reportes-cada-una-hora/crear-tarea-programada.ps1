# Script para crear tarea programada en Windows
# Ejecutar como Administrador

$taskName = "Reportes-Playwright-Cada-Hora"
$scriptPath = "c:\Users\daian\OneDrive\Escritorio\Proyecto activa\reportes-cada-una-hora\ejecutar-pruebas.bat"

# Verificar si la tarea ya existe
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($existingTask) {
    Write-Host "⚠️  La tarea '$taskName' ya existe. Eliminando..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

Write-Host "📅 Creando tarea programada..." -ForegroundColor Cyan

# Crear acción (ejecutar el script batch)
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c `"$scriptPath`""

# Crear trigger (cada 1 hora)
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 1) -RepetitionDuration ([TimeSpan]::MaxValue)

# Configuración de la tarea
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# Crear la tarea programada
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description "Ejecuta pruebas de Playwright cada hora y genera reportes"

Write-Host "✅ Tarea programada creada exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Detalles de la tarea:" -ForegroundColor Cyan
Write-Host "  - Nombre: $taskName"
Write-Host "  - Frecuencia: Cada 1 hora"
Write-Host "  - Script: $scriptPath"
Write-Host ""
Write-Host "💡 Para ver la tarea, abre el 'Programador de tareas' de Windows" -ForegroundColor Yellow
Write-Host "💡 Para ejecutar manualmente: Start-ScheduledTask -TaskName '$taskName'" -ForegroundColor Yellow
