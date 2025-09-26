# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workstation Sync Check

**IMPORTANT**: At the start of each session, check for and handle the WORKSTATION.md file:

1. **Check if WORKSTATION.md exists** - If it exists, read it to understand:
   - What was being worked on last
   - Any uncommitted changes
   - Which machine was last used
   - Next planned steps

2. **If WORKSTATION.md doesn't exist**, create it with:
   - Current machine identifier
   - Current git status and branch
   - Timestamp of session start
   - Any work in progress

3. **Before making changes**:
   - Always run `git pull` first
   - Check WORKSTATION.md for context from other workstation
   - Update WORKSTATION.md with your current session info

4. **End of session**:
   - Update WORKSTATION.md with current state
   - Note any uncommitted work
   - Add clear next steps for the other workstation
   - Commit and push all completed work

This helps maintain continuity when development happens across multiple computers.

**Custom Commands Available**:
- `/workstation-start` - Run at session start to sync and check status
- `/workstation-end` - Run before leaving to commit and document work
- Commands are defined in the `commands/` directory

## Project Overview

This is an interactive React-based web guide for Claude Code beginners. The project demonstrates modern web development patterns and serves as both documentation and a practical learning resource.

## Development Commands

### Essential Commands
- `npm install` - Install all project dependencies
- `npm run dev` - Start development server with hot reload (runs on http://localhost:5173)
- `npm run build` - Build production-optimized bundle
- `npm run preview` - Preview production build locally

### Build and Deployment
- The project uses Vite as the build tool with React plugin
- Production builds are optimized with Terser minification and code splitting
- Builds output to the `dist/` directory
- Manual chunks separate vendor libraries (React, React DOM) and icons (Lucide)

## Architecture

### Technology Stack
- **React 18** - Component framework with functional components and hooks
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first styling with dark mode support
- **Lucide React** - Icon library
- **Path alias**: `@/` maps to `src/` directory

### Component Structure
```
src/
├── components/ui/          # Reusable UI components (buttons, cards, etc.)
├── sections/              # Main content sections (11 tutorial sections)
├── App.jsx               # Main application with navigation and routing
└── main.jsx              # Application entry point
```

### Key Patterns
- **Lazy loading**: All section components are lazy-loaded for performance
- **Hash-based navigation**: Uses browser hash fragments for section navigation
- **Mobile-first**: Responsive design with mobile menu and touch-friendly interactions
- **Theme support**: Light/dark mode toggle with CSS custom properties
- **Scroll-based navigation**: Active section highlighting using Intersection Observer
- **Component composition**: Heavy use of compound components and props drilling

## Content Architecture

The guide is structured as 11 main sections on a single page with hash navigation:

### Hash-based Sections
1. `#introduction` - Overview and what Claude Code can do
2. `#getting-started` - Installation and setup instructions
3. `#your-first-session` - Initial usage walkthrough
4. `#core-concepts` - Fundamental concepts and terminology
5. `#essential-commands` - Core slash commands and usage
6. `#ide-integration` - VS Code and JetBrains setup
7. `#workflows` - Working with codebases and projects
8. `#best-practices` - Professional workflows and optimization
9. `#advanced` - Advanced features and automation
10. `#tutorial` - Hands-on exercises
11. `#troubleshooting` - Complete command documentation

### Navigation System
- Single-page application with all sections loaded
- Hash fragments update browser URL for shareable links
- Intersection Observer tracks active section during scroll
- Smooth scrolling with CSS `scroll-behavior: smooth`
- Mobile-friendly navigation with touch optimization

## Styling System

### Tailwind Configuration
- Uses CSS custom properties for theming
- Extended color palette with semantic color names
- Dark mode support via `class` strategy
- Custom border radius variables
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)

### Key Design Patterns
- Gradient backgrounds and glassmorphism effects
- Consistent spacing using Tailwind's spacing scale
- Card-based content layout with subtle shadows
- Smooth transitions and hover states
- Mobile-optimized touch targets (min 44px)

## Development Guidelines

### Code Conventions
- Use functional components with hooks (no class components)
- Import paths use `@/` alias for src/ directory
- Components export as default
- Use React.lazy() for code splitting
- Consistent prop destructuring and naming

### File Organization
- UI components in `components/ui/` are generic and reusable
- Section components in `sections/` contain specific content
- Each section component should be self-contained
- Assets go in `src/assets/` directory

### Performance Considerations
- All major sections are lazy-loaded
- Vendor libraries are split into separate chunks
- Images should be optimized for web
- Console logs are stripped in production builds

## Common Tasks

### Adding New Sections
1. Create new component in `src/sections/`
2. Add lazy import in `App.jsx`
3. Add section to `sections` array in App.jsx
4. Add corresponding Suspense wrapper in main content area

### Modifying Styling
- Color changes: Update CSS custom properties in `src/App.css`
- Layout changes: Modify Tailwind classes directly in components
- New utilities: Extend `tailwind.config.js`

### Content Updates
- Section content is contained within each section component
- Code examples use the `CodeBlock` component for syntax highlighting
- Interactive elements should maintain accessibility standards

## Deployment

The project is configured for Netlify deployment:
- Build command: `npm run build`
- Output directory: `dist`
- Supports automatic deployments from main branch
- Includes performance optimizations for production

## Special Features

### AI/LLM Optimization
- The site serves markdown content to AI crawlers
- User-agent detection redirects LLMs to structured content
- Multiple access points for programmatic content access

### Accessibility
- Keyboard navigation support
- Proper ARIA labels and roles
- Screen reader friendly structure
- High contrast ratios for text
- Mobile touch target optimization

## Notes for Claude Code

- This codebase demonstrates excellent practices for React development
- The component structure is modular and easy to extend
- All styling follows consistent patterns using Tailwind
- The build system is optimized for both development and production
- The content structure makes it easy to add new tutorial sections