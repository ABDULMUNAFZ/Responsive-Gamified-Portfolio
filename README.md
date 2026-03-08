<div align="center">

# 🚀 Responsive Gamified Developer Portfolio

**A high-performance, interactive, and gamified portfolio built to showcase development skills through engaging user experiences.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

</div>

---

## ✨ Features

- **🎮 Built-in Canvas Mini-Game (City Runner):** A fully custom HTML5 Canvas side-scrolling runner game integrated directly into the page. Features parallax scrolling, jumping/boosting mechanics, custom fox/wolf characters, and dynamic obstacles—built entirely from scratch without external game engines.
- **🌊 Silky Smooth Scrolling:** Fluid native smooth scrolling combined with scroll-triggered visual reveals.
- **✨ GSAP Animations:** Professional-grade entrance animations, staggered reveals, and parallax background elements powered by GreenSock Animation Platform.
- **📱 Fully Responsive:** Beautifully adapts to all screen sizes, from ultra-wide desktop monitors to compact mobile displays. The mini-game canvas dynamic scaling ensures it plays perfectly everywhere.
- **🎨 Modern Glassmorphism UI:** Features premium UI design touches like floating pill navbars, frosted glass cards, soft gradient lighting, and curated aesthetic color palettes (`#66BCB4` teal and `#EDC55B` gold accents).
- **⚡ Blazing Fast (Vite):** Optimized for performance, quick load times, and instantaneous hot-module replacement during development.

---

## 🛠️ Tech Stack

### Core
- **Framework:** [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom Vanilla CSS variables
- **Build Tool:** [Vite](https://vitejs.dev/)

### Animation & Interactivity
- **Scroll & Timelines:** [GSAP (GreenSock)](https://gsap.com/) (ScrollTrigger)
- **Game Engine:** Pure HTML5 `<canvas>` API (Zero Dependencies)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Quick Start

Want to run this portfolio locally? Follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/ABDULMUNAFZ/Responsive-Gamified-Portfolio.git
cd Responsive-Gamified-Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Build for production (Optional)
```bash
npm run build
```

---

## 🎮 How to play the Mini-Game

Scroll down to the **City Runner** section to play! The game is completely seamless and pauses automatically when it scrolls out of view.

**Objective:** Run as far as you can without letting the wolf catch you, and jump over the bushes, trees, stones, and barricades! 

**Desktop Controls:**
- `Space` or `↑ (Up Arrow)` to **Jump**
- `Shift` to use **Speed Boost**

**Mobile Controls:**
- `Tap` anywhere to **Jump**
- `Double Tap` anywhere to use **Speed Boost**

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI sections and smaller logic
│   ├── AboutSection.tsx # Personal bio and intro
│   ├── MiniGame.tsx     # The 100% custom HTML5 canvas runner game
│   ├── Navbar.tsx       # Floating glassmorphism navigation
│   ├── ProjectsSection.tsx 
│   ├── SkillsSection.tsx
│   └── ExperienceSection.tsx
├── pages/
│   └── Index.tsx        # Main composition mapping out the one-page flow
├── index.css            # Global Tailwind imports + custom vars & overrides
└── App.tsx              # Root app component and routing setup
```

---

<div align="center">
  <p>Built with ❤️ and a whole lot of ☕</p>
</div>

