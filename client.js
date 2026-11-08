window.__ModuleLoader__.load({
  id: 'dsh-video',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    // ---------------------------------------------------------------- i18n
    const STRINGS = {
      en: {
        title: 'Video Studio',
        subtitle: 'Story → storyboard → art → frames → video → final cut',
        lang: '中文',
        hint: 'Find errors in text before they reach an image; find errors in an image before they reach a paid video.',
        tabStudio: 'Studio',
        colNo: '#',
        tabPrompts: 'Prompt library',
        tabRef: 'Failure modes',
        project: 'Project',
        newProject: 'New project',
        deleteProject: 'Delete project',
        confirmDelete: 'Delete this project, its shots, and its cost ledger?',
        projectName: 'Project name',
        noProjects: 'No projects yet. Create one to start planning your film.',
        ratio: 'Aspect ratio',
        duration: 'Target length',
        budget: 'Budget cap (¥)',
        budgetSpent: 'Spent',
        // preflight
        preflight: 'Pre-flight check',
        preflightHint: 'Check the environment before any paid generation.',
        pfCodex: 'Painter (Codex)',
        pfFfmpeg: 'ffmpeg',
        pfPython: 'Python',
        pfArk: 'ARK_API_KEY (Seedance)',
        pfOn: 'Ready',
        pfOff: 'Missing',
        copyPreflight: 'Copy pre-flight report',
        // model config
        modelConfig: 'Model configuration',
        painterModel: 'Painter model / image tool',
        videoModel: 'Seedance model',
        priceHint: '2.5 ≈ ¥1.5/s at 720p; 2.0 mini ≈ ¥0.5/s. Use mini unless a shot truly needs 2.5.',
        // story
        storyCard: 'Story & style',
        logline: 'One-line message',
        loglineHint: 'If you cannot say it in one sentence, the story is not done.',
        hook: 'Hook (what appears at second N)',
        structure: 'Structure',
        structureHint: 'Episodic is safest — shots need no continuity. Continuous is the most fragile.',
        style: 'Art style',
        styleHint: 'Lock this before the first image; every prompt starts with it.',
        characters: 'Character sheet',
        charactersHint: 'Front/side/expressions per character. Fixed traits must state their exact position (e.g. tattoo on LEFT arm).',
        palette: 'Palette table',
        paletteHint: 'One color table per scene; convert to grayscale — if figure and background merge, redo it.',
        refSong: 'Music (title / length / BPM)',
        // shots
        shots: 'Storyboard shots',
        addShot: 'Add shot',
        scene: 'What happens (who moves which way)',
        action: 'Main action (start → end)',
        motion: 'What is moving in this shot',
        motionHint: 'Camera, focus, light, something drifting past, or a micro-gesture — at least one, or the shot is not thought through.',
        continuity: 'Link to next shot',
        camera: 'Shot size / camera / move',
        cameraHint: 'Change angle every shot; eye-level frontal at most twice per film.',
        seconds: 'Seconds (ceil + 0.5)',
        composition: 'Composition & palette',
        compositionHint: 'Head/eyes at 38% or 62% from left, never dead center; match the first frame.',
        perSecond: 'Per-second beats',
        perSecondHint: '0–0.2s frozen on first frame … last 0.3s frozen on last frame. One or two actions per shot.',
        sound: 'Sound (visible causes only)',
        framePrompt: 'First/last frame notes (painter)',
        prompt: 'Video prompt (seven sections)',
        buildPrompt: 'Assemble seven-section prompt',
        frameChecks: 'Frame checklist (zoom in and verify)',
        status: 'Status',
        copyPrompt: 'Copy prompt',
        deleteShot: 'Delete shot',
        reviewNote: 'Review decision',
        reviewNoteHint: 'Cut the tail vs regenerate: try editing/code first; only regenerate when the action itself is wrong — and change the prompt or frames first.',
        checks: [
          'Props the action needs exist in the first frame',
          'Other characters staged facing camera in the first frame',
          'Crowd does not share one pose',
          'Space reserved for the action; headroom kept',
          'Wind direction consistent across the frame',
          'Readable at phone size',
          'No stray objects when zoomed in',
          'First/last overlay: nothing drifts that should not',
        ],
        // statuses
        statusDraft: 'Draft',
        statusPlanned: 'Storyboard locked',
        statusFrames: 'Frames verified',
        statusVideo: 'Video generated',
        statusReviewed: 'Reviewed / usable',
        // ledger
        ledger: 'Cost ledger',
        ledgerHint: 'Record every submitted generation — including failures. New versions get new files; never overwrite.',
        addEntry: 'Record generation',
        entryModel: 'Model',
        entrySeconds: 'Seconds',
        entryOk: 'Kept',
        entryFail: 'Failed',
        entryCost: 'Cost ¥',
        entryNote: 'File / failure reason',
        shotCost: (ok, n, yen) => `${ok}/${n} kept · ¥${yen.toFixed(1)}`,
        emptyLedger: '',
        // project actions
        copyDirector: 'Director brief',
        exportMd: 'Export markdown',
        copied: 'Copied to clipboard',
        costSummary: (s, kept, total, yen) => `${s}s submitted · ${kept}/${total} kept · ¥${yen.toFixed(1)}`,
        emptyShots: 'No shots yet. Add your first shot below.',
        stats: (a, b) => `${a}/${b} usable`,
        promptLibraryHint: 'The full pipeline from the article, one copy per stage. Paste into a fresh agent for that stage.',
        failureHint: 'What video models get wrong, and the phrasing that works. Check prompts against this table.',
        colWrong: 'Typical failure',
        colFix: 'Write it like this',
        priceOf: (m) => (String(m).indexOf('mini') >= 0 ? 0.5 : 1.5),
      },
      zh: {
        title: 'AI 视频制片台',
        subtitle: '剧情 → 分镜 → 画风 → 首尾帧 → 视频 → 成片',
        lang: 'English',
        hint: '能在文字里发现的错，不要留到图上；能在图上发现的错，不要留到视频上。',
        tabStudio: '制片台',
        colNo: '#',
        tabPrompts: '提示词库',
        tabRef: '易错对照',
        project: '项目',
        newProject: '新建项目',
        deleteProject: '删除项目',
        confirmDelete: '确定删除该项目、分镜与费用记录吗？',
        projectName: '项目名称',
        noProjects: '还没有项目。新建一个，开始规划你的片子。',
        ratio: '画幅',
        duration: '目标片长',
        budget: '预算上限（¥）',
        budgetSpent: '已花费',
        preflight: '开工检查',
        preflightHint: '生成之前先确认环境和权限都就绪。',
        pfCodex: '画师（Codex）',
        pfFfmpeg: 'ffmpeg',
        pfPython: 'Python',
        pfArk: 'ARK_API_KEY（Seedance）',
        pfOn: '可用',
        pfOff: '缺失',
        copyPreflight: '复制开工检查报告',
        modelConfig: '模型配置',
        painterModel: '画师模型 / 生图工具',
        videoModel: 'Seedance 模型',
        priceHint: '2.5 约 ¥1.5/秒（720p）；2.0 mini 约 ¥0.5/秒。不是特别难的镜头，用 mini 就够。',
        storyCard: '剧情与画风',
        logline: '一句话主旨',
        loglineHint: '一句话说不清想表达什么，说明故事还没改好。',
        hook: '开头钩子（第几秒出现什么）',
        structure: '故事结构',
        structureHint: '首选片段式——镜头之间不用接戏，最稳；连贯式最容易穿帮。',
        style: '画风',
        styleHint: '画第一张图之前就定好；每条提示词都以它开头。',
        characters: '角色设定',
        charactersHint: '每个角色画正面、侧面、几个表情。固定特征必须写清位置（如纹身在左手臂）。',
        palette: '配色色表',
        paletteHint: '每一场单独列色表；转成黑白看一遍，人和背景分不开就要重调。',
        refSong: '配歌（歌名 / 时长 / BPM）',
        shots: '分镜列表',
        addShot: '添加分镜',
        scene: '发生什么（谁往画面哪边走）',
        action: '主要动作（起点 → 终点）',
        motion: '这个镜头是什么在动',
        motionHint: '摄影机、焦点、光线、飘过的东西、小动作——至少要有一样，否则这镜还没想好。',
        continuity: '与下一镜的衔接',
        camera: '景别 / 机位 / 运镜',
        cameraHint: '每镜换角度；全片平视正面最多两次，其余用俯拍、仰拍、过肩、透过东西拍。',
        seconds: '生成秒数（向上取整 +0.5）',
        composition: '构图与配色',
        compositionHint: '人头/眼睛落在画面 38% 或 62% 处，别放正中；要和首帧对得上。',
        perSecond: '逐秒分镜',
        perSecondHint: '0–0.2 秒静止与首帧一致……最后 0.3 秒停住与尾帧一致。每镜只写一两个主要动作。',
        sound: '声音（只写看得见原因的声音）',
        framePrompt: '首尾帧要点（给画师）',
        prompt: '视频提示词（七段式）',
        buildPrompt: '组装七段式提示词',
        frameChecks: '首尾帧检查（放大逐条核对）',
        status: '状态',
        copyPrompt: '复制提示词',
        deleteShot: '删除分镜',
        reviewNote: '复查决定',
        reviewNoteHint: '先想能不能剪掉、能不能用代码修；只有动作本身错了才重拍——且必须先改提示词或首尾帧。',
        checks: [
          '动作用到的东西首帧里必须有（杯子不能凭空冒出）',
          '别人的反应在首帧提前摆好、脸朝镜头',
          '多人同框不摆同一个姿势（避免同时动）',
          '给动作留出空间，头顶留空',
          '风向统一（围巾和床单不能各飘各的）',
          '缩小到手机大小看得清',
          '放大看没有多余的东西',
          '首尾帧叠看：不该变的地方完全一致',
        ],
        statusDraft: '草稿',
        statusPlanned: '分镜已确认',
        statusFrames: '首尾帧已核对',
        statusVideo: '视频已生成',
        statusReviewed: '已复查 / 可用',
        ledger: '费用台账',
        ledgerHint: '每一次提交过的版本都要记录——包括失败的。新版本存新文件，不覆盖、不删除旧文件。',
        addEntry: '记录一次生成',
        entryModel: '模型',
        entrySeconds: '秒数',
        entryOk: '采用',
        entryFail: '失败',
        entryCost: '费用 ¥',
        entryNote: '文件名 / 失败原因',
        shotCost: (ok, n, yen) => `采用 ${ok}/${n} · ¥${yen.toFixed(1)}`,
        emptyLedger: '',
        copyDirector: '总导演提示词',
        exportMd: '导出 Markdown',
        copied: '已复制到剪贴板',
        costSummary: (s, kept, total, yen) => `提交 ${s} 秒 · 采用 ${kept}/${total} · 约 ¥${yen.toFixed(1)}`,
        emptyShots: '还没有分镜。在下方添加第一个镜头。',
        stats: (a, b) => `可用 ${a}/${b}`,
        promptLibraryHint: '文章的完整流程，每个阶段一条，复制后发给新开的 agent 执行该阶段。',
        failureHint: '视频模型最容易犯的错和有效的写法。写提示词时对着查。',
        colWrong: '模型容易犯的错',
        colFix: '应该怎么写',
        priceOf: (m) => (String(m).indexOf('mini') >= 0 ? 0.5 : 1.5),
      },
    };

    const STATUS_KEYS = ['statusDraft', 'statusPlanned', 'statusFrames', 'statusVideo', 'statusReviewed'];

    // ------------------------------------------------- prompt library (from the article)
    const LIBRARY = [
      {
        id: 'director',
        zh: {
          title: '总导演提示词（开工发给本会话的导演智能体）',
          body: [
            '你当这支短片的总导演，全程负责，我只和你沟通。你在 DeepSeek Harness 里工作，需要审核或分工时，用子智能体（subagent）开分身，不要让我切换工具。',
            '开工前先做两件事：',
            '1. 问我：片长、画幅、总预算、要不要配乐和字幕。',
            '2. 检查画师生图工具（已安装的 Codex CLI，或本会话可用的生图能力）、ffmpeg、Python 和 ARK_API_KEY 能不能用，缺什么告诉我，缺的环节先不花钱。',
            '记住所有文件都放在一个新的项目文件夹里，命名规则：镜头号_版本_用途。',
            '分工：',
            '- 你（导演）：写故事和分镜，写所有提示词，调用其他模型，抽帧放大检查每张图和每段视频，用 ffmpeg 和 Python 写代码做后期，记录每一笔费用。',
            '- 画师：画设定图、样帧和每个镜头的首尾帧。优先用已安装的 Codex CLI；没有就用我会话里可用的生图工具，都不行就停下来告诉我。',
            '- 动画师（Seedance）：把首尾帧变成几秒钟的视频，按秒计费。',
            '- 我：选方向、确认画风、批准花钱、看动态、听声音。',
            '调用画师（已安装 Codex CLI 时）：',
            'codex exec --skip-git-repo-check -s read-only -i 参考图.png - < 提示词.txt',
            '提示词开头写：Use your image generation tool to create exactly ONE image. Do not run shell commands.',
            '画好的图在 ~/.codex/generated_images/<日志里的 session id>/。',
            '调用 Seedance：',
            'POST https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks',
            'key 在环境变量 ARK_API_KEY 里，不要打印出来。请求格式查火山方舟文档。',
            '模型选 doubao-seedance-2-5-260628（720p 约 ¥1.5/秒）或 doubao-seedance-2-0-mini-260615（720p 约 ¥0.5/秒），价格以账单为准。',
            '总原则：把错误挡在花钱之前。文字里能发现的错，不留到图上；图上能发现的错，不留到视频上。',
            '规矩：',
            '1. 我确认故事前，不画任何图。',
            '2. 我确认画风前，不画正式镜头。',
            '3. 提交视频生成前，另开一个子智能体审核提示词和图片的每个细节，它只挑错，不改文件。通过后报价，我同意才提交。',
            '4. 视频有问题，先想能不能用代码修，修不了才重拍，只拍这一镜。',
            '5. 新版本存新文件，不覆盖、不删除旧文件。',
            '6. 你看不到真正的动态，也听不到声音。没看过、没听过的东西，要明确告诉我。',
            '7. 不充值，不买额度。接口返回欠费就停，把已有的片段先粗剪给我看。',
          ].join('\n'),
        },
        en: {
          title: 'Director brief (send to this session\'s director agent)',
          body: [
            'You are the director of this short film, end to end, and I only talk to you. You work inside DeepSeek Harness: for audits and delegation, spawn sub-agents instead of making me switch tools.',
            'Before starting:',
            '1. Ask me: target length, aspect ratio, total budget, music and subtitles yes/no.',
            '2. Check that a painter image tool (an installed Codex CLI, or image generation available to this session), ffmpeg, Python, and ARK_API_KEY are available. Tell me what is missing; do not spend on a missing link.',
            'Keep all files in one new project folder. Naming: shotNo_version_purpose.',
            'Roles:',
            '- You (director): story and storyboard, all prompts, drive the other models, extract and zoom frames to inspect every image and clip, post-production with ffmpeg/Python, keep the cost ledger.',
            '- Painter: character sheet, look-dev frames, first/last frames per shot. Prefer an installed Codex CLI; otherwise use the image generation available in this session; if neither exists, stop and tell me.',
            '- Animator (Seedance): turn first/last frames into seconds of video, paid per second.',
            '- Me: direction, style approval, spending approval, watch motion, listen to sound.',
            'Calling the painter (with Codex CLI installed):',
            'codex exec --skip-git-repo-check -s read-only -i reference.png - < prompt.txt',
            'Start the prompt with: Use your image generation tool to create exactly ONE image. Do not run shell commands.',
            'Images land in ~/.codex/generated_images/<session id from the log>/.',
            'Calling Seedance:',
            'POST https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks',
            'The key is in env var ARK_API_KEY — never print it. See the Volcano Ark docs for the request format.',
            'Models: doubao-seedance-2-5-260628 (720p ≈ ¥1.5/s) or doubao-seedance-2-0-mini-260615 (720p ≈ ¥0.5/s); check your bill.',
            'Prime rule: block errors before they cost money. Text errors never reach images; image errors never reach video.',
            'Rules:',
            '1. No images until I approve the story.',
            '2. No final shots until I approve the style.',
            '3. Before any video submission, spawn a sub-agent to audit every detail of prompt and images; it only finds faults. Quote a price; I approve, then submit.',
            '4. If a clip is wrong, try code first; only then reshoot that one shot.',
            '5. New versions go to new files; never overwrite or delete old ones.',
            '6. You cannot see real motion or hear sound. Say so explicitly for anything unseen or unheard.',
            '7. Never top up credits. On arrears, stop and give me a rough cut of what exists.',
          ].join('\n'),
        },
      },
      {
        id: 'story',
        zh: {
          title: '1 · 完善剧情',
          body: [
            '我想做的片子：[一句话，或者我的初步剧情]。片长：[秒]。',
            '配歌：[歌名、时长、BPM；不配歌就删掉]。',
            '参考片：[有就写，没有就删掉]。',
            '先帮我把这个想法完善成一个完整的故事。有不清楚的地方就问我，我们一起聊，等我确认了再往下写。',
            '故事结构首选片段式，因为每个镜头之间都不用接戏，最稳。连贯式最容易穿帮，除非我要求，否则不要用。',
            '故事确定以后，展开成逐镜头的故事，要满足下面这些要求：',
            '1. 符合现实逻辑。每个转折都按现实追问一遍：为什么会这样？东西从哪来？够得着吗？现实里真会这样吗？',
            '2. 能用一句话说清想表达什么。先把这句话写出来，说不出来就说明故事还要改。',
            '3. 开头就要抓人。最抓眼球的画面放在前面，写清楚第几秒出现什么。',
            '4. 旁人的反应要像真人。每个包袱或者转折都分 3 段写：问题 → 主角怎么解决 → 旁人什么反应。反应要有先后，不能几个人同一秒做同一个动作。细节也要真实，比如人吃惊时身体会往后缩。',
            '5. 要让 AI 拍得出来。避开这些弱点：人物交叉、手拿小东西、文字、镜子和倒影、左右不对称的特征、一个镜头里换光、一个人连做三个动作、俯拍看不到脸、配角太多。',
            '如果配歌，转折对副歌，关键动作对重拍。',
          ].join('\n'),
        },
        en: {
          title: '1 · Develop the story',
          body: [
            'My film idea: [one sentence or rough plot]. Length: [seconds].',
            'Music: [title, length, BPM; delete if none]. Reference film: [if any].',
            'First develop this into a complete story. Ask me anything unclear; we discuss; I confirm before you continue.',
            'Prefer an episodic structure — shots need no continuity, the safest. Continuous is the most fragile; do not use it unless I ask.',
            'Then expand into a shot-by-shot story that meets these requirements:',
            '1. Realistic logic. Interrogate every turn: why does this happen? Where did it come from? Can they reach it? Would this really happen?',
            '2. Sayable in one sentence. Write that sentence first; if you cannot, the story needs more work.',
            '3. Hook early. Put the most striking image first, and state at which second it appears.',
            '4. Human reactions. Every beat in 3 parts: problem → how the lead solves it → how bystanders react. Reactions are sequenced, never simultaneous. Real details: a startled person leans back.',
            '5. Filmable by AI. Avoid the known weaknesses: crossing figures, small hand-held objects, text, mirrors and reflections, asymmetric features, lighting changes inside one shot, three actions in a row by one person, top-down shots hiding faces, too many extras.',
            'With music: align turns to the chorus and key actions to the beat.',
          ].join('\n'),
        },
      },
      {
        id: 'storyReview',
        zh: {
          title: '2 · 剧情审核（新开子智能体，只给故事）',
          body: [
            '这是一支短片的逐镜头故事。你是第一次看，只负责挑错，不改文件。',
            '1. 只按镜头顺序读，先写出你看懂的故事。',
            '2. 按顺序追问每个转折：为什么会这样？东西从哪来？够得着吗？现实里真会这样吗？',
            '3. 能用一句话说清想表达什么吗？',
            '4. 开头抓人吗？最抓眼球的画面放在前面了吗？',
            '5. 旁人的反应像真人吗？有没有先后？',
            '6. 哪些镜头 AI 视频模型容易拍错？（人物交叉、手拿小东西、文字、镜子和倒影、左右不对称的特征、一个镜头里换光、一个人连做三个动作、俯拍看不到脸、配角太多）',
            '每条写：镜头、问题、建议改法。没把握的写“可能”。最后写“通过”或“不通过”。',
          ].join('\n'),
        },
        en: {
          title: '2 · Story audit agent (fresh agent, story only)',
          body: [
            'Here is a shot-by-shot story. You are watching it for the first time. Only find faults; do not edit files.',
            '1. Read in shot order; first write out the story as you understood it.',
            '2. Interrogate every turn in order: why? where did it come from? reachable? would this really happen?',
            '3. Can the message be said in one sentence?',
            '4. Does the opening hook? Is the most striking image first?',
            '5. Do bystander reactions feel human? Are they sequenced?',
            '6. Which shots would AI video models get wrong? (crossing figures, small held objects, text, mirrors, asymmetric features, changing light, three actions in a row, faceless top-down shots, too many extras)',
            'For each: shot, problem, suggested fix. Mark unsure items "possibly". End with "pass" or "fail".',
          ].join('\n'),
        },
      },
      {
        id: 'storyboard',
        zh: {
          title: '3 · 分镜：镜头语言、构图与配色',
          body: [
            '把定稿的故事写成分镜表。每个镜头一行，写清楚：片中时间（配歌就按小节算）、生成秒数（片中时长向上取整，尽量多留 0.5 秒）、景别、机位、运镜、谁往哪走（写画面的左右）、靠什么表情推进、这个镜头是什么在动、怎么转到下一个镜头。',
            '如果有参考片，先逐帧看参考片，把机位、进出画比例这些都量出来，然后学习模仿。没有参考片就按下面的要求自己构思。',
            '要求：',
            '1. 每个镜头换角度。全片平视正面最多两次，其余用俯拍、仰拍、从背后、过肩、透过东西拍。',
            '2. 画面里要一直有东西在动。大多数镜头都要有人或者东西走进画面，或者走出画面。人不走动的镜头，就让别的东西动起来，比如飘过去的一张纸，或者身后走过的路人。固定机位更要让人在画面里走动，比如从远处走到近处。',
            '3. 不要连着好几个镜头都是一样大小的画面，全身、半身、脸部特写要换着来。',
            '4. 每个镜头都要写清楚是什么在动：摄影机、焦点、光线、镜头前面飘过的东西，或者人物的小动作，至少要有一样。也不要一直动，该动的地方动，该静的地方静。',
            '5. 镜头运动要有理由：跟着一个东西走，慢慢推近给特写，或者从近处慢慢拉远。',
            '6. 每一秒截图都要好看。人的头或者眼睛落在画面从左往右大约 38% 或者 62% 的位置，不要放在正中间。',
            '配色要单独设计，在画第一张图之前定好。我想要的配色：[我的喜好；没想好就给我几个方案选]。',
            '把每一场用什么颜色单独列成一张色表。',
            '最后用代码给每个镜头画一张 1920×1080 的色块草图，标出 38% 和 62% 的位置和主要的东西，拼成一张总表给我确认。再把草图转成黑白看一遍，如果人和背景区分不开，就说明明暗对比不明显，要重新调配色。',
          ].join('\n'),
        },
        en: {
          title: '3 · Storyboard: camera language, composition, palette',
          body: [
            'Turn the approved story into a storyboard table. One row per shot: story time (by bar if scored), generation seconds (ceil + 0.5 spare), shot size, camera, move, who walks which way (screen left/right), which expression advances the beat, what is moving in this shot, and how it cuts to the next.',
            'With a reference film, study it frame by frame and measure camera positions and entry/exit framing first. Otherwise compose from the rules below.',
            'Rules:',
            '1. Change the angle every shot. Eye-level frontal at most twice; otherwise high, low, from behind, over-shoulder, through objects.',
            '2. Something is always moving. Most shots need someone or something entering or leaving the frame. If people stay put, move something else: a drifting paper, a passer-by behind. Static camera demands walking figures, e.g. far to near.',
            '3. Do not repeat the same framing across consecutive shots; alternate full, medium, close-up.',
            '4. Write what is moving in every shot: camera, focus, light, something drifting past, or a micro-gesture — at least one. Contrast motion with stillness.',
            '5. Camera moves need a reason: follow a subject, push in for a close-up, or pull back from near to far.',
            '6. Every paused second should look good. Heads/eyes at about 38% or 62% from the left, never dead center.',
            'Design the palette separately before the first image. My palette: [preference; or propose options].',
            'Make one color table per scene.',
            'Finally draw a 1920×1080 color-block sketch per shot with code, marking the 38%/62% lines and main elements; combine into one sheet for my approval. Convert to grayscale: if figures merge with the background, the contrast is too weak — redo the palette.',
          ].join('\n'),
        },
      },
      {
        id: 'frameCheck',
        zh: {
          title: '5 · 首尾帧检查（画完发给 AI 逐条查）',
          body: [
            '首尾帧画完了，帮我按下面这些逐条检查，每张图都要放大看。有问题就告诉我是哪张图、哪里不对，我同意了再改。',
            '材料：[首帧]、[尾帧]、[设定图]、[这个镜头的分镜]',
            '1. 动作要用到的东西，首帧里必须有。比如后面要拿杯子，首帧里就要看得到杯子，否则杯子会凭空冒出来。',
            '2. 别人的反应要提前摆好。一段视频就是一个镜头，没法中途切过去拍别人，所以首帧里要安排好：一个人在前面做事，另一个人在后面，脸朝着镜头。',
            '3. 很多人一起出现时，不能摆同一个姿势，不然模型会让所有人同时动。',
            '4. 给动作留出空间。东西要落到、飘到的地方要提前空出来，人的头顶也要留点空。',
            '5. 风往哪边吹要统一，不能围巾往左飘，床单却往右飘。',
            '6. 缩小到手机大小看一遍，远处的人太小、看不清就要改。',
            '7. 放大看有没有多余的东西，比如多一个水壶，或者多一条奇怪的细线。',
            '8. 把首帧和尾帧叠在一起看有没有错位。不该变的地方两张图必须一样。比如墙的颜色不一样，视频里墙就会慢慢变色；杯子大了一点，视频里杯子就会慢慢变大。',
            '要改图的时候注意两点：',
            '- Codex 就算只改一小块，也会把整张图重新处理一遍。所以只改一小块时，要把改好的那一块贴回原图。',
            '- Codex 的额度用完了就等它恢复，不要买额度，也不要一次同时画太多张。',
          ].join('\n'),
        },
        en: {
          title: '5 · First/last-frame audit (send after drawing)',
          body: [
            'The first/last frames are done. Check them item by item, zooming into every image. Report image + fault; change only after I approve.',
            'Materials: [first frame], [last frame], [character sheet], [this shot of the storyboard].',
            '1. Anything the action needs must exist in the first frame — otherwise the cup materializes from nothing.',
            '2. Stage other characters early: one clip is one shot, no cutting away; in the first frame, one person acts up front, another watches behind, face to camera.',
            '3. A crowd must not share one pose, or the model moves them all simultaneously.',
            '4. Reserve space for the action where things land or drift; keep headroom.',
            '5. Wind direction is consistent — the scarf and the sheets cannot blow opposite ways.',
            '6. Shrink to phone size and re-read; distant figures too small means redo.',
            '7. Zoom in for stray objects: an extra kettle, a strange thin line.',
            '8. Overlay first and last frames: anything that should not change must be identical, or walls shift color and cups grow during the clip.',
            'When editing images, remember:',
            '- Codex reprocesses the whole image even for a small patch; paste the fixed patch back onto the original.',
            '- When Codex credits run out, wait for recovery; do not buy quota or batch too many images.',
          ].join('\n'),
        },
      },
      {
        id: 'preSubmit',
        zh: {
          title: '6 · 提交前审核（新开子智能体，只读不改）',
          body: [
            '你是审核，只读不改。这个镜头马上要提交视频生成，花的是真钱。',
            '材料：[提示词文件]、[首帧]、[尾帧]、[设定图]、[分镜表]、[配色规则]。',
            '逐项核对，放大看图：',
            '1. 提示词的每句话和两张图对得上吗？（位置、左右、颜色、人数、道具数量、衣服、表情）',
            '2. 两张图的机位、大小、背景一致吗？',
            '3. 和设定图、配色规则、前后镜头对得上吗？',
            '4. 动作现实吗？每个动作的原因写了吗？手放在哪？',
            '5. 模型可能在哪里出错？（同时动作、凭空出现、长脸、走反方向、歧义词）',
            '最后只写“通过”或“不通过”。不通过就逐条列出要改什么。',
          ].join('\n'),
        },
        en: {
          title: '6 · Pre-submission audit (fresh agent, read-only)',
          body: [
            'You are the auditor: read-only. This shot is about to be submitted for video generation with real money.',
            'Materials: [prompt file], [first frame], [last frame], [character sheet], [storyboard], [palette rules].',
            'Verify item by item, zooming into the images:',
            '1. Does every sentence of the prompt match both frames? (position, left/right, color, headcount, prop counts, clothes, expressions)',
            '2. Do the two frames share camera, scale, and background?',
            '3. Do they match the character sheet, palette rules, and neighboring shots?',
            '4. Is the action realistic? Is each action\'s cause written? Where are the hands?',
            '5. Where could the model fail? (simultaneous actions, conjured objects, growing faces, reversed directions, ambiguous words)',
            'End with exactly "pass" or "fail". If fail, list every required change.',
          ].join('\n'),
        },
      },
      {
        id: 'post',
        zh: {
          title: '8 · 后期：拼接、转场、调色、放大',
          body: [
            '用代码做后期：',
            '1. 转场：[哪一镜到哪一镜，用什么东西盖屏或带过去]。运动模糊切 8–16 份，半帧快门。',
            '2. 调色：按故事分段。只调彩度和亮度，不动色相，强调色受保护，肤色不变。不加颗粒、柔光、暗角。',
            '3. Seedance 的 mp4 按 BT.601 解码，中间文件用无损格式，交付标 BT.709。',
            '4. 放大：720p 用 lanczos 放大到 1080p，加轻微锐化。不用整段插帧。',
            '5. 按小节卡点：拍点只从原曲上测，不要在剪过的文件上测。',
            '做完抽查切点前后 3 帧。',
          ].join('\n'),
        },
        en: {
          title: '8 · Post: assembly, transitions, color, upscale',
          body: [
            'Do the post-production in code:',
            '1. Transitions: [which shot to which, covered by what]. Motion blur sliced 8–16 ways, half-frame shutter.',
            '2. Color by story section. Saturation and brightness only; hue untouched; accent colors protected; skin tones unchanged. No grain, glow, or vignette.',
            '3. Decode Seedance mp4 as BT.601; keep intermediates lossless; tag delivery BT.709.',
            '4. Upscale 720p to 1080p with lanczos plus light sharpening. No full-clip interpolation.',
            '5. Beat-sync: measure beats on the original song only, never on edited files.',
            'Spot-check 3 frames around every cut when done.',
          ].join('\n'),
        },
      },
      {
        id: 'finalReview',
        zh: {
          title: '9 · 全片复核（新开子智能体，只给成片）',
          body: [
            '这是成片：[文件]。你第一次看，我不告诉你任何结论。',
            '1. 全部解码，每镜取多张全分辨率帧，切点前后各取 3 帧。',
            '2. 先写你看懂的故事，再列看不懂的地方。',
            '3. 逐镜查：重复的动作、道具数量、穿帮、突跳、颜色跳变、脸变形、字的问题。',
            '4. 明确写出你查不了的东西（动态手感、声音）。',
            '每条写：时间、帧号、问题。分“硬伤”和“小问题”。',
          ].join('\n'),
        },
        en: {
          title: '9 · Final film review (fresh agent, cut only)',
          body: [
            'Here is the finished film: [file]. You are watching it for the first time; I give you no conclusions.',
            '1. Decode everything; take several full-resolution frames per shot, plus 3 frames either side of every cut.',
            '2. First write the story as you understood it, then list what you could not follow.',
            '3. Shot by shot: repeated actions, prop counts, continuity breaks, sudden jumps, color jumps, warped faces, text issues.',
            '4. State explicitly what you cannot check (motion feel, sound).',
            'For each: time, frame number, problem. Split into "hard defects" and "minor issues".',
          ].join('\n'),
        },
      },
      {
        id: 'fourThreads',
        zh: {
          title: '10 · 四线程模式（主做 / 审核 / 监督 / 代理）',
          body: [
            '这支片子用四线程来做。你当主做，再用子智能体开三个分身，四个一起配合，一直做到片子做完，或者账户欠费为止。',
            '我说过的话在：[本会话的对话记录，或把我的要求整理成一个文件后给我路径]。',
            '总预算：¥[金额]。',
            '分工：',
            '- 主做：就是你，负责所有制作。',
            '- 审核：开一个子智能体，只挑错，不改文件。每一步都要查，提交生成视频之前必须明确写“通过”。',
            '- 监督：开一个子智能体，读完我说过的所有话，整理成要求清单。每一步都查有没有人忘了要求，包括你。',
            '- 代理：开一个子智能体，读完我说过的所有话，整理成我的偏好。你和审核拿不准，或者要提交生成视频时，由它按我的偏好来决定，并写明依据和把握。它只能在总预算内批准提交，超过预算就停下来等我。',
            '配合的顺序：',
            '1. 你每做完一步，先交给审核，再交给监督。',
            '2. 有分歧就交给代理决定。',
            '3. 所有决定和花费都记进审核记录，我回来可以推翻任何决定。',
            '不充值，不买额度。欠费就停，先把已有的片段粗剪出来给我看。',
          ].join('\n'),
        },
        en: {
          title: '10 · Four threads (maker / auditor / supervisor / deputy)',
          body: [
            'Run this film on four threads. You are the maker; spawn three sub-agents; keep going until the film is done or the account runs dry.',
            'Everything I have said is in: [this session\'s conversation, or a requirements file you ask me for].',
            'Total budget: ¥[amount].',
            'Roles:',
            '- Maker: you, own all production.',
            '- Auditor: a sub-agent that only finds faults, never edits. Checks every step and must write "pass" before any video submission.',
            '- Supervisor: a sub-agent that reads everything I have said into a requirements checklist and verifies nobody forgot one — including you.',
            '- Deputy: a sub-agent that distills my preferences. When you or the auditor are unsure, or before submitting video generation, it decides per my preferences, citing rationale and confidence. It may only approve within the total budget; beyond that it stops and waits for me.',
            'Order of cooperation:',
            '1. After each step: first the auditor, then the supervisor.',
            '2. Disagreements go to the deputy.',
            '3. All decisions and spending land in the audit log; I can overturn any of them.',
            'Never top up credits. On arrears, stop and rough-cut what exists for me.',
          ].join('\n'),
        },
      },
    ];

    // failure-mode table (article section 5)
    const FAILURE_TABLE = [
      [['一群人同时做同一个动作', 'Crowd acts simultaneously'], ['写清楚谁先谁后：“老爸第一个……过一两秒老奶奶才……小女孩最后……”，首帧也不要摆同一个姿势', 'Sequence them: "dad first… the grandma a second later… the kid last"; and vary poses in the first frame']],
      [['本来该风做的事，人自己动手做了', 'People do what the wind should do'], ['写清楚原因，再写上“两只手从头到尾都没有碰邮包”', 'State the cause, then add "his hands never touch the mailbag"']],
      [['云、月亮、植物长出眼睛和嘴巴', 'Clouds/moon/plants grow faces'], ['不要写“卡通云”，要写“蓬松的灰白色积云，只有棉絮一样的纹理和阴影”，动作也只写它怎么移动', 'Never "cartoon cloud"; write "fluffy grey-white cumulus, only wispy texture and shadow", and only its movement']],
      [['人往反方向走', 'Character walks the wrong way'], ['方向要按画面来写：“朝画面左边走，跨过左边的店门”', 'Direction in screen terms: "walks toward screen left, past the shop door on the left"']],
      [['一句话有两种意思', 'One sentence, two readings'], ['写得更具体：“左上角石头房子的窗口里”，再加上“驾驶座一直空着”', 'Be concrete: "the window of the stone house at top left", plus "the driver seat stays empty"']],
      [['东西的数量变了', 'Object counts change'], ['把数量直接写出来：“只有一封黄信封，之后他怀里全是白信封”', 'State counts: "only one yellow envelope; later his arms are full of white ones"']],
      [['写“不要怎么样”经常没用', '"Do not X" often fails'], ['尽量改成正面的说法：“画面里一直只有首帧这几个人”', 'Phrase positively: "the frame always contains only these people from the first frame"']],
      [['模型会自己联想道具的用法', 'Model improvises prop behavior'], ['干脆不让这个道具出现在有动作的镜头里', 'Keep the prop out of shots that contain action']],
      [['东西凭空出现', 'Objects materialize'], ['只用首帧里已经有的东西', 'Use only what exists in the first frame']],
      [['东西突然飞走或瞬间移动', 'Objects teleport'], ['写清楚它是怎么动的：“顺着后脑勺往后一滑，接住，扣回头上”', 'Describe the motion path: "slides back off the head, is caught, settles back on"']],
      [['雨、帽子、纹身拍着拍着就没了', 'Rain/hats/tattoos vanish mid-clip'], ['首帧和尾帧都画上', 'Paint them into both frames']],
      [['闪电画得太写实', 'Lightning too photoreal'], ['写“云里闪一下白光”，再把开头剪掉', 'Write "a white flash inside the cloud", then trim the head']],
      [['一个镜头动作太多就乱了', 'Too many actions per shot'], ['每个镜头只写一两个主要动作', 'One or two main actions per shot']],
      [['动作的时间和写的不一样', 'Timing drifts'], ['写的时间只能算大概，多留一点时间，后期再用剪辑和变速对上节拍', 'Treat timing as approximate; leave slack and fix rhythm in editing']],
      [['镜头推得没有写的那么明显', 'Push-in weaker than written'], ['后期让 Claude 用代码再推一点', 'Push further in post with code']],
      [['人的嘴自己在动', 'Mouths move by themselves'], ['写明“人物不说话”，还动就用代码修', 'Write "nobody speaks"; fix in code if it persists']],
      [['写了“没有音乐”还是混进音乐（Seedance 2.5）', 'Music sneaks in despite "no music" (2.5)'], ['片段自带的声音不用，后期另外加', 'Discard embedded audio; add sound in post']],
      [['结尾几帧突然跳到尾帧的样子（2.5）', 'Final frames jump to the end state (2.5)'], ['后期选一张没问题的画面，后面都停在这一张', 'Freeze the ending on one good frame in post']],
      [['第一张画面特别锐（2.5）', 'First frame overly sharp (2.5)'], ['直接把这一张去掉', 'Drop that frame']],
      [['视频越到后面越暗越冷（2.0 mini）', 'Clip darkens/cools over time (2.0 mini)'], ['每条视频都按它自己的首帧把颜色调回来', 'Re-grade each clip to its own first frame']],
    ];

    // -------------------------------------------------------------- storage
    const STORE_KEY = 'dsh-video.projects.v3';
    const LANG_KEY = 'dsh-video.lang';

    function freshShot() {
      return {
        id: uid(), scene: '', action: '', motion: '', continuity: '', camera: '', seconds: '',
        composition: '', perSecond: '', sound: '', framePrompt: '', prompt: '', reviewNote: '',
        status: 0, checks: [], ledger: [],
      };
    }
    function freshProject(name) {
      return {
        id: uid(), name, ratio: '16:9', duration: '30s', budget: '',
        painterModel: 'Codex', videoModel: 'doubao-seedance-2-0-mini-260615',
        logline: '', hook: '', structure: '', style: '', characters: '', palette: '', refSong: '',
        preflight: { codex: false, ffmpeg: false, python: false, ark: false },
        shots: [],
      };
    }
    function uid() { return Math.random().toString(36).slice(2, 10); }

    function migrate(old) {
      if (!Array.isArray(old) || !old.length) return [];
      return old.map((p) => ({
        ...freshProject(p.name || 'project'),
        id: p.id, ratio: p.ratio || '16:9', duration: p.duration || '30s', budget: p.budget || '',
        preflight: p.preflight || { codex: false, ffmpeg: false, python: false, ark: false },
        shots: (p.shots || []).map((s) => ({ ...freshShot(), ...s,
          scene: s.scene || '', framePrompt: s.framePrompt || s.imagePrompt || '',
          ledger: s.ledger || [], checks: [], })),
      }));
    }
    function loadProjects() {
      try {
        const raw = localStorage.getItem(STORE_KEY);
        if (raw) return JSON.parse(raw);
        const v2 = JSON.parse(localStorage.getItem('dsh-video.projects.v2') || 'null');
        if (v2) return migrate(v2);
        const v1 = JSON.parse(localStorage.getItem('dsh-video.projects.v1') || 'null');
        if (v1) return migrate(v1);
      } catch (e) { /* ignore */ }
      return [];
    }
    function saveProjects(projects) {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(projects)); } catch (e) { /* ignore */ }
    }
    function loadLang() {
      try {
        const saved = localStorage.getItem(LANG_KEY);
        if (saved === 'en' || saved === 'zh') return saved;
      } catch (e) { /* ignore */ }
      return (navigator.language || 'en').toLowerCase().startsWith('zh') ? 'zh' : 'en';
    }
    function copyText(text, setToast) {
      const done = () => setToast(true);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        document.body.removeChild(ta); done();
      }
    }

    // seven-section video prompt (article section 5)
    function buildSeven(project, s, lang) {
      const zh = lang === 'zh';
      const style = project.style || (zh ? '[画风待定]' : '[style TBD]');
      const secs = s.seconds || (zh ? '[X]' : '[X]');
      const cam = s.camera || (zh ? '[景别]，[机位]，[运镜]' : '[size], [camera], [move]');
      const comp = s.composition || (zh ? '[人和东西的位置；墙与光的颜色]' : '[placement; wall and light colors]');
      const chars = project.characters || (zh ? '[人物长相、衣服、固定道具]' : '[looks, clothes, fixed props]');
      const beats = s.perSecond || (zh ? '[每一段：谁做什么，表情怎么变，手放在哪]' : '[each beat: who does what, expression, hands]');
      const sound = s.sound || (zh ? '[看得见原因的声音]' : '[sounds with visible causes]');
      const L = [];
      L.push(zh ? `【画风】${style}。整段的画风、颜色、人物设计与首帧和尾帧完全一致。` : `[STYLE] ${style}. Style, colors, and character design match the first and last frames exactly.`);
      L.push(zh ? `【镜头】整段 ${secs} 秒，${cam}。` : `[SHOT] ${secs} seconds total, ${cam}.`);
      L.push(zh ? `【构图与配色】${comp}` : `[COMPOSITION & PALETTE] ${comp}`);
      L.push(zh ? `【人物】${chars}` : `[CHARACTERS] ${chars}`);
      L.push(zh ? '【逐秒】' : '[SECOND BY SECOND]');
      L.push(zh ? '0–0.2 秒：画面完全静止，和首帧一模一样。' : '0–0.2s: the frame is completely still, identical to the first frame.');
      if (s.action) L.push((zh ? '' : '') + s.action);
      if (s.scene && s.scene !== s.action) L.push(s.scene);
      L.push(beats);
      L.push(zh ? '最后 0.3 秒：所有人完全停住，画面与尾帧完全一致。' : 'Last 0.3s: everyone is fully still, identical to the last frame.');
      L.push(zh ? `【声音】只有${sound}。人物不说话。` : `[SOUND] Only ${sound}. Nobody speaks.`);
      L.push(zh ? '【约束】画面里一直只有首帧这几个人和这些东西，脸和身形全程不变，一镜到底。画面干干净净，没有文字、字幕、水印。' : '[CONSTRAINTS] The frame always contains only the people and objects from the first frame; faces and bodies never change; one continuous shot. Clean frame: no text, subtitles, or watermarks.');
      return L.join('\n');
    }

    function entryCost(t, e) {
      const rate = t.priceOf(e.model || '');
      return (Number(e.seconds) || 0) * rate;
    }
    function shotCostYen(t, s) {
      return (s.ledger || []).reduce((a, e) => a + entryCost(t, e), 0);
    }

    function toMarkdown(project, t, lang) {
      const L = [];
      L.push(`# ${project.name}`, '');
      L.push(`- ${t.ratio}: ${project.ratio || '-'} | ${t.duration}: ${project.duration || '-'} | ${t.budget}: ${project.budget || '-'}`);
      L.push(`- ${t.painterModel}: ${project.painterModel || '-'} | ${t.videoModel}: ${project.videoModel || '-'}`);
      L.push('', `## ${t.storyCard}`, '');
      L.push(`- ${t.logline}: ${project.logline || '-'}`);
      L.push(`- ${t.hook}: ${project.hook || '-'}`);
      L.push(`- ${t.structure}: ${project.structure || '-'}`);
      L.push(`- ${t.style}: ${project.style || '-'}`);
      L.push(`- ${t.characters}: ${project.characters || '-'}`);
      L.push(`- ${t.palette}: ${project.palette || '-'}`);
      L.push(`- ${t.refSong}: ${project.refSong || '-'}`);
      const pf = project.preflight || {};
      L.push('', `## ${t.preflight}`, '');
      ['codex', 'ffmpeg', 'python', 'ark'].forEach((k) => L.push(`- ${t['pf' + k[0].toUpperCase() + k.slice(1)]}: ${pf[k] ? t.pfOn : t.pfOff}`));
      L.push('', `## ${t.shots}`, '');
      let sumYen = 0, sumOk = 0, sumAll = 0;
      project.shots.forEach((s, i) => {
        L.push(`### ${t.colNo} ${i + 1} — ${t[STATUS_KEYS[s.status]]}`, '');
        [['scene', t.scene], ['action', t.action], ['motion', t.motion], ['continuity', t.continuity],
         ['camera', t.camera], ['seconds', t.seconds], ['composition', t.composition],
         ['perSecond', t.perSecond], ['sound', t.sound], ['framePrompt', t.framePrompt]].forEach(([k, label]) => {
          if (s[k]) L.push(`- ${label}: ${s[k]}`);
        });
        L.push(`- ${t.prompt}:`, '```', s.prompt || '', '```');
        const checks = (s.checks || []).map((idx) => t.checks[idx]).filter(Boolean);
        if (checks.length) L.push(`- ${t.frameChecks}:`, ...checks.map((c) => `  - [x] ${c}`));
        if (s.reviewNote) L.push(`- ${t.reviewNote}: ${s.reviewNote}`);
        const ledger = s.ledger || [];
        if (ledger.length) {
          L.push(`- ${t.ledger}:`);
          ledger.forEach((e) => {
            sumYen += entryCost(t, e); sumAll += 1; if (e.ok) sumOk += 1;
            L.push(`  - [${e.ok ? 'OK' : 'FAIL'}] ${e.model || '-'} / ${e.seconds || 0}s / ¥${entryCost(t, e).toFixed(1)} — ${e.note || ''}`);
          });
        }
        L.push('');
      });
      L.push(`> ${t.costSummary(sumYen >= 0 ? project.shots.flatMap((s) => s.ledger || []).reduce((a, e) => a + (Number(e.seconds) || 0), 0) : 0, sumOk, sumAll, sumYen)}`);
      return L.join('\n');
    }

    function preflightReport(project, t) {
      const pf = project.preflight || {};
      const rows = [['codex', t.pfCodex], ['ffmpeg', t.pfFfmpeg], ['python', t.pfPython], ['ark', t.pfArk]];
      const missing = rows.filter((r) => !pf[r[0]]).map((r) => r[1]);
      return [
        `${t.preflight} — ${project.name}`,
        ...rows.map((r) => `- ${r[1]}: ${pf[r[0]] ? t.pfOn : t.pfOff}`),
        missing.length ? `${t.pfOff}: ${missing.join(', ')}` : t.pfOn,
      ].join('\n');
    }

    // ------------------------------------------------------------- styles
    const CSS = `
.dsv-root{display:flex;flex-direction:column;height:100%;overflow-y:auto;padding:20px 24px 32px;gap:14px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);box-sizing:border-box;font-size:13px;line-height:1.5}
.dsv-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.dsv-title{font-size:18px;font-weight:600;margin:0}
.dsv-subtitle{color:var(--dsw-alias-label-secondary);font-size:12px;margin:2px 0 0}
.dsv-tabs{display:flex;gap:6px}
.dsv-tab{appearance:none;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);border-radius:8px;padding:5px 14px;font-size:12px;cursor:pointer}
.dsv-tab.on{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
.dsv-btn{appearance:none;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:5px 12px;font-size:12px;cursor:pointer;white-space:nowrap}
.dsv-btn:hover{border-color:var(--dsw-alias-border-l2)}
.dsv-btn-primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
.dsv-btn-ghost{background:transparent}
.dsv-btn-danger:hover{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
.dsv-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:14px 16px;display:flex;flex-direction:column;gap:10px}
.dsv-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.dsv-label{color:var(--dsw-alias-label-secondary);font-size:12px}
.dsv-input{appearance:none;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:8px;padding:5px 9px;font-size:12px;min-width:0}
.dsv-input:focus{outline:none;border-color:var(--dsw-alias-brand-primary)}
.dsv-select{appearance:none;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:8px;padding:5px 9px;font-size:12px;cursor:pointer;max-width:220px}
.dsv-toggle{appearance:none;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:3px 12px;font-size:11px;cursor:pointer}
.dsv-toggle.on{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}
.dsv-field{display:flex;flex-direction:column;gap:3px;min-width:0}
.dsv-field textarea{width:100%;min-height:40px;resize:vertical;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:8px;padding:5px 9px;font-size:12px;font-family:inherit;box-sizing:border-box}
.dsv-field textarea:focus{outline:none;border-color:var(--dsw-alias-brand-primary)}
.dsv-grid2{display:grid;grid-template-columns:1fr 1fr;gap:8px 12px}
.dsv-grid3{display:grid;grid-template-columns:2fr 2fr 1fr;gap:8px 12px}
.dsv-shot{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;background:var(--dsw-alias-bg-base)}
.dsv-shot-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.dsv-no{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-weight:600}
.dsv-badge{display:inline-block;border-radius:999px;padding:2px 10px;font-size:11px;border:1px solid var(--dsw-alias-border-l1);cursor:pointer;white-space:nowrap;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary)}
.dsv-badge.s0{background:var(--dsw-alias-bg-layer-2)}
.dsv-badge.s1{color:var(--dsw-alias-state-idle-primary);border-color:var(--dsw-alias-state-idle-primary)}
.dsv-badge.s2{color:var(--dsw-alias-state-warn-primary);border-color:var(--dsw-alias-state-warn-primary)}
.dsv-badge.s3{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}
.dsv-badge.s4{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}
.dsv-check{display:flex;align-items:flex-start;gap:6px;font-size:12px;color:var(--dsw-alias-label-secondary);cursor:pointer}
.dsv-check input{margin:2px 0 0;accent-color:var(--dsw-alias-brand-primary)}
.dsv-ledger{border-top:1px dashed var(--dsw-alias-border-l1);padding-top:8px;display:flex;flex-direction:column;gap:4px}
.dsv-ledger-row{display:grid;grid-template-columns:2fr 56px 64px 70px 2fr 28px;gap:6px;align-items:center}
.dsv-icon-btn{appearance:none;border:none;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;padding:4px;border-radius:6px;font-size:13px;line-height:1}
.dsv-icon-btn:hover{color:var(--dsw-alias-state-error-primary)}
.dsv-empty{color:var(--dsw-alias-label-secondary);padding:18px 8px;text-align:center}
.dsv-hint{color:var(--dsw-alias-label-secondary);font-size:12px;border-left:3px solid var(--dsw-alias-brand-primary);padding:2px 10px}
.dsv-subhint{color:var(--dsw-alias-label-secondary);font-size:11px}
.dsv-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);border-radius:10px;padding:8px 16px;font-size:12px;box-shadow:0 6px 24px rgba(0,0,0,.18);z-index:10000}
.dsv-panel-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}
.dsv-lib-item{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:8px;background:var(--dsw-alias-bg-base)}
.dsv-lib-head{display:flex;align-items:center;gap:8px;justify-content:space-between}
.dsv-lib-title{font-weight:600;font-size:13px}
.dsv-lib-body{white-space:pre-wrap;font-size:12px;color:var(--dsw-alias-label-secondary);max-height:140px;overflow-y:auto;border-top:1px dashed var(--dsw-alias-border-l1);padding-top:8px}
.dsv-table{width:100%;border-collapse:collapse;font-size:12px}
.dsv-table th{text-align:left;color:var(--dsw-alias-label-secondary);font-weight:500;padding:6px 8px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.dsv-table td{padding:6px 8px;border-bottom:1px solid var(--dsw-alias-border-l1);vertical-align:top}
`;

    // ------------------------------------------------------------ pieces
    function Field(props) {
      return h('div', { className: 'dsv-field', style: props.style },
        h('span', { className: 'dsv-label' }, props.label),
        props.hint && h('span', { className: 'dsv-subhint' }, props.hint),
        h('textarea', { value: props.value || '', onChange: (e) => props.onChange(e.target.value) }));
    }

    function ShotCard(props) {
      const { s, i, t, project, lang, patch, remove, flash } = props;
      const ledger = s.ledger || [];
      const kept = ledger.filter((e) => e.ok).length;
      const yen = shotCostYen(t, s);
      const checks = s.checks || [];
      return h('div', { className: 'dsv-shot' },
        h('div', { className: 'dsv-shot-head' },
          h('span', { className: 'dsv-no' }, '#' + (i + 1)),
          h('button', {
            className: `dsv-badge s${s.status}`, title: t.status,
            onClick: () => patch({ status: (s.status + 1) % 5 }),
          }, t[STATUS_KEYS[s.status]]),
          ledger.length ? h('span', { className: 'dsv-subhint' }, t.shotCost(kept, ledger.length, yen)) : null,
          h('span', { style: { flex: 1 } }),
          h('button', { className: 'dsv-btn dsv-btn-ghost', onClick: () => copyText(s.prompt, flash) }, t.copyPrompt),
          h('button', { className: 'dsv-icon-btn', title: t.deleteShot, 'aria-label': t.deleteShot, onClick: remove }, '✕')),
        h('div', { className: 'dsv-grid3' },
          h(Field, { label: t.scene, value: s.scene, onChange: (v) => patch({ scene: v }) }),
          h(Field, { label: t.action, value: s.action, onChange: (v) => patch({ action: v }) }),
          h(Field, { label: t.seconds, value: s.seconds, onChange: (v) => patch({ seconds: v }) })),
        h('div', { className: 'dsv-grid3' },
          h(Field, { label: t.motion, hint: t.motionHint, value: s.motion, onChange: (v) => patch({ motion: v }) }),
          h(Field, { label: t.continuity, value: s.continuity, onChange: (v) => patch({ continuity: v }) }),
          h(Field, { label: t.sound, value: s.sound, onChange: (v) => patch({ sound: v }) })),
        h('div', { className: 'dsv-grid2' },
          h(Field, { label: t.camera, hint: t.cameraHint, value: s.camera, onChange: (v) => patch({ camera: v }) }),
          h(Field, { label: t.composition, hint: t.compositionHint, value: s.composition, onChange: (v) => patch({ composition: v }) })),
        h('div', { className: 'dsv-grid2' },
          h(Field, { label: t.perSecond, hint: t.perSecondHint, value: s.perSecond, onChange: (v) => patch({ perSecond: v }) }),
          h(Field, { label: t.framePrompt, value: s.framePrompt, onChange: (v) => patch({ framePrompt: v }) })),
        h('div', { className: 'dsv-field' },
          h('div', { className: 'dsv-row', style: { justifyContent: 'space-between' } },
            h('span', { className: 'dsv-label' }, t.prompt),
            h('button', {
              className: 'dsv-btn dsv-btn-ghost',
              onClick: () => patch({ prompt: buildSeven(project, s, lang) }),
            }, t.buildPrompt)),
          h('textarea', { value: s.prompt || '', onChange: (e) => patch({ prompt: e.target.value }) })),
        h('div', null,
          h('span', { className: 'dsv-label' }, t.frameChecks),
          h('div', { className: 'dsv-grid2', style: { marginTop: '4px' } },
            t.checks.map((label, idx) => h('label', { key: idx, className: 'dsv-check' },
              h('input', {
                type: 'checkbox',
                checked: checks.indexOf(idx) >= 0,
                onChange: () => patch({ checks: checks.indexOf(idx) >= 0 ? checks.filter((x) => x !== idx) : checks.concat(idx) }),
              }),
              label)))),
        h(Field, { label: t.reviewNote, hint: t.reviewNoteHint, value: s.reviewNote, onChange: (v) => patch({ reviewNote: v }) }),
        h('div', { className: 'dsv-ledger' },
          h('div', { className: 'dsv-row', style: { justifyContent: 'space-between' } },
            h('span', { className: 'dsv-label' }, t.ledger),
            h('button', {
              className: 'dsv-btn dsv-btn-ghost',
              onClick: () => patch({ ledger: ledger.concat({ id: uid(), model: project.videoModel || '', seconds: '', ok: false, note: '' }) }),
            }, '+ ' + t.addEntry)),
          ledger.length ? h('div', { className: 'dsv-ledger-row' },
            [t.entryModel, t.entrySeconds, t.entryOk, t.entryCost, t.entryNote].map((label, idx) => h('span', { key: idx, className: 'dsv-subhint' }, label)),
            h('span')) : null,
          ledger.map((e) => h('div', { className: 'dsv-ledger-row', key: e.id },
            h('input', { className: 'dsv-input', value: e.model || '', onChange: (ev) => patch({ ledger: ledger.map((x) => (x.id === e.id ? { ...x, model: ev.target.value } : x)) }) }),
            h('input', { className: 'dsv-input', value: e.seconds || '', inputMode: 'decimal', onChange: (ev) => patch({ ledger: ledger.map((x) => (x.id === e.id ? { ...x, seconds: ev.target.value } : x)) }) }),
            h('button', {
              className: 'dsv-toggle' + (e.ok ? ' on' : ''),
              onClick: () => patch({ ledger: ledger.map((x) => (x.id === e.id ? { ...x, ok: !x.ok } : x)) }),
            }, e.ok ? t.entryOk : t.entryFail),
            h('span', { className: 'dsv-subhint' }, '¥' + entryCost(t, e).toFixed(1)),
            h('input', { className: 'dsv-input', value: e.note || '', onChange: (ev) => patch({ ledger: ledger.map((x) => (x.id === e.id ? { ...x, note: ev.target.value } : x)) }) }),
            h('button', { className: 'dsv-icon-btn', onClick: () => patch({ ledger: ledger.filter((x) => x.id !== e.id) }) }, '✕')))));
    }

    // ------------------------------------------------------------ studio
    function Studio() {
      const [lang, setLangState] = React.useState(loadLang);
      const [projects, setProjects] = React.useState(loadProjects);
      const [currentId, setCurrentId] = React.useState(() => (projects[0] ? projects[0].id : null));
      const [toast, setToast] = React.useState(null);
      const [tab, setTab] = React.useState('studio');
      const t = STRINGS[lang];
      const project = projects.find((p) => p.id === currentId) || null;

      React.useEffect(() => {
        if (!toast) return undefined;
        const id = setTimeout(() => setToast(null), 1600);
        return () => clearTimeout(id);
      }, [toast]);

      const setLang = (v) => { setLangState(v); try { localStorage.setItem(LANG_KEY, v); } catch (e) { /* ignore */ } };
      const mutate = (fn) => setProjects((prev) => { const next = fn(prev); saveProjects(next); return next; });
      const flash = () => setToast(t.copied);

      const newProject = () => mutate((prev) => {
        const p = freshProject(`${t.project} ${prev.length + 1}`);
        setCurrentId(p.id);
        return prev.concat(p);
      });
      const deleteProject = () => {
        if (!project) return;
        if (!window.confirm(t.confirmDelete)) return;
        mutate((prev) => {
          const next = prev.filter((p) => p.id !== project.id);
          setCurrentId(next[0] ? next[0].id : null);
          return next;
        });
      };
      const patchProject = (patch) => mutate((prev) => prev.map((p) => (p.id === currentId ? { ...p, ...patch } : p)));
      const patchPreflight = (key) => patchProject({ preflight: { ...project.preflight, [key]: !project.preflight[key] } });
      const addShot = () => patchProject({ shots: project.shots.concat(freshShot()) });
      const patchShot = (shotId, patch) => patchProject({ shots: project.shots.map((s) => (s.id === shotId ? { ...s, ...patch } : s)) });
      const deleteShot = (shotId) => patchProject({ shots: project.shots.filter((s) => s.id !== shotId) });

      const usable = project ? project.shots.filter((s) => s.status === 4).length : 0;
      const allLedger = project ? project.shots.flatMap((s) => s.ledger || []) : [];
      const totalSec = allLedger.reduce((a, e) => a + (Number(e.seconds) || 0), 0);
      const kept = allLedger.filter((e) => e.ok).length;
      const totalYen = project ? project.shots.reduce((a, s) => a + shotCostYen(t, s), 0) : 0;

      const tabs = [
        ['studio', t.tabStudio],
        ['prompts', t.tabPrompts],
        ['ref', t.tabRef],
      ];

      return h('div', { className: 'dsv-root' },
        h('style', null, CSS),
        h('div', { className: 'dsv-head' },
          h('div', null,
            h('h1', { className: 'dsv-title' }, t.title),
            h('p', { className: 'dsv-subtitle' }, t.subtitle)),
          h('div', { className: 'dsv-row' },
            h('div', { className: 'dsv-tabs' }, tabs.map(([id, label]) => h('button', {
              key: id, className: 'dsv-tab' + (tab === id ? ' on' : ''), onClick: () => setTab(id),
            }, label))),
            h('button', { className: 'dsv-btn dsv-btn-ghost', onClick: () => setLang(lang === 'zh' ? 'en' : 'zh') }, t.lang))),
        h('div', { className: 'dsv-hint' }, t.hint),

        tab === 'studio' && h('div', null,
          // ---- project bar
          h('div', { className: 'dsv-card', style: { marginBottom: '14px' } },
            h('div', { className: 'dsv-row' },
              h('span', { className: 'dsv-label' }, t.project),
              projects.length === 0
                ? h('span', { className: 'dsv-label' }, t.noProjects)
                : h('select', {
                  className: 'dsv-select', value: currentId || '',
                  onChange: (e) => setCurrentId(e.target.value),
                }, projects.map((p) => h('option', { key: p.id, value: p.id }, p.name))),
              h('button', { className: 'dsv-btn dsv-btn-primary', onClick: newProject }, `+ ${t.newProject}`),
              project && h('button', { className: 'dsv-btn dsv-btn-danger', onClick: deleteProject }, t.deleteProject)),
            project && h('div', { className: 'dsv-row' },
              h('span', { className: 'dsv-label' }, t.projectName),
              h('input', { className: 'dsv-input', value: project.name, onChange: (e) => patchProject({ name: e.target.value }) }),
              h('span', { className: 'dsv-label' }, t.ratio),
              h('input', { className: 'dsv-input', value: project.ratio, onChange: (e) => patchProject({ ratio: e.target.value }) }),
              h('span', { className: 'dsv-label' }, t.duration),
              h('input', { className: 'dsv-input', value: project.duration, onChange: (e) => patchProject({ duration: e.target.value }) }),
              h('span', { className: 'dsv-label' }, t.budget),
              h('input', { className: 'dsv-input', value: project.budget, onChange: (e) => patchProject({ budget: e.target.value }) }),
              totalYen > 0 ? h('span', { className: 'dsv-label' }, `${t.budgetSpent}: ¥${totalYen.toFixed(1)}`) : null),
            project && h('div', { className: 'dsv-row' },
              h('button', { className: 'dsv-btn', onClick: () => copyText(lang === 'zh' ? STRINGS.zhDirector : STRINGS.enDirector, flash) }, t.copyDirector),
              h('button', { className: 'dsv-btn', onClick: () => copyText(preflightReport(project, t), flash) }, t.copyPreflight),
              h('button', { className: 'dsv-btn', onClick: () => copyText(toMarkdown(project, t, lang), flash) }, t.exportMd),
              h('span', { className: 'dsv-label' }, t.stats(usable, project.shots.length)),
              allLedger.length ? h('span', { className: 'dsv-label' }, t.costSummary(totalSec, kept, allLedger.length, totalYen)) : null)),

          project && h('div', { className: 'dsv-card', style: { marginBottom: '14px' } },
            h('strong', null, t.preflight),
            h('span', { className: 'dsv-subhint' }, t.preflightHint),
            h('div', { className: 'dsv-row' },
              ['codex', 'ffmpeg', 'python', 'ark'].map((key) => h('button', {
                key, className: 'dsv-toggle' + (project.preflight[key] ? ' on' : ''),
                onClick: () => patchPreflight(key),
              }, `${t['pf' + key[0].toUpperCase() + key.slice(1)]}: ${project.preflight[key] ? t.pfOn : t.pfOff}`)))),

          project && h('div', { className: 'dsv-card', style: { marginBottom: '14px' } },
            h('strong', null, t.modelConfig),
            h('div', { className: 'dsv-grid2' },
              h(Field, { label: t.painterModel, value: project.painterModel, onChange: (v) => patchProject({ painterModel: v }) }),
              h(Field, { label: t.videoModel, hint: t.priceHint, value: project.videoModel, onChange: (v) => patchProject({ videoModel: v }) }))),

          project && h('div', { className: 'dsv-card', style: { marginBottom: '14px' } },
            h('strong', null, t.storyCard),
            h('div', { className: 'dsv-grid2' },
              h(Field, { label: t.logline, hint: t.loglineHint, value: project.logline, onChange: (v) => patchProject({ logline: v }) }),
              h(Field, { label: t.hook, value: project.hook, onChange: (v) => patchProject({ hook: v }) }),
              h(Field, { label: t.structure, hint: t.structureHint, value: project.structure, onChange: (v) => patchProject({ structure: v }) }),
              h(Field, { label: t.refSong, value: project.refSong, onChange: (v) => patchProject({ refSong: v }) }),
              h(Field, { label: t.style, hint: t.styleHint, value: project.style, onChange: (v) => patchProject({ style: v }) }),
              h(Field, { label: t.palette, hint: t.paletteHint, value: project.palette, onChange: (v) => patchProject({ palette: v }) }),
              h(Field, { label: t.characters, hint: t.charactersHint, value: project.characters, onChange: (v) => patchProject({ characters: v }) }))),

          project && h('div', { className: 'dsv-card' },
            h('div', { className: 'dsv-row' },
              h('strong', null, t.shots),
              h('button', { className: 'dsv-btn', onClick: addShot }, `+ ${t.addShot}`),
              project.shots.length > 0 && h('button', {
                className: 'dsv-btn',
                onClick: () => copyText(project.shots.map((s, i) => `#${i + 1}\n${s.prompt}`).join('\n\n'), flash),
              }, t.copyAll)),
            project.shots.length === 0
              ? h('div', { className: 'dsv-empty' }, t.emptyShots)
              : project.shots.map((s, i) => h(ShotCard, {
                key: s.id, s, i, t, project, lang, flash,
                patch: (p) => patchShot(s.id, p),
                remove: () => deleteShot(s.id),
              })))),

        tab === 'prompts' && h('div', { className: 'dsv-card' },
          h('span', { className: 'dsv-subhint' }, t.promptLibraryHint),
          LIBRARY.map((item) => {
            const v = item[lang] || item.zh;
            return h('div', { className: 'dsv-lib-item', key: item.id },
              h('div', { className: 'dsv-lib-head' },
                h('span', { className: 'dsv-lib-title' }, v.title),
                h('button', { className: 'dsv-btn dsv-btn-ghost', onClick: () => copyText(v.body, flash) }, t.copyPrompt)),
              h('div', { className: 'dsv-lib-body' }, v.body));
          })),

        tab === 'ref' && h('div', { className: 'dsv-card' },
          h('span', { className: 'dsv-subhint' }, t.failureHint),
          h('table', { className: 'dsv-table' },
            h('thead', null, h('tr', null, h('th', null, t.colWrong), h('th', null, t.colFix))),
            h('tbody', null, FAILURE_TABLE.map((row, idx) => h('tr', { key: idx },
              h('td', null, row[0][lang === 'zh' ? 0 : 1]),
              h('td', null, row[1][lang === 'zh' ? 0 : 1])))))),

        toast && h('div', { className: 'dsv-toast', role: 'status' }, toast),
      );
    }

    // director brief strings per language (full original text)
    STRINGS.zhDirector = LIBRARY[0].zh.body;
    STRINGS.enDirector = LIBRARY[0].en.body;

    function PanelIcon() {
      return h('span', {
        className: 'dsv-panel-icon', 'aria-hidden': true,
        dangerouslySetInnerHTML: {
          __html: '<svg viewBox="0 0 64 64" width="18" height="18"><rect x="4" y="12" width="56" height="40" rx="9" fill="currentColor"/><rect x="10" y="18" width="44" height="28" rx="5" fill="var(--dsw-alias-bg-base)"/><path d="M28 25.5v13l11-6.5z" fill="currentColor"/></svg>',
        },
      });
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist', id: 'dsh-video', order: 20,
        }, PanelIcon));
        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main', key: 'dsh-video',
        }, Studio));
      },
    };
  },
});
