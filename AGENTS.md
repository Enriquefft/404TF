# Repo Guide for Codex Agents

Welcome to **404 Tech Found's** website project. This monorepo contains the code for our Next.js site and tooling used when we organise community events.

## 1. Project Overview
- **Framework**: Next.js 15 with React 19.
- **Runtime**: Bun (see `bun.lock`).
- **Key pages**: landing page, Deeptech Summit page, Pre‑incubation Programme page and our manifesto. These sections are still under development.
- **Authentication**: login is provided via the `better-auth` library but is only needed for event helpers.
- **Database**: PostgreSQL accessed through Drizzle ORM. Environment variables live in `.env` (see `.env.example`).
- **Internationalisation**: English and Spanish strings are in `messages/en.json` and `messages/es.json`.
- **Brand assets**: design, tone and KPIs are documented in `docs/brand.md`.
  Use that file as the single source of truth for any wording or mascot usage.
- **UI library**: the site uses [ShadCN UI](https://ui.shadcn.com/) components
  heavily, styled with TailwindCSS v4.

## 2. Development
- Install dependencies with `bun install`.
- Run the dev server with `bun dev` and open <http://localhost:3000>.
- Build for production with `bun run build` when deploying.
- All commands assume you have run `bunx lefthook install` once.

### Testing and Type‑checking
- Unit tests run with Bun using Happy DOM. Execute `bun test`.
- Type checks use TypeScript via the `bun type` script.
- Lint and format the code with `biome check`.
- Run all these checks before pushing with `bunx lefthook run pre-push`.

### Linting and Formatting
- The project uses [Biome](https://biomejs.dev). Format and lint staged files with `bunx lefthook run pre-commit`.
- Biome enforces tabs for indentation and double quotes for strings (see `biome.jsonc`).

## 3. Commit Messages
Commits are validated with **commitlint**. Use the form:

```
<type>: <short summary>

<body>
```

Valid `<type>` values are: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style` and `test` as configured in `.lefthook/commit-msg/.commitlintrc.yaml`.

## 4. Brand Voice
When editing copy or UI texts, keep the tone defined in `docs/brand.md`:
- Friendly but concise (“Maverick × Explorer” personality).
- “Building the 404 deep-tech startups of LATAM.” is the core tagline.
- Follow the Do/Don’t table for wording and keep accessibility rules (WCAG AAA contrast and alt‑text).

## 5. Where to Place Files
- Application code lives under `src/`.
- Pages are in `src/app/[locale]/` to support i18n.
- Components shared between pages reside in `src/components/`.
- Database schema is under `src/db/schema/`.
- Markdown documents for planning and events go in `docs/`.
- The file `src/styles/globals.css` is the main source of truth for all brand
  colours. Use these variables via Tailwind's `var(--color)` syntax and avoid
  hard-coding colour values in classes.

## 6. Pull Request Checklist
Before opening a PR the agent must:
1. Run `biome check`.
2. Run `bun type`.
3. Run `bun test`.
4. Run `bunx lefthook run pre-commit`.
5. Run `bunx lefthook run pre-push`.
6. Follow the commit message convention.

Happy hacking!
