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

## 2. Development
- Install dependencies with `bun install`.
- Run the dev server with `bun dev` and open <http://localhost:3000>.
- Build for production with `bun run build`.
- All commands assume you have run `bunx lefthook install` once.

### Testing and Type‑checking
- Unit tests run with Bun using Happy DOM. Execute `bun test`.
- Type checks use TypeScript. Run `bunx tsc --noEmit`.
- Run both checks before pushing with `bunx lefthook run pre-push`.

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

## 6. Pull Request Checklist
Before opening a PR the agent must:
1. Run `bunx lefthook run pre-commit`.
2. Run `bunx lefthook run pre-push`.
3. Ensure all tests pass and the build succeeds.
4. Follow the commit message convention.

Happy hacking!
