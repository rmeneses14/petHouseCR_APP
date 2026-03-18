# PetHouseCR — Frontend PWA 🐾

Sitio web estático con PWA para la estética canina PetHouseCR.

## Estructura

```
PetHouseCR-APP/
├── index.html          ← PWA completa (todo en un archivo)
├── manifest.json       ← Config PWA: nombre, ícono, display standalone
├── sw.js               ← Service Worker: cache offline
├── icons/              ← Íconos PWA (generar en realfavicongenerator.net)
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   ├── icon-180x180.png  (iOS)
│   ├── icon-152x152.png  (iOS)
│   ├── icon-120x120.png  (iOS)
│   ├── icon-144x144.png  (Windows)
│   ├── icon-32x32.png
│   └── icon-16x16.png
├── Gemini_Generated_Image_4hl7sa4hl7sa4hl7.png
└── Gemini_Generated_Image_qc2u6zqc2u6zqc2u.png
```

---

## 🔧 Configuración inicial

### 1. Número de WhatsApp
En `index.html`, buscar:
```js
const WA_NUMBER = "50688887777";
```
Cambiar por el número real con código de país (ej: `50688123456`).

---

### 2. Google Sheets — Disponibilidad

#### Crear el Sheet
1. Ir a [Google Sheets](https://sheets.google.com) y crear una hoja nueva
2. En la **fila 1** poner los encabezados exactamente así:

| fecha | hora | disponible |
|-------|------|------------|

3. Agregar las filas de disponibilidad:

| fecha | hora | disponible |
|-------|------|------------|
| 2026-03-20 | 08:00 | TRUE |
| 2026-03-20 | 09:00 | TRUE |
| 2026-03-20 | 10:00 | FALSE |
| 2026-03-20 | 11:00 | TRUE |
| ... | ... | ... |

> **Formato fecha:** `YYYY-MM-DD`  
> **Formato hora:** `HH:00` (ej: `08:00`, `14:00`)  
> **Disponible:** `TRUE` = disponible · `FALSE` = ocupado

#### Publicar como CSV
1. Menú **Archivo → Compartir → Publicar en la web**
2. Seleccionar: **Hoja1** → **Valores separados por comas (.csv)**
3. Clic en **Publicar** → copiar la URL generada

#### Cifrar la URL en el código
1. Abrir el sitio desplegado en el navegador
2. Abrir DevTools → Consola
3. Ejecutar:
```js
encodeSheetUrl("PEGAR_URL_DEL_CSV_AQUI")
```
4. Copiar el valor que aparece en consola
5. En `index.html` pegar ese valor en:
```js
const SHEET_ENCODED = "EL_VALOR_COPIADO";
```

> 🔒 La URL queda cifrada con XOR+Base64 — no es visible en el HTML publicado.

---

### 3. Uso diario para la dueña
- Abrir el Google Sheet desde el celular con la app **Google Sheets**
- Cambiar `TRUE` → `FALSE` cuando una hora quede ocupada
- Cambiar `FALSE` → `TRUE` si hay una cancelación
- El sitio refleja los cambios en tiempo real (al recargar)

---

## 🚀 Despliegue en GitHub Pages

1. Crear repositorio público `PetHouseCR-APP`
2. Subir todos los archivos a la raíz
3. Ir a **Settings → Pages → Branch: main / raíz**
4. El sitio queda en: `https://TU_USUARIO.github.io/PetHouseCR-APP/`

---

## 📱 Instalar como app

**Android (Chrome):** Menú ⋮ → "Añadir a pantalla de inicio"  
**iOS (Safari):** Compartir → "Añadir a pantalla de inicio"

---

## 🎨 Íconos

Generar en [realfavicongenerator.net](https://realfavicongenerator.net):
1. Subir una imagen PNG cuadrada 512×512 (logo del negocio)
2. Descargar el ZIP
3. Renombrar/copiar los archivos a la carpeta `icons/`
