# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Quick Start

Use the provided helper scripts for common tasks.

### Dark mode

The navigation bar includes a theme toggle that switches between light and dark themes.
Your preference is saved in `localStorage` and applied on page load. Users without a saved
preference will default to their system color scheme.

### Launch the dev server

For Unix based systems run:

```bash
./launch.sh
```

For Windows PowerShell run:

```powershell
./launch.ps1
```

### Deploy to GitHub Pages

For Unix based systems run:

```bash
./deploy.sh
```

For Windows PowerShell run:

```powershell
./deploy.ps1
```

These scripts will automatically install dependencies if needed before starting the server or deploying.

## Projects

MDX files in `src/data/projects` define each portfolio item. They export a
`meta` object with `title`, `summary`, `techStack`, `media`, and optional `demo`
and `repo` links. Visiting `/#/projects/:slug` renders a page with a gallery and
syntax-highlighted snippets.

The site now also includes a highlight page for the **FlameCoin** experiment at
`/flamecoin`. It showcases the genesis soulbound token and links to the
contract metadata.


## Booking System

The `/contact` page now provides a multi-step wizard to schedule demos or consultations.
Bookings are stored server-side via `pages/api/bookings.ts` and a Google Meet link
is emailed to the address provided. Environment variables required for calendar
integration are listed in `env.example`.
