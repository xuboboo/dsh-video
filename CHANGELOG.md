# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/).

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
