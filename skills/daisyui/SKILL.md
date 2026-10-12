---
name: daisyui
description: Build or update UI with daisyUI 5 and Tailwind CSS 4, including component selection, semantic colors, and theme configuration. Use for daisyUI UI work, not unrelated backend or content edits.
---

# daisyUI

This agent-neutral skill works with any assistant that can read Markdown. It adapts the [official daisyUI skill](https://daisyui.com/docs/skill/codex/) without depending on a particular editor, agent, or MCP service. Vendored reference guides come from [saadeghi/daisyui](https://github.com/saadeghi/daisyui/tree/master/skills/daisyui), retrieved 2026-10-12; their MIT license is included in `LICENSE`.

## Workflow

1. Inspect the installed versions and existing framework integration. Use daisyUI 5 with Tailwind 4; do not mix in v4 component names or Tailwind 3 configuration.
2. Read [usage](references/usage.md) and [colors](references/colors.md) before styling. Follow the user's explicit design choices over reference defaults.
3. Select components by their purpose. Read the relevant guides below before implementing; do not add a component solely because its name appears in a prompt.
4. Start with the component's actual class and semantic HTML, then use utilities for layout. Add scoped CSS only for layout or behavior that the component does not provide. Keep controls keyboard-accessible and use native disabled states.
5. Use semantic color pairs (`base-100` / `base-content`, `primary` / `primary-content`) so themes remain readable. Select themes with `data-theme`; avoid hardcoded colors or separate dark-color overrides.
6. Test responsive layout, focus, navigation state, disabled controls, and theme persistence. Follow the host project's commands and verification requirements.

## Component references

- [Buttons](references/button.md): actions and link controls.
- [Navbar](references/navbar.md), [tabs](references/tab.md), and [menu](references/menu.md): site navigation. Page-navigation tabs remain anchors with `aria-current`; reserve ARIA tab roles for actual in-page tab panels.
- [Card](references/card.md) and [hero](references/hero.md): grouped content and introductions.
- [Badge](references/badge.md): tags and status.
- [Table](references/table.md): tabular information.
- [Footer](references/footer.md): closing site information.

For other components, consult the matching current guide at https://daisyui.com/components/ before inventing class names. The vendored subset deliberately covers this project's components rather than the entire library.

## Astro integration

Install through the host project's package manager. Register `@tailwindcss/vite` in Astro's `vite.plugins`, import `tailwindcss` in the global stylesheet, and enable `@plugin "daisyui"`. Import the stylesheet from the base layout. No client framework is needed for daisyUI's CSS components.

Configure supported themes in the plugin. To adjust a built-in theme, use `@plugin "daisyui/theme"` with its existing name and only the overridden variables. The `--radius-selector`, `--radius-field`, and `--radius-box` variables control corners. Keep project-specific themes, radius choices, commands, and preserved product decisions in `AGENTS.md`, not in this reusable skill.
