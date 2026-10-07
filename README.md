# 🚀 Workspace Configurator (monis.rent)

An interactive 2D/3D-like workspace builder designed for web users to configure, customize, and estimate monthly rental costs for their ideal desk setups in real-time.

---

## 🛠️ Approach & Tech Choices

- **Next.js 16 (App Router) & React**: Chosen for fast client-side rendering, robust file-based routing, and optimal asset delivery.
- **Tailwind CSS & Shadcn/ui**: Applied for responsive, clean layout scaffolding, dark-themed UI aesthetics, and modular component design.
- **@dnd-kit (`@dnd-kit/core`)**: Implemented for drag-and-drop mechanics across interactive canvas slots with built-in accessibility and collision detection (`pointerWithin`).
- **SVG Layering Architecture**: Uses layered SVG assets with precise `z-index` and `pointer-events` control to mimic natural depth (desk, chair, monitors, and ambient gear).

---

## 🔮 What I'd Improve with More Time

- **Persistence & Shareable State**: Save configurations to URL query parameters or local storage to let users share or resume their custom workspace layouts.
- **Canvas Spatial Collision & Snapping**: Enhance drag collision zones with smooth magnetic snapping and auto-stacking (e.g., dual vs. triple monitor arrangements).
- **3D Interactive Preview**: Upgrade the canvas from 2D SVG layers to a interactive Three.js / React Three Fiber 3D viewport for full 360° setup visualization.
- **Dynamic Pricing Breakdown**: Add detailed itemized checkout modals, tax calculations, and rental duration options (e.g., 3, 6, 12-month plans).
