# Riski Mardianto - Personal Portfolio Website

A modern, high-performance developer portfolio built with React 19, Vite, and Tailwind CSS. Designed to showcase full-stack web applications, AI engineering systems, agentic automation pipelines, and enterprise cybersecurity credentials.

---

## Overview

This portfolio website highlights production-grade software engineering projects, professional experience, academic background, and certifications. Engineered with a futuristic dark space aesthetic, glassmorphic UI elements, smooth micro-interactions, and pre-cached asset delivery for an instantaneous browsing experience.

---

## Key Features

- **Astronaut Preloader with Memory Decoding**: Custom animated CSS astronaut entrance loader paired with an asset preloader. Utilizes `img.decode()` and `Promise.allSettled` to download and decompress high-resolution project panoramas, modal photography, and vector icons into browser cache before rendering, eliminating layout shifts and image pop-in delay.
- **Interactive Expanding Project Panels**: Interactive accordion-style showcase displaying featured projects with widescreen panorama previews, tech stack badges, and unified layout frames.
- **Detailed Pop-up Modals**: Rich dialogs for Education & Academic Background (including undergraduate thesis repository), Professional Career Timeline, and Core Technical Competencies.
- **Ambient Background Audio Player**: Floating retro audio component with play/pause, seek scrub bar, 10-second skip controls, and loop functionality.
- **Custom Header & Section Navigation**: Dynamic CirTabs navigation bar, scan-text animated branding, and section scroll handling.
- **Infinite Tech Stack Marquee**: Continuous ticker highlighting proficiency across Next.js, TypeScript, Golang, Python, LangChain, PostgreSQL, Prisma, n8n, and more.
- **Responsive Dark Mode Design**: Tailored for mobile, tablet, and desktop viewports with deep slate gradients, radial particle backdrops, and animated border beams.

---

## Featured Projects

1. **BelanjaTech**
   - *Stack*: Next.js, PostgreSQL, Prisma ORM, Blockchain, ML-DSA Cryptography
   - *Description*: E-commerce platform integrating post-quantum ML-DSA digital signatures and a decentralized blockchain audit trail to guarantee non-repudiation and tamper-proof logistics tracking.

2. **KP-OWL (PT. Krakatau Posco)**
   - *Stack*: PHP, Blade, MySQL, Enterprise Architecture
   - *Description*: Corporate Learning Management System (LMS) deployed to manage employee training workflows, track onboarding metrics, and visualize completion analytics.

3. **ElevateHR**
   - *Stack*: Next.js, TypeScript, PostgreSQL, Prisma ORM
   - *Description*: Enterprise-grade Human Resource and payroll management system engineered to process sensitive personnel data, attendance tracking, and internal payroll disbursements.

4. **Dokar Platform**
   - *Stack*: Flutter, Dart, REST API, MySQL
   - *Description*: Full-stack mobile and web platform developed for administrative personnel records, document management, and public service reporting.

---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite 7 |
| **Styling & Design** | Tailwind CSS 3, Styled Components, PostCSS |
| **Animations & Motion** | Framer Motion 12, CSS3 Keyframes |
| **Icons & Typography** | React Icons (FontAwesome, SimpleIcons, Remix), Plus Jakarta Sans |
| **Audio & Media** | HTML5 Audio API, Custom Styled Controls |
| **Tooling & Code Quality** | ESLint 9, Vite HMR |

---

## Project Structure

```text
Portfolio-Website/
├── public/
├── src/
│   ├── assets/                # Optimized project screenshots, logos, audio, portraits
│   │   ├── Dokar/             # Dokar platform screenshots
│   │   ├── belanjatech.png    # BelanjaTech panorama screenshot
│   │   ├── elevatehr.png      # ElevateHR panorama screenshot
│   │   ├── profile.jpg        # Profile photo
│   │   ├── wisuda.jpg         # Academic modal portrait
│   │   └── music.mp3          # Background soundtrack
│   ├── components/            # Reusable UI components
│   │   ├── AboutCard.jsx      # Interactive summary cards for about section
│   │   ├── AboutModal.jsx     # Detail pop-up modal dialogs
│   │   ├── BackToTop.jsx      # Floating scroll-to-top circular button
│   │   ├── BorderBeam.jsx     # Animated gradient border highlight
│   │   ├── Button.jsx         # Custom interactive action button
│   │   ├── Contact.jsx        # Contact section with 'Engage' action button
│   │   ├── ExpandingPanels.jsx# Featured projects accordion panels
│   │   ├── InfiniteMarquee.jsx# Tech stack ticker component
│   │   ├── Loader.jsx         # Astronaut entrance loader animation
│   │   ├── MusicPlayer.jsx    # Custom audio player component
│   │   ├── NavTabs.jsx        # CirTabs circular navigation bar
│   │   ├── Pattern.jsx        # Starry night background canvas
│   │   ├── ResumeButton.jsx   # 'Download CV' action button
│   │   ├── ScanText.jsx       # Glowing text beam scan effect
│   │   └── TypewriterText.jsx # Dynamic cycling typewriter hero text
│   ├── App.jsx                # Core application layout, section anchors, preloader logic
│   ├── index.css              # Global styles and Tailwind directives
│   └── main.jsx               # Application DOM entry point
├── index.html                 # HTML shell and metadata
├── package.json               # Dependencies and build scripts
├── tailwind.config.js         # Tailwind theme customizations
└── vite.config.js             # Vite build configuration
```

---

## Getting Started

### Prerequisites

Ensure you have Node.js (version 18 or later) installed on your system.

```bash
node -v
npm -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/risktbh/Portfolio-Website.git
   cd Portfolio-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will run locally at `http://localhost:5173`.

### Production Build

To build the project for production deployment:

```bash
npm run build
```

This compiles optimized assets, minifies JavaScript and CSS bundles, and outputs them to the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

---

## Contact & Connect

- **Developer**: Riski Mardianto
- **Email**: [mardiantoriski5@gmail.com](mailto:mardiantoriski5@gmail.com)
- **LinkedIn**: [linkedin.com/in/riski-m](https://www.linkedin.com/in/riski-m)
- **GitHub**: [github.com/risktbh](https://github.com/risktbh)
- **WhatsApp**: [+62 815-7577-4233](https://wa.me/+6281575774233)
