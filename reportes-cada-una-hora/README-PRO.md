# 🚀 Sistema PRO de Reportes Automatizados con Playwright

> **Sistema empresarial de automatización de pruebas** con generación de reportes en múltiples formatos, envío automático por email, subida a Google Drive y CI/CD con GitHub Actions.

[![Playwright](https://img.shields.io/badge/Playwright-1.58.2-45ba4b?logo=playwright)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Reportes Generados](#-reportes-generados)
- [Automatización](#-automatización)
- [GitHub Actions](#-github-actions)
- [Configuración de Email](#-configuración-de-email)
- [Configuración de Google Drive](#-configuración-de-google-drive)
- [Comandos Disponibles](#-comandos-disponibles)

---

## ✨ Características

### 🎯 Funcionalidades Principales

- ✅ **Pruebas E2E** en 3 navegadores (Chromium, Firefox, WebKit)
- ✅ **Reportes Múltiples Formatos**: HTML, Excel, CSV, JSON
- ✅ **Envío Automático por Email** con archivos adjuntos
- ✅ **Subida a Google Drive** automática
- ✅ **GitHub Actions** para CI/CD
- ✅ **Ejecución Programada** cada hora (Windows Task Scheduler)
- ✅ **Logs Históricos** de todas las ejecuciones
- ✅ **Diseño Profesional** listo para presentar

### 🎨 Reportes Profesionales

- **HTML**: Reporte visual interactivo con estadísticas y gráficos
- **Excel**: Múltiples hojas con resultados y estadísticas
- **CSV**: Datos exportables para análisis
- **JSON**: Datos estructurados para integración

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Playwright** | 1.58.2 | Framework de testing E2E |
| **Node.js** | 18+ | Runtime de JavaScript |
| **TypeScript** | Latest | Lenguaje de programación |
| **xlsx** | Latest | Generación de archivos Excel |
| **json2csv** | Latest | Conversión JSON a CSV |
| **nodemailer** | Latest | Envío de emails |
| **googleapis** | Latest | Integración con Google Drive |
| **GitHub Actions** | - | CI/CD y automatización |

---

## 📁 Estructura del Proyecto

```
reportes-cada-una-hora/
├── 📂 .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions workflow
├── 📂 tests/
│   ├── pruebas.spec.ts            # ✅ Pruebas principales
│   └── example.spec.ts            # Ejemplo de Playwright
├── 📄 generarReportePRO.js        # 📊 Generador de reportes (HTML/CSV/Excel)
├── 📄 enviarMail.js               # 📧 Envío automático por email
├── 📄 subirDrive.js               # ☁️ Subida a Google Drive
├── 📄 ejecutar-sistema-pro.bat    # 🔧 Script maestro de ejecución
├── 📄 playwright.config.ts        # ⚙️ Configuración de Playwright
├── 📄 package.json                # 📦 Dependencias del proyecto
├── 📄 README-PRO.md               # 📖 Esta documentación
├── 📊 reporte.html                # Reporte HTML generado
├── 📊 reporte.xlsx                # Reporte Excel generado
├── 📊 reporte.csv                 # Reporte CSV generado
└── 📝 logs-ejecucion-pro.txt      # Historial de ejecuciones
```

---

## 🚀 Instalación

### Prerrequisitos

- **Node.js** 18 o superior
- **Git** (para GitHub Actions)
- **Cuenta de Gmail** (para envío de emails)
- **Cuenta de Google Cloud** (opcional, para Google Drive)

### Paso 1: Clonar o Descargar el Proyecto

```bash
cd "c:\Users\daian\OneDrive\Escritorio\Proyecto activa\reportes-cada-una-hora"
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Instalar Navegadores de Playwright

```bash
npx playwright install
```

---

## 💻 Uso

### Ejecución Manual

#### Opción 1: Script Maestro (Recomendado)

```bash
.\ejecutar-sistema-pro.bat
```

Este script ejecuta todo el flujo:
1. ✅ Ejecuta las pruebas de Playwright
2. ✅ Genera reportes (HTML, Excel, CSV)
3. ✅ Envía email con reportes adjuntos
4. ✅ Sube archivos a Google Drive
5. ✅ Guarda log de ejecución

#### Opción 2: Paso a Paso

```bash
# 1. Ejecutar pruebas
npx playwright test pruebas.spec.ts

# 2. Generar reportes
node generarReportePRO.js

# 3. Enviar por email
node enviarMail.js

# 4. Subir a Google Drive
node subirDrive.js
```

---

## 📊 Reportes Generados

### 1. Reporte HTML (`reporte.html`)

- **Diseño profesional** con gradientes y animaciones
- **Estadísticas visuales** (total, pasadas, fallidas, tasa de éxito)
- **Tabla interactiva** con resultados por navegador
- **Tiempos de ejecución** por cada prueba
- **Responsive design** para móviles y tablets

### 2. Reporte Excel (`reporte.xlsx`)

- **Hoja 1: Resultados** - Tabla completa con todos los tests
- **Hoja 2: Estadísticas** - Métricas y KPIs
- **Formato profesional** listo para presentar
- **Fácil de filtrar y analizar**

### 3. Reporte CSV (`reporte.csv`)

- **Formato estándar** compatible con Excel, Google Sheets
- **Fácil de importar** en otras herramientas
- **Ideal para análisis de datos**

### 4. Reporte JSON (`reporte-clean.json`)

- **Datos estructurados** para integración con otras herramientas
- **Información completa** de cada prueba
- **Formato estándar de Playwright**

---

## ⏰ Automatización

### Windows Task Scheduler

#### Configuración Automática

```powershell
# Ejecutar como Administrador
.\crear-tarea-programada.ps1
```

#### Configuración Manual

1. Abre el **Programador de Tareas** (`Win + R` → `taskschd.msc`)
2. Crea una nueva tarea básica
3. Configura para ejecutar cada hora
4. Programa: `cmd`
5. Argumentos:
   ```
   /c "c:\Users\daian\OneDrive\Escritorio\Proyecto activa\reportes-cada-una-hora\ejecutar-sistema-pro.bat"
   ```

---

## 🐙 GitHub Actions

### Características del Workflow

- ✅ **Ejecución automática cada hora** (`cron: '0 * * * *'`)
- ✅ **Ejecución en push** a main/master
- ✅ **Ejecución en Pull Requests**
- ✅ **Ejecución manual** desde GitHub UI
- ✅ **Subida de artefactos** (reportes generados)
- ✅ **Comentarios automáticos** en PRs con resultados
- ✅ **Notificaciones** de estado

### Activar GitHub Actions

1. **Sube el proyecto a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Sistema PRO de reportes"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```

2. **El workflow se activará automáticamente** en:
   - Cada hora (cron)
   - Cada push a main
   - Cada Pull Request
   - Manualmente desde Actions tab

### Ver Resultados en GitHub

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **"Actions"**
3. Selecciona un workflow run
4. Descarga los **artefactos** (reportes generados)

---

## 📧 Configuración de Email

### Opción 1: Gmail con Contraseña de Aplicación (Recomendado)

1. **Habilita la verificación en 2 pasos** en tu cuenta de Gmail
2. **Genera una contraseña de aplicación**:
   - Ve a: https://myaccount.google.com/apppasswords
   - Selecciona "Correo" y "Otro"
   - Copia la contraseña generada

3. **Edita `enviarMail.js`**:
   ```javascript
   auth: {
     user: 'tu-email@gmail.com',
     pass: 'tu-contraseña-de-aplicacion'
   }
   ```

### Opción 2: Usar Variables de Entorno

```javascript
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
```

---

## ☁️ Configuración de Google Drive

### Paso 1: Crear Proyecto en Google Cloud

1. Ve a: https://console.cloud.google.com/
2. Crea un nuevo proyecto
3. Habilita la **Google Drive API**

### Paso 2: Crear Credenciales

1. Ve a **"Credenciales"** → **"Crear credenciales"**
2. Selecciona **"Cuenta de servicio"**
3. Completa el formulario
4. En la cuenta creada, ve a **"Claves"**
5. **"Agregar clave"** → **"Crear clave nueva"** → **JSON**
6. Descarga el archivo

### Paso 3: Configurar el Proyecto

1. Renombra el archivo descargado a `credentials.json`
2. Colócalo en la carpeta raíz del proyecto
3. **¡Importante!** Agrega `credentials.json` al `.gitignore`

### Paso 4: Probar

```bash
node subirDrive.js
```

---

## 🎮 Comandos Disponibles

### Pruebas

```bash
# Ejecutar todas las pruebas
npx playwright test

# Ejecutar solo pruebas.spec.ts
npx playwright test pruebas.spec.ts

# Ejecutar en un navegador específico
npx playwright test --project=chromium

# Modo debug
npx playwright test --debug

# Modo UI
npx playwright test --ui
```

### Reportes

```bash
# Generar todos los reportes (HTML, Excel, CSV)
node generarReportePRO.js

# Abrir reporte HTML
Start-Process reporte.html

# Abrir Excel
Start-Process reporte.xlsx
```

### Email y Drive

```bash
# Enviar reportes por email
node enviarMail.js

# Subir a Google Drive
node subirDrive.js
```

### Sistema Completo

```bash
# Ejecutar todo el flujo
.\ejecutar-sistema-pro.bat
```

---

## 📈 Resultados Actuales

```
========================================
       ESTADÍSTICAS DE PRUEBAS
========================================
Total de pruebas:    9
✅ Pruebas pasadas:  9
❌ Pruebas fallidas: 0
📈 Tasa de éxito:    100%
========================================
```

### Pruebas Implementadas

1. **Login Válido** ✅
   - Abre modal de login
   - Completa credenciales
   - Verifica sesión iniciada

2. **Navegación por Categorías** ✅
   - Navega a "Laptops"
   - Verifica productos mostrados

3. **Visualización de Producto** ✅
   - Abre detalle de producto
   - Verifica información mostrada
   - Verifica botón "Add to cart"

---

## 🔐 Seguridad

### Buenas Prácticas

- ✅ **No subas credenciales** a GitHub
- ✅ Usa **variables de entorno** para datos sensibles
- ✅ Agrega `credentials.json` al `.gitignore`
- ✅ Usa **contraseñas de aplicación** en lugar de contraseñas reales
- ✅ Revisa los **permisos de Google Drive**

### Archivo `.gitignore` Recomendado

```
node_modules/
credentials.json
*.log
logs-ejecucion*.txt
reporte*.json
reporte*.html
reporte*.xlsx
reporte*.csv
test-results/
playwright-report/
```

---

## 🎯 Próximos Pasos

- [ ] Agregar más pruebas (carrito, checkout, etc.)
- [ ] Implementar dashboard con histórico de resultados
- [ ] Integrar con Slack/Teams para notificaciones
- [ ] Agregar pruebas de performance
- [ ] Implementar visual regression testing
- [ ] Crear reportes con gráficos históricos

---

## 👤 Autor

**Daifer**
- Usuario: daifer18
- Email: daianaanabelfer1@gmail.com
- Proyecto: Activa Pilates

---

## 📄 Licencia

Este proyecto es de uso educativo y profesional.

---

## 🆘 Soporte y Troubleshooting

### Problema: Email no se envía

**Solución:**
1. Verifica las credenciales en `enviarMail.js`
2. Usa una contraseña de aplicación de Gmail
3. Verifica tu conexión a internet

### Problema: Google Drive falla

**Solución:**
1. Verifica que `credentials.json` existe
2. Verifica que la API de Drive está habilitada
3. Revisa los permisos de la cuenta de servicio

### Problema: Pruebas fallan

**Solución:**
1. Verifica que los navegadores estén instalados: `npx playwright install`
2. Verifica la conexión a internet
3. Revisa los logs en `test-results/`

---

## 📞 Contacto

¿Preguntas o sugerencias? Abre un issue en GitHub o contacta al autor.

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ y ☕ por Daifer

</div>
