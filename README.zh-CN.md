<div align="center">

<img src="docs/hero.png" alt="dsh-video — DeepSeek Harness 的 AI 视频制片台" width="880" />

# DeepSeek Harness 的 AI 视频制片台

**像多模型团队真实协作那样规划 AI 短片——分镜、提示词、镜头流水线，离你的智能体会话只差一个侧栏面板。**

[English](README.md) · [工作流](docs/WORKFLOW.zh-CN.md) ([English](docs/WORKFLOW.md)) · [截图](screenshots/) · [更新日志](CHANGELOG.zh-CN.md) ([English](CHANGELOG.md))

`发布` **v1.0.0** · `协议` **MIT** · `主题` **[dsh-plugin](https://github.com/topics/dsh-plugin)** · `安装` **1 条命令**

[English](README.md) · 简体中文

</div>

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![dsh 插件](https://img.shields.io/badge/topic-dsh--plugin-4D6BFE?style=flat-square)](https://github.com/topics/dsh-plugin)

[English](./README.md) | 简体中文

**dsh-video** 是一个 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 插件，为 AI 视频制作工作流提供统一的操作台。它在 Harness 网页界面的左侧栏注册一个「制片台」面板，让你按照多模型协作的真实方式规划短片：导演（你的编码智能体）负责故事和提示词，画师模型（如 Codex）负责设定图与首尾帧，动画师模型（如 Seedance）负责把帧变成按秒计费的视频。

> 本插件管理的流程来自文章《Claude Code/Codex + Seedance AI 视频：从一个想法到成片的全流程》——
> 一个总导演智能体，先在文字上低成本迭代，把昂贵的视频生成留到最后。

![中文界面](screenshots/studio-zh.png)

## 为什么需要它

AI 视频很贵：重生成一个镜头按秒计费，而改一句提示词是免费的。省钱的核心纪律——**能在文字里发现的错，不要留到图上；能在图上发现的错，不要留到视频上**——需要一个落脚点。dsh-video 就是这个落脚点：分镜表、提示词库、镜头流水线，离你的智能体会话只有一个面板的距离。

## 功能

- **左侧栏入口** —— 制片台注册为 Harness 左侧栏的全局面板（与「插件」「自动化任务」并列）。
- **项目管理** —— 每部短片一个项目，含画幅、目标片长、预算备注。
- **分镜列表** —— 每个镜头可内联编辑：画面描述、机位/镜头运动、画师首尾帧提示词、Seedance 视频提示词。
- **镜头状态流水线** —— 状态一键循环：`草稿 → 首尾帧已就绪 → 视频已生成 → 已剪辑成片`，并统计项目完成进度。
- **一键复制** —— 复制单个提示词、全部提示词，或将整个分镜导出为 Markdown 交给你的智能体。
- **总导演提示词** —— 一键复制经过实战验证的「你当总导演」协作提示词，内置分工与省钱原则。
- **中英双语** —— 完整中英文界面，一键切换，默认跟随浏览器语言。
- **本地优先** —— 所有数据保存在浏览器本地（`localStorage`），无账号、无服务端、无遥测。
- **主题自适应** —— 仅使用 Harness 主题令牌（`--dsw-alias-*`）着色，自动适配明暗主题。

## 截图

| 空状态（中文） | 分镜使用中（中文） | 英文界面 |
| --- | --- | --- |
| ![空状态](screenshots/studio-zh-empty.png) | ![中文](screenshots/studio-zh.png) | ![英文](screenshots/studio-en.png) |

## 环境要求

- 正在运行的 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（桌面版或 `dsh web`）。
- 无构建步骤、无运行时依赖——插件是纯 JavaScript 的 Cordis bundle。

## 安装

使用 `dsh` 命令行安装到任意非桌面 profile：

```sh
# 首次：从内置 web 模板创建 profile
dsh video --from-default-profile web

# 从本仓库安装插件
dsh plugin --profile video add /path/to/dsh-video

# 启动界面
dsh video --no-open --host 127.0.0.1 --port 10891
```

在**桌面版** profile 中，请通过 Harness 的插件管理器（插件 → 添加 → 本地目录）安装 bundle，然后重启应用以加载新的客户端模块。

## 使用

1. 点击左侧栏全局面板中的 **dsh-video** 图标。
2. **新建项目**：命名并设置画幅 / 目标片长。
3. **添加分镜**：描述画面与运镜，写两条提示词——给画师模型的首尾帧提示词、给动画师模型的视频提示词。
4. 自上而下推进流水线：先改文字、再生帧、确认后再生成视频，随进度推进状态徽章。
5. **复制总导演提示词**到新的 Harness 会话，即可用你的智能体一键启动完整多模型工作流。

## 项目结构

```
dsh-video/
├── package.json        # Cordis bundle 清单 + dsh.client 配置
├── cordis.patch.yml    # Loader 补丁：插入 dsh-video 条目
├── index.js            # Host 侧（条目激活）
├── client.js           # Client 侧：侧栏图标、制片台面板、i18n、本地存储
├── locale/
│   ├── en.json         # 插件标题/描述（英文）
│   └── zh.json         # 插件标题/描述（中文）
├── icon.svg            # 原创面板图标
├── screenshots/        # 真机截图（浅色主题，Windows）
└── docs/               # 工作流笔记
```

**接入方式。** bundle 补丁按包名插入一个 Loader 条目。Client 侧模块注册两个槽位工厂：图标注册进 `sidebar.panellist`（左侧栏全局面板列表），完整面板以相同 id 注册进键控 `main` 槽位——点击侧栏入口时，中央区域切换为制片台。全部样式只使用 `--dsw-alias-*` 主题令牌。

## 兼容性

| | |
| --- | --- |
| Harness | 0.2.x（客户端槽位 API：`sidebar.panellist`、`main`、`__ModuleLoader__`） |
| 插件 API | Cordis bundle + 纯 JS 客户端模块 |
| 语言 | `en`、`zh` |

## 参与贡献

欢迎 Issue 与 PR。请保持客户端代码为纯 JavaScript（无构建步骤），所有可见文案经由 `client.js` 中的 i18n 字典，样式只使用 Harness 主题令牌。

## 开源协议

[MIT](./LICENSE) © 2026 dsh-video contributors

[![](https://img.shields.io/badge/powered_by-dsh-4D6BFE?style=flat-square&logo=deepseek&logoColor=white)](https://github.com/deepseek-ai/deepseek-harness)
