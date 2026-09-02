# AGENTS.md — Directrices para Agentes en Fideos Sbiroli

Este documento establece el contexto, las normas arquitectónicas, los principios de diseño y las reglas de codificación obligatorias para cualquier agente de IA que trabaje en este repositorio.

---

## 1. Contexto del Proyecto

- **Empresa:** Fideos Sbiroli.
- **Ubicación:** Cruz del Eje, Córdoba, Argentina.
- **Naturaleza:** Fábrica real de pastas secas y fideos de alta calidad con tradición familiar e innovación industrial.
- **Propósito del sitio:** Landing page institucional y comercial (B2B y B2C) de alto impacto visual que combina historia, catálogo de productos, captación de distribuidores mayoristas y puntos de venta.

---

## 2. Reglas Fundamentales de Código

1. **CERO COMENTARIOS:** No incluir comentarios explicativos, bloques comentados ni `// TODO` en el código fuente (`.ts`, `.tsx`, `.css`). El código debe ser 100% autodocumentado mediante nombres descriptivos de variables, funciones e interfaces.
2. **TypeScript Estricto:** Prohibido el uso de `any`. Tipar explícitamente props, eventos, estados y retornos. Reutilizar o extender tipos dentro de `src/types/`.
3. **Respeto a la Estructura Existente:** No crear estructuras arbitrarias. Seguir la arquitectura feature-based y component-driven ya definida.
4. **Verificación Obligatoria:** Siempre validar cambios ejecutando `npm run build` (`tsc && vite build`) para asegurar que no existan errores de tipos ni de empaquetado.

---

## 3. Política de Librerías y Dependencias

- **PROHIBIDO INSTALAR NUEVAS DEPENDENCIAS SIN CONSULTAR:** Si una tarea requiere una librería externa adicional a las existentes (`lucide-react`, `clsx`, `tailwind-merge`, `canvas-confetti`, etc.), **se debe pedir confirmación previa al usuario**, explicando el motivo y ofreciendo alternativas nativas o recomendaciones antes de proceder.
- **Priorizar soluciones nativas de React y Tailwind CSS:** Utilizar CSS nativo, Tailwind utility classes y hooks de React antes de sugerir paquetes externos.

---

## 4. Arquitectura y Organización de Archivos

```
src/
├── components/          # Componentes transversales reutilizables (Button, Modal, Card, Navbar, etc.)
│   └── [ComponentName]/
│       └── [ComponentName].tsx
├── features/            # Módulos y secciones específicas de dominio
│   ├── b2b-funnel/      # Embudo para distribuidores y mayoristas
│   ├── catalog/         # Catálogo de productos, filtros y ficha técnica
│   ├── hero/            # Sección principal de impacto
│   ├── history-story/   # Línea de tiempo y legado histórico
│   └── locations/       # Mapa / Red de distribución
├── data/                # Mock data, constantes y datos estáticos
├── types/               # Definiciones de TypeScript e interfaces
├── index.css            # Estilos globales y capas de Tailwind
├── App.tsx              # Orquestación de secciones principales
└── main.tsx             # Punto de entrada de la aplicación
```

---

## 5. Diseño, Estilos e Innovación Visual

- **Identidad Visual Diferenciadora:**
  - Paleta de marca configurada en Tailwind:
    - `sbiroli-navy` (Azul institucional profundo)
    - `sbiroli-rosso` (Rojo acento vibrante de la pasta)
    - `sbiroli-gold` (Dorado trigo/semolín premium)
    - `sbiroli-semolina` (Tonos neutros cálidos)
  - Tipografías:
    - Display / Títulos: `font-display` (Playfair Display / Serif editorial)
    - Lectura / UI: `font-sans` (Plus Jakarta Sans)
    - Datos / Métricas: `font-mono` (JetBrains Mono)
- **Innovación en UI/UX:**
  - Aplicar micro-interacciones sutiles, transiciones suaves (`transition-all duration-300`), efectos de blur/glassmorphism controlados, elevación mediante sombras personalizadas (`shadow-sbiroli-md`, `shadow-sbiroli-lg`, `shadow-sbiroli-glow-*`).
  - Cuidar la experiencia mobile-first y la responsividad total en breakpoints `sm`, `md`, `lg`, `xl`.
  - Asegurar accesibilidad (a11y): etiquetas semánticas (`<section>`, `<article>`, `<header>`, `aria-label`, foco visible).

---

## 6. Mejores Prácticas Frontend

- **Componentes Pequeños y Cohesivos:** Extraer subcomponentes si una vista supera las 150-200 líneas o tiene lógica reutilizable.
- **Manejo de Clases:** Usar `clsx` y `tailwind-merge` (o utilidades centralizadas) para la composición condicional de clases en Tailwind.
- **Rendimiento:** Evitar re-renders innecesarios; aislar estados locales dentro de sus respectivas features o componentes atómicos.

