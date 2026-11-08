# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/).

## [2.0.1] - 2026-11-08

### Fixed

- Rewrote the director brief and four-thread prompts for DeepSeek Harness: the director is this session's agent using sub-agents (not Claude Code / Codex CLI); Codex CLI is an optional painter backend, with a fallback to any image tool available in the session.

## [2.0.0] - 2026-11-08

### Added

- Full pipeline coverage from the source workflow article: ten-stage prompt library (director brief with Codex CLI + Seedance API/model configuration, story development, story audit agent, storyboard rules, first/last-frame audit, pre-submission audit, post-production, final review, four-thread team mode), each copy-ready in Chinese and English.
- Studio cards for story & style (logline, hook, structure, art style, character sheet, palette table, music), model configuration (painter tool, Seedance model id with 720p price hints), and the four-point pre-flight check.
- Seven-section video prompt builder per shot (style / shot / composition / characters / per-second beats / sound / constraints) in both languages.
- Per-shot first/last-frame checklist (8 items) and review-decision field.
- Per-shot cost ledger: model, seconds, kept/failed, auto-priced from the Seedance model id (2.5 ≈ ¥1.5/s, 2.0 mini ≈ ¥0.5/s), project totals vs budget cap.
- "Failure modes" reference tab: the article's 20-row table of typical model failures and the phrasing that fixes them.
- Markdown export now covers the whole pipeline, including checklist state and the cost ledger.

## [1.0.0] - 2026-11-08

### Added

- Video Studio panel registered as a global entry in the Harness left sidebar (`sidebar.panellist` + keyed `main` slot).
- Projects with name, aspect ratio, target length, and budget note.
- Storyboard shots: scene description, camera/motion, painter frame prompt, Seedance video prompt.
- Shot status pipeline: draft → frames ready → video generated → final cut, with per-project done counter.
- Copy actions: single prompt, all prompts, Markdown export, and the multi-model director brief.
- Chinese and English UI with one-click toggle; default follows the browser language.
- Original SVG panel icon and localized plugin metadata (`locale/en.json`, `locale/zh.json`).
- Real-app screenshots (light theme) in `screenshots/`.
