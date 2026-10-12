# Astro Portfolio

Personal portfolio and Markdown notes built with Astro, TypeScript, Tailwind CSS 4, and daisyUI 5. Garden and Forest themes use a muted rust accent, a retro editorial layout, and nearly square 2px corners; the original ASCII cat stays part of the home page.

The site is built as static output. There is no server adapter configured.

## Development with mise

[mise](https://mise.jdx.dev/getting-started.html) is the project entry point. It supplies the exact Node version from `mise.toml`; npm is included with Node. Install mise first (on Windows: `winget install jdx.mise`).

```sh
mise trust
mise install
mise run setup
mise run dev
```

The development server runs at http://localhost:4321. Run project commands through mise so local development and CI use the same runtime.

| Command | Purpose |
| --- | --- |
| `mise run setup` | Install locked dependencies |
| `mise run dev` | Start development server |
| `mise run build` | Generate `dist/` |
| `mise run preview` | Preview production build |
| `mise run check` | Validate Astro and TypeScript |
| `mise run format` | Format Astro and CSS |
| `mise run format:check` | Check formatting |
| `mise run validate` | Formatting, build, types, and whitespace checks |

For package maintenance, use `mise exec -- npm install <package>`. The npm scripts are implementation details used by mise tasks. Format only Astro and CSS source; do not format Markdown posts as part of UI work.

## Project structure

- `src/pages/`: Home, Notes, articles, RSS, robots, and 404.
- `src/components/`: Reusable UI components.
- `src/layouts/`: Page metadata, shell, and Markdown layout.
- `src/config/site.ts`: Copy, navigation, social links, and fallback image.
- `src/blog/`: Published Markdown posts.
- `src/styles/`: Global styles, theme setup, fonts, and layout tokens.

The canonical URL is configured in `astro.config.mjs`. Optional post images, RSS, sitemap, and fallback social metadata are supported.

## Design notes

- `src/styles/global.css` holds the daisyUI theme definitions (Garden light, Forest dark) and shared utilities. Layout and type values live in `src/styles/tokens.css`.
- Page-level headings on Home, Notes, and 404 are visually hidden `h1` elements. Each page keeps exactly one `h1` for document outline and assistive technology; article pages keep their title visible.
- Only buttons with an offset shadow press on click. `.btn-ghost` has no shadow, so it does not translate.
- The theme toggle shows a sun in the light theme and a moon in the dark theme.
- The primary nav has previous/next arrows that move between tabs; each is disabled at the corresponding end.
- Both font files are preloaded from `BaseLayout.astro` so text paints without a fallback flash.

UI work uses the shared, agent-neutral [daisyUI skill](skills/daisyui/SKILL.md). See [AGENTS.md](AGENTS.md) for project conventions.
