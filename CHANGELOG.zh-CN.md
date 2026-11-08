# 更新日志

本项目所有显著变更都将记录在此文件中。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循[语义化版本](https://semver.org/lang/zh-CN/)。

English version: [CHANGELOG.md](./CHANGELOG.md)

## [1.0.0] - 2026-11-08

### 新增

- 制片台面板注册为 Harness 左侧栏全局面板入口（`sidebar.panellist` + 键控 `main` 槽位）。
- 项目管理：名称、画幅、目标片长、预算备注。
- 分镜镜头：画面描述、机位/运镜、画师首尾帧提示词、Seedance 视频提示词。
- 镜头状态流水线：草稿 → 首尾帧已就绪 → 视频已生成 → 已剪辑成片，附项目完成进度统计。
- 复制操作：单条提示词、全部提示词、Markdown 导出，以及多模型「总导演提示词」。
- 中英双语界面，一键切换；默认跟随浏览器语言。
- 原创 SVG 面板图标与本地化插件元数据（`locale/en.json`、`locale/zh.json`）。
- `screenshots/` 目录中的真机截图（浅色主题）。
