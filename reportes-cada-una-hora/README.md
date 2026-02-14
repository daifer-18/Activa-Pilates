# 📊 Reportes Cada Una Hora - Playwright

Proyecto de automatización de pruebas con Playwright que genera reportes cada hora automáticamente.

## 🎯 Objetivo

Ejecutar pruebas automatizadas en **Demoblaze.com** cada hora y generar reportes visuales tipo matriz mostrando el estado de las pruebas en múltiples navegadores.

---

## 🚀 Características

- ✅ Pruebas automatizadas en 3 navegadores (Chromium, Firefox, WebKit)
- ✅ Generación de reportes HTML tipo matriz
- ✅ Generación de reportes en consola/texto
- ✅ Ejecución automática cada hora
- ✅ Logs de ejecución históricos

---

## 📁 Estructura del Proyecto

```
reportes-cada-una-hora/
├── tests/
│   ├── pruebas.spec.ts           # Pruebas principales
│   └── example.spec.ts            # Ejemplo de Playwright
├── generar-matriz.js              # Script para reporte HTML
├── generarReporte.js              # Script para reporte en consola
├── ejecutar-pruebas.bat           # Script batch para ejecución automática
├── crear-tarea-programada.ps1    # Script para configurar Task Scheduler
├── playwright.config.ts           # Configuración de Playwright
├── reporte-matriz.html            # 📊 Reporte HTML visual
├── reporte-consola.txt            # 📄 Reporte en texto
├── logs-ejecucion.txt             # 📝 Historial de ejecuciones
└── INSTRUCCIONES-AUTOMATIZACION.md # 📖 Guía de configuración
```

---

## 🧪 Pruebas Implementadas

### 1. Login Válido
- Abre el modal de login
- Completa credenciales (usuario: `daifer18`)
- Verifica que el usuario aparezca en el navbar

### 2. Navegación por Categorías
- Navega a la categoría "Laptops"
- Verifica que se muestren productos

### 3. Visualización de Producto
- Hace clic en un producto
- Verifica que se muestre el detalle
- Verifica que el botón "Add to cart" esté visible

---

## 🛠️ Instalación

### 1. Clonar o descargar el proyecto

```bash
cd "c:\Users\daian\OneDrive\Escritorio\Proyecto activa\reportes-cada-una-hora"
```

### 2. Instalar dependencias (si es necesario)

```bash
npm install
```

### 3. Instalar navegadores de Playwright

```bash
npx playwright install
```

---

## 📊 Uso

### Ejecutar pruebas manualmente

```bash
# Ejecutar todas las pruebas
npx playwright test

# Ejecutar solo pruebas.spec.ts
npx playwright test pruebas.spec.ts

# Ejecutar en un navegador específico
npx playwright test --project=chromium
```

### Generar reportes

```bash
# Generar reporte HTML tipo matriz
node generar-matriz.js

# Generar reporte en consola
node generarReporte.js

# Ejecutar todo (pruebas + reportes)
.\ejecutar-pruebas.bat
```

### Ver reportes

```bash
# Abrir reporte HTML
Start-Process reporte-matriz.html

# Ver reporte en texto
cat reporte-consola.txt

# Ver historial de ejecuciones
cat logs-ejecucion.txt
```

---

## ⏰ Configuración Automática (Cada Hora)

### Opción 1: Script Automático (Recomendado)

1. Abre PowerShell como Administrador
2. Ejecuta:
   ```powershell
   .\crear-tarea-programada.ps1
   ```

### Opción 2: Manual

Consulta el archivo `INSTRUCCIONES-AUTOMATIZACION.md` para instrucciones detalladas paso a paso.

---

## 📈 Resultados Actuales

```
========================================
       REPORTE POR NAVEGADOR
========================================

┌─────────────────────────────────────────────────────────────────┬───────────┬───────────┬───────────┐
│ Prueba                                                          │ chromium  │ firefox   │ webkit    │
├─────────────────────────────────────────────────────────────────┼───────────┼───────────┼───────────┤
│ Login válido - verifica que el usuario pueda iniciar sesión ... │ ✅ PASA    │ ✅ PASA    │ ✅ PASA    │
│ Navegación por categorías - valida que se muestren productos... │ ✅ PASA    │ ✅ PASA    │ ✅ PASA    │
│ Visualización de producto - verifica que se pueda ver el det... │ ✅ PASA    │ ✅ PASA    │ ✅ PASA    │
└─────────────────────────────────────────────────────────────────┴───────────┴───────────┴───────────┘

Total: 9/9 pruebas pasadas ✅
```

---

## 🔧 Comandos Útiles

### Gestión de la tarea programada

```powershell
# Ver estado de la tarea
Get-ScheduledTask -TaskName "Reportes-Playwright-Cada-Hora"

# Ejecutar manualmente
Start-ScheduledTask -TaskName "Reportes-Playwright-Cada-Hora"

# Deshabilitar
Disable-ScheduledTask -TaskName "Reportes-Playwright-Cada-Hora"

# Habilitar
Enable-ScheduledTask -TaskName "Reportes-Playwright-Cada-Hora"

# Eliminar
Unregister-ScheduledTask -TaskName "Reportes-Playwright-Cada-Hora" -Confirm:$false
```

---

## 🌐 Sitio Web de Pruebas

- **URL:** https://www.demoblaze.com
- **Tipo:** E-commerce de demostración
- **Credenciales de prueba:** 
  - Usuario: `daifer18`
  - Contraseña: `d21997a`

---

## 📝 Tecnologías Utilizadas

- **Playwright** v1.58.2 - Framework de testing
- **TypeScript** - Lenguaje de programación
- **Node.js** - Runtime de JavaScript
- **Windows Task Scheduler** - Automatización de tareas

---

## 🎯 Próximos Pasos

- [ ] Agregar más pruebas (carrito de compras, checkout, etc.)
- [ ] Implementar notificaciones por email cuando fallen pruebas
- [ ] Guardar reportes históricos con timestamp
- [ ] Crear dashboard con resultados históricos
- [ ] Integrar con CI/CD (GitHub Actions)

---

## 👤 Autor

**Daifer**
- Usuario: daifer18
- Proyecto: Activa Pilates

---

## 📄 Licencia

Este proyecto es de uso educativo y de demostración.

---

## 🆘 Soporte

Si tienes problemas:

1. Verifica que Node.js esté instalado: `node --version`
2. Verifica que Playwright esté instalado: `npx playwright --version`
3. Revisa los logs: `cat logs-ejecucion.txt`
4. Consulta la documentación: `INSTRUCCIONES-AUTOMATIZACION.md`
