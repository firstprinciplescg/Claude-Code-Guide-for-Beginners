# Claude Code Guide for Beginners

Interactive web guide for learning Claude Code - Anthropic's AI-powered command-line coding assistant.

## Quick Start

```bash
git clone https://github.com/firstprinciplescg/Claude-Code-Guide-for-Beginners.git
cd Claude-Code-Guide-for-Beginners
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack

- **React 18** + **Vite** - Fast development with HMR
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Netlify** - Hosting with automatic deployments

## Scripts

```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
```

## Project Structure

```
src/
├── components/ui/     # Reusable UI components
├── sections/          # Main content sections (11 interactive sections)
├── App.jsx           # Main component with navigation
└── main.jsx          # Entry point
```

## Features

- **Responsive Design** - Mobile-first with collapsible navigation
- **LLM Optimized** - User-agent detection serves markdown to AI crawlers
- **Interactive Navigation** - 11 comprehensive sections covering Claude Code
- **Modern Architecture** - Component-based with proper separation of concerns

## Deployment

Automatic deployment via Netlify on push to `main` branch. Includes:
- SPA routing support
- LLM-specific redirects for AI accessibility
- Performance optimizations

## LLM Integration

The site automatically detects AI crawlers and serves structured markdown content via `netlify.toml` redirects, making it accessible to Claude, GPT, and other AI assistants.

## License

MIT License - Free for personal and commercial use.

## Built With Claude Code

This project demonstrates AI-assisted development throughout - from initial architecture to content updates and responsive design fixes.