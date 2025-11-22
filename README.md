# Eclipse 2026 · Experiencia AR del Mundial

![Eclipse 2026](https://img.shields.io/badge/Version-2.0-gold?style=flat-square)
![AR](https://img.shields.io/badge/AR-MindAR-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Eclipse 2026** es una experiencia de realidad aumentada inmersiva que te permite explorar estadios, trivias y contenido multimedia del Mundial FIFA 2026 escaneando marcadores oficiales.

---

## 🌟 Características

- **Visor AR**: Escanea marcadores de países participantes y despliega modelos 3D, videos y estadísticas.
- **Landing profesional**: Interfaz previa con CTAs para iniciar escaneo o explorar sin AR.
- **Trivia interactiva**: Cuestionarios temáticos con 10 preguntas por sesión y resultados compartibles.
- **Línea de tiempo histórica**: Ocho hitos clave de la Copa del Mundo con narrativa curada.
- **Panel de datos**: Métricas esenciales, récords y estadísticas actualizadas a 2024.
- **Diseño profesional**: Paleta negro/dorado, tipografía Poppins, animaciones fluidas sin emojis.

---

## 🚀 Instalación y uso

### Requisitos

- Navegador compatible con WebXR (Chrome, Safari en iOS 11+).
- Servidor local o hosting con HTTPS (requerido para acceso a cámara).

### Pasos

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/TU_USUARIO/eclipse-2026.git
   cd eclipse-2026
   ```

2. **Sirve el proyecto**:
   ```bash
   # Opción 1: Python
   python -m http.server 8080

   # Opción 2: Node.js (http-server)
   npx http-server -p 8080 -c-1
   ```

3. **Abre en el navegador**:
   ```
   http://localhost:8080/index.html
   ```

4. **Escanea un marcador**: Usa las imágenes en `banderas/` o descarga marcadores oficiales.

---

## 📂 Estructura del proyecto

```
eclipse-2026/
├── index.html              # Visor AR principal
├── ar-style.css            # Estilos del visor y overlays
├── ar-logic.js             # Lógica de detección MindAR
├── script.js               # Navegación entre páginas
├── ar-data.json            # Configuración de targets y contenido
├── historia.html/.css      # Línea de tiempo histórica
├── manual.html/.css        # Guía de uso del ecosistema
├── trivia.html/.css/.js    # Trivia interactiva
├── estadisticas.html/.css  # Panel de estadísticas
├── banderas/               # Marcadores de entrenamiento (.mind)
├── modelos/                # Archivos 3D (.glb)
└── videos/                 # Contenido multimedia
```

---

## 🛠️ Tecnologías

- **A-Frame 1.4.2**: Framework WebXR declarativo.
- **MindAR 1.2.5**: Reconocimiento de imágenes sin servidor.
- **CSS Grid & Flexbox**: Layouts responsivos.
- **Vanilla JS**: Lógica de interacción sin dependencias adicionales.

---

## 🎨 Paleta de colores

| Color          | Hex       | Uso                     |
|----------------|-----------|-------------------------|
| Negro profundo | `#030303` | Fondos principales      |
| Grafito        | `#1a1a1a` | Tarjetas y paneles      |
| Dorado         | `#d4af37` | CTAs y acentos clave    |
| Dorado intenso | `#f6d36a` | Hover y estados activos |
| Blanco         | `#f4f4f4` | Texto principal         |

---

## 📱 Compatibilidad

- ✅ **iOS 11+** (Safari, Chrome)
- ✅ **Android 8+** (Chrome, Firefox)
- ✅ **Desktop** (Chrome, Edge con webcam)

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Abre un *issue* o envía un *pull request* con mejoras, correcciones o nuevos marcadores.

---

## 📄 Licencia

Proyecto bajo licencia **MIT**. Consulta `LICENSE` para más detalles.

---

## 🔗 Enlaces

- [Documentación A-Frame](https://aframe.io/docs/)
- [MindAR Image Tracking](https://hiukim.github.io/mind-ar-js-doc/)
- [FIFA World Cup](https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup)

---

**Desarrollado para Procesamiento de Imágenes · Mundial 2026**
