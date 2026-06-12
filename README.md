# Abdullah Khalid Fadillah — Portfolio

Personal portfolio website built with React + Vite.

## Tech Stack

- **React 18** + **Vite 5**
- **react-router-dom v7** — SPA routing + page transitions
- **motion (Framer Motion v11)** — scroll & entrance animations
- **lucide-react** — icons
- Vanilla CSS (no Tailwind)

## Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   ├── Experience.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── ProjectVisual.jsx   ← SVG illustrations per project
│   ├── ProjectDiagram.jsx  ← architecture diagrams per project
│   ├── Animate.jsx         ← reusable animation wrappers
│   └── Icon.jsx
├── pages/
│   └── ProjectDetail.jsx
├── data/
│   └── portfolio.js        ← single source of truth for all content
├── hooks/
│   └── useScrollAnimation.js
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

```bash
npm install
npm run dev
# → http://localhost:5173
```

```bash
npm run build    # production build
npm run preview  # preview production build locally
```

## Customization

All content lives in one file: **`src/data/portfolio.js`**

- `about` — name, tagline, bio, email, links, avatar path
- `domains` — engineering domains with colors and icons
- `projects` — project list with details, tech stack, links
- `skills` — grouped skill cards
- `experience` — work/internship history
- `articles` — blog posts / publications

To add a profile photo, put the image in `public/images/` and set:
```js
avatar: "/images/your-photo.jpg"
```
