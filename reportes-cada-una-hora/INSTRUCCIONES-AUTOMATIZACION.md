# ⏰ CONFIGURACIÓN DE EJECUCIÓN AUTOMÁTICA CADA HORA

## 📋 Resumen
Este documento explica cómo configurar las pruebas de Playwright para que se ejecuten automáticamente cada hora en Windows.

---

## 🚀 OPCIÓN 1: Configuración Automática (RECOMENDADA)

### Paso 1: Ejecutar el script de PowerShell

1. **Abre PowerShell como Administrador**
   - Presiona `Win + X`
   - Selecciona "Windows PowerShell (Administrador)"

2. **Navega al directorio del proyecto**
   ```powershell
   cd "c:\Users\daian\OneDrive\Escritorio\Proyecto activa\reportes-cada-una-hora"
   ```

3. **Ejecuta el script de configuración**
   ```powershell
   .\crear-tarea-programada.ps1
   ```

4. **¡Listo!** La tarea se creará automáticamente y comenzará a ejecutarse cada hora.

---

## 🔧 OPCIÓN 2: Configuración Manual

### Paso 1: Abrir el Programador de Tareas

1. Presiona `Win + R`
2. Escribe: `taskschd.msc`
3. Presiona Enter

### Paso 2: Crear Tarea Básica

1. En el panel derecho, haz clic en **"Crear tarea básica..."**
2. **Nombre:** `Reportes-Playwright-Cada-Hora`
3. **Descripción:** `Ejecuta pruebas de Playwright cada hora y genera reportes`
4. Haz clic en **"Siguiente"**

### Paso 3: Configurar el Desencadenador

1. Selecciona **"Diariamente"**
2. Haz clic en **"Siguiente"**
3. Configura la fecha y hora de inicio (hoy, ahora)
4. Haz clic en **"Siguiente"**

### Paso 4: Configurar la Acción

1. Selecciona **"Iniciar un programa"**
2. Haz clic en **"Siguiente"**
3. **Programa o script:** `cmd`
4. **Agregar argumentos:**
   ```
   /c "c:\Users\daian\OneDrive\Escritorio\Proyecto activa\reportes-cada-una-hora\ejecutar-pruebas.bat"
   ```
5. Haz clic en **"Siguiente"**

### Paso 5: Configurar Repetición Cada Hora

1. Marca la casilla **"Abrir el cuadro de diálogo Propiedades..."**
2. Haz clic en **"Finalizar"**
3. En la ventana de Propiedades:
   - Ve a la pestaña **"Desencadenadores"**
   - Selecciona el desencadenador y haz clic en **"Editar"**
   - Marca **"Repetir la tarea cada:"** y selecciona **"1 hora"**
   - En **"Durante:"** selecciona **"Indefinidamente"**
   - Haz clic en **"Aceptar"**
4. Ve a la pestaña **"Configuración"**
   - Marca **"Permitir que la tarea se ejecute a petición"**
   - Marca **"Ejecutar la tarea lo antes posible después de un inicio programado perdido"**
5. Haz clic en **"Aceptar"**

---

## ✅ Verificar que Funciona

### Ejecutar manualmente la tarea:

**Opción A: Desde PowerShell**
```powershell
Start-ScheduledTask -TaskName "Reportes-Playwright-Cada-Hora"
```

**Opción B: Desde el Programador de Tareas**
1. Busca la tarea en la lista
2. Haz clic derecho → **"Ejecutar"**

**Opción C: Ejecutar el script batch directamente**
```cmd
cd "c:\Users\daian\OneDrive\Escritorio\Proyecto activa\reportes-cada-una-hora"
ejecutar-pruebas.bat
```

---

## 📊 Archivos Generados

Cada hora se generarán automáticamente:

- ✅ `reporte-consola.txt` - Reporte en formato tabla ASCII
- ✅ `reporte-matriz.html` - Reporte visual HTML
- ✅ `reporte-clean.json` - JSON con resultados detallados
- ✅ `logs-ejecucion.txt` - Log de todas las ejecuciones

---

## 🛠️ Comandos Útiles

### Ver el estado de la tarea:
```powershell
Get-ScheduledTask -TaskName "Reportes-Playwright-Cada-Hora"
```

### Ver el historial de ejecuciones:
```powershell
Get-ScheduledTaskInfo -TaskName "Reportes-Playwright-Cada-Hora"
```

### Deshabilitar la tarea:
```powershell
Disable-ScheduledTask -TaskName "Reportes-Playwright-Cada-Hora"
```

### Habilitar la tarea:
```powershell
Enable-ScheduledTask -TaskName "Reportes-Playwright-Cada-Hora"
```

### Eliminar la tarea:
```powershell
Unregister-ScheduledTask -TaskName "Reportes-Playwright-Cada-Hora" -Confirm:$false
```

---

## 📝 Notas Importantes

1. **Asegúrate de que la PC esté encendida** para que las tareas se ejecuten
2. Los reportes se sobrescribirán cada hora con los nuevos resultados
3. El archivo `logs-ejecucion.txt` guardará un historial de todas las ejecuciones
4. Si necesitas cambiar la frecuencia, edita el desencadenador en el Programador de Tareas

---

## 🎯 Próximos Pasos

- Configura notificaciones por email cuando fallen las pruebas
- Guarda los reportes históricos con timestamp
- Integra con CI/CD (GitHub Actions, Jenkins, etc.)
- Crea dashboards con los resultados históricos
