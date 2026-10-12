# Astro Portfolio

Personal portfolio and Markdown notes built with Astro and TypeScript.

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

- `src/pages/`: About, Notes, articles, RSS, robots, and 404.
- `src/components/`: Reusable UI components.
- `src/layouts/`: Page metadata, shell, and Markdown layout.
- `src/config/site.ts`: Copy, navigation, social links, and fallback image.
- `src/blog/`: Published Markdown posts.
- `src/styles/`: Global styles, theme setup, fonts, and layout tokens.

The canonical URL is configured in `astro.config.mjs`. Optional post images, RSS, sitemap, and fallback social metadata are supported.

UI work uses the shared, agent-neutral [daisyUI skill](skills/daisyui/SKILL.md). See [AGENTS.md](AGENTS.md) for project conventions.
