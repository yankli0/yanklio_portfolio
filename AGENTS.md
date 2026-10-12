# AGENTS.md

Guidance for any coding assistant working on this Astro portfolio.

## Project commands

Use mise for every project command. `mise.toml` pins Node; npm ships with that runtime. Bootstrap with `mise trust`, `mise install`, and `mise run setup`.

- `mise run dev`: development at http://localhost:4321.
- `mise run build`: production build in `dist/`.
- `mise run preview`: preview the production build.
- `mise run check`: Astro and strict TypeScript checks.
- `mise run format` / `mise run format:check`: Astro and CSS formatting.
- `mise run validate`: formatting, build, types, and `git diff --check`.
- Package maintenance: `mise exec -- npm install <package>`.

Keep npm scripts as the task implementation; do not bypass mise when running the project. Do not format Markdown content or unrelated files.

## Project skill

Read [skills/daisyui/SKILL.md](skills/daisyui/SKILL.md) before daisyUI UI work. This shared, agent-neutral skill and its references are usable by any assistant; no Codex-only installation or personal configuration is needed. Assistants without automatic skill discovery should follow this link directly.

## Structure and conventions

- `src/pages/`: About, Notes, articles, RSS, robots, and 404.
- `src/components/`: reusable Astro components; header and footer have their own folders.
- `src/layouts/`: base metadata/shell and Markdown article layout.
- `src/config/site.ts`: shared copy, navigation, social links, and fallback image.
- `src/blog/`, `src/content.config.ts`, `src/data/blog.ts`: Markdown, schema, typed date-sorted access.
- `src/styles/global.css`: Tailwind/daisyUI configuration, Garden and Forest themes, global behavior.
- `src/styles/tokens.css`: shared layout, spacing, and typography decisions.
- `src/scripts/theme.ts`: interactive theme behavior.

Use imports first in Astro frontmatter, explicit types, destructured props, relative local imports, and four-space template indentation. Let Prettier wrap Astro and CSS. Preserve semantic headings, accessible control names, and `aria-current="page"`; decorative icons use `aria-hidden="true"`.

## Design system

- Use daisyUI 5 components with Tailwind 4. Prefer `btn`, `navbar`, `menu`, `card`, `badge`, and `table` over custom imitations.
- Garden is the light theme; Forest is dark. Keep theme corner radii at `0.125rem` (2px), including buttons, badges, and cards.
- Use semantic daisyUI color roles and matching content colors. Do not reintroduce Gruvbox palettes, paper-button shadows, or raw theme colors.
- Keep layouts editorial and spacious; no Bento card grids. Use scoped CSS for component-specific layout, not duplicated component styling.
- Check existing tokens before adding repeated dimensions. Unique ASCII-art sizing may remain local.
- Use `700px` for the primary mobile breakpoint and `420px` only where narrow-phone layout requires it. Avoid horizontal overflow; mobile controls should use available width.

## Preserved product decisions

- Keep the ASCII cat and existing site content.
- Keep both disabled `???` Notes destinations until replacements are requested.
- Keep optional post images and the fallback social image.
- Keep the visible footer version as authored text.
- The current article's disabled Open button represents the already-open page and retains its pressed appearance.

## Content, metadata, and theme behavior

Published posts match `src/blog/**/[^_]*.md`. Schema fields are `title`, `pubDate`, `description`, `author`, optional `image`, and `tags`. Use `getBlogPosts()` for typed, date-sorted entries; dynamic paths use `post.id`; render via `await render(post)`.

Use `isNavigationItemActive()` rather than duplicating pathname logic. `astro.config.mjs` owns the canonical site URL; derive URLs from `Astro.site` or route context `site`. `BaseLayout.astro` owns canonical, Open Graph, Twitter, and JSON-LD metadata. Article layouts pass `pageType="article"` and optional images. Do not advertise nonfunctional search structured data.

Apply stored/system theme before paint. Keep the inline initializer and theme script consistent, including migration of legacy `light`/`dark` preferences. Theme controls must report the current state accessibly.

## Verification and workflow

- Run `mise run validate` before handoff.
- Visually check About, Notes, an article, and 404 at desktop and mobile widths when shared UI changes.
- Check horizontal overflow, keyboard focus, navigation state, mobile menu, disabled controls, both themes, persistence, and footer spacing.
- Inspect generated RSS, robots, and metadata when URL/metadata behavior changes.
- Remove temporary screenshots, scripts, and logs from the repository.
- Preserve unrelated dirty-worktree changes. Stage only the intended files.
- Clarify ambiguous broad design work before editing. Use separate meaningful commits for independent changes.
- Use the user-requested branch name (`ui-refresh` for this migration); otherwise use a separate `codex/` branch.
