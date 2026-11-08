window.__ModuleLoader__.load({
  id: 'dsh-video',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    // ---------------------------------------------------------------- i18n
    const STRINGS = {
      en: {
        title: 'Video Studio',
        subtitle: 'Idea → storyboard → prompts → shots → film',
        lang: '中文',
        project: 'Project',
        newProject: 'New project',
        deleteProject: 'Delete project',
        confirmDelete: 'Delete this project and all its shots?',
        projectName: 'Project name',
        noProjects: 'No projects yet. Create one to start planning your film.',
        ratio: 'Aspect ratio',
        duration: 'Target length',
        budget: 'Budget note',
        shots: 'Storyboard shots',
        addShot: 'Add shot',
        colNo: '#',
        colScene: 'Scene description',
        colCamera: 'Camera / motion',
        colPrompt: 'Video prompt (Seedance)',
        colImagePrompt: 'Frame prompt (first/last frame)',
        colStatus: 'Status',
        colActions: 'Actions',
        copyPrompt: 'Copy prompt',
        copyAll: 'Copy all prompts',
        copyDirector: 'Copy director brief',
        directorBrief: 'Director brief',
        copied: 'Copied to clipboard',
        exportMd: 'Export markdown',
        statusDraft: 'Draft',
        statusFrames: 'Frames ready',
        statusVideo: 'Video generated',
        statusDone: 'Final cut',
        emptyShots: 'No shots yet. Add your first shot below.',
        stats: (a, b) => `${a}/${b} shots done`,
        hint: 'Find errors in text before they reach an image; find errors in an image before they reach a paid video.',
        deleteShot: 'Delete shot',
      },
      zh: {
        title: 'AI 视频制片台',
        subtitle: '想法 → 分镜 → 提示词 → 镜头 → 成片',
        lang: 'English',
        project: '项目',
        newProject: '新建项目',
        deleteProject: '删除项目',
        confirmDelete: '确定删除该项目及其全部分镜吗？',
        projectName: '项目名称',
        noProjects: '还没有项目。新建一个，开始规划你的片子。',
        ratio: '画幅',
        duration: '目标片长',
        budget: '预算备注',
        shots: '分镜列表',
        addShot: '添加分镜',
        colNo: '#',
        colScene: '画面描述',
        colCamera: '机位 / 镜头运动',
        colPrompt: '视频提示词（Seedance）',
        colImagePrompt: '首尾帧提示词（画师）',
        colStatus: '状态',
        colActions: '操作',
        copyPrompt: '复制提示词',
        copyAll: '复制全部提示词',
        copyDirector: '复制总导演提示词',
        directorBrief: '总导演提示词',
        copied: '已复制到剪贴板',
        exportMd: '导出 Markdown',
        statusDraft: '草稿',
        statusFrames: '首尾帧已就绪',
        statusVideo: '视频已生成',
        statusDone: '已剪辑成片',
        emptyShots: '还没有分镜。在下方添加第一个镜头。',
        stats: (a, b) => `完成 ${a}/${b} 个镜头`,
        hint: '能在文字里发现的错，不要留到图上；能在图上发现的错，不要留到视频上。',
        deleteShot: '删除分镜',
      },
    };

    const STATUS_KEYS = ['statusDraft', 'statusFrames', 'statusVideo', 'statusDone'];

    const DIRECTOR_BRIEF = [
      '你当这支短片的总导演，全程负责，我只和你沟通。',
      '开工前先做两件事：',
      '1. 问我：片长、画幅、总预算、要不要配乐和字幕。',
      '2. 检查 Codex、ffmpeg、Python 和 ARK_API_KEY 能不能用，缺什么告诉我。',
      '记住所有文件都放在一个新的项目文件夹里。',
      '分工：',
      '- 你：写故事和分镜，写所有提示词，调用其他模型，抽帧放大检查每张图和每段视频，用 ffmpeg 和 Python 写代码做后期。',
      '- Codex（画师）：画设定图、样帧和每个镜头的首尾帧。',
      '- Seedance（动画师）：把首尾帧变成几秒钟的视频，按秒付费，能不重生成就不重生成。',
      '原则：提示词只要改几个字，重画一张图不额外花钱，但重新生成视频要按秒付钱。',
      '能在文字里发现的错，不要留到图上；能在图上发现的错，不要留到视频上。',
    ].join('\n');

    // -------------------------------------------------------------- storage
    const STORE_KEY = 'dsh-video.projects.v1';
    const LANG_KEY = 'dsh-video.lang';

    function loadProjects() {
      try {
        const raw = localStorage.getItem(STORE_KEY);
        if (raw) return JSON.parse(raw);
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
    function uid() {
      return Math.random().toString(36).slice(2, 10);
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

    function toMarkdown(project, t) {
      const lines = [
        `# ${project.name}`,
        '',
        `- ${t.ratio}: ${project.ratio || '-'}`,
        `- ${t.duration}: ${project.duration || '-'}`,
        `- ${t.budget}: ${project.budget || '-'}`,
        '',
        `## ${t.shots}`,
        '',
      ];
      project.shots.forEach((s, i) => {
        lines.push(`### ${t.colNo} ${i + 1} — ${t[STATUS_KEYS[s.status]]}`);
        lines.push(`- ${t.colScene}: ${s.scene}`);
        lines.push(`- ${t.colCamera}: ${s.camera}`);
        lines.push(`- ${t.colImagePrompt}: ${s.imagePrompt}`);
        lines.push(`- ${t.colPrompt}:`);
        lines.push('```');
        lines.push(s.prompt);
        lines.push('```');
        lines.push('');
      });
      return lines.join('\n');
    }

    // ------------------------------------------------------------- styles
    const CSS = `
.dsv-root{display:flex;flex-direction:column;height:100%;overflow-y:auto;padding:20px 24px;gap:14px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);box-sizing:border-box;font-size:13px;line-height:1.5}
.dsv-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.dsv-title{font-size:18px;font-weight:600;margin:0}
.dsv-subtitle{color:var(--dsw-alias-label-secondary);font-size:12px;margin:2px 0 0}
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
.dsv-table{width:100%;border-collapse:collapse}
.dsv-table th{text-align:left;font-size:11px;color:var(--dsw-alias-label-secondary);font-weight:500;padding:6px 8px;border-bottom:1px solid var(--dsw-alias-border-l1);vertical-align:bottom}
.dsv-table td{padding:8px;border-bottom:1px solid var(--dsw-alias-border-l1);vertical-align:top}
.dsv-table textarea{width:100%;min-height:52px;resize:vertical;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:8px;padding:5px 9px;font-size:12px;font-family:inherit;box-sizing:border-box}
.dsv-table textarea:focus{outline:none;border-color:var(--dsw-alias-brand-primary)}
.dsv-no{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.dsv-badge{display:inline-block;border-radius:999px;padding:2px 10px;font-size:11px;border:1px solid var(--dsw-alias-border-l1);cursor:pointer;white-space:nowrap;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary)}
.dsv-badge.s0{background:var(--dsw-alias-bg-layer-2)}
.dsv-badge.s1{color:var(--dsw-alias-state-warn-primary);border-color:var(--dsw-alias-state-warn-primary)}
.dsv-badge.s2{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary)}
.dsv-badge.s3{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}
.dsv-empty{color:var(--dsw-alias-label-secondary);padding:18px 8px;text-align:center}
.dsv-hint{color:var(--dsw-alias-label-secondary);font-size:12px;border-left:3px solid var(--dsw-alias-brand-primary);padding:2px 10px}
.dsv-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);border-radius:10px;padding:8px 16px;font-size:12px;box-shadow:0 6px 24px rgba(0,0,0,.18);z-index:10000}
.dsv-icon-btn{appearance:none;border:none;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;padding:4px;border-radius:6px;font-size:13px;line-height:1}
.dsv-icon-btn:hover{color:var(--dsw-alias-state-error-primary)}
.dsv-panel-icon{display:flex;align-items:center;justify-content:center;width:100%;height:100%}
`;

    // ------------------------------------------------------------ components
    function TextInput(props) {
      return h('input', {
        className: 'dsv-input', value: props.value || '',
        placeholder: props.placeholder || '',
        onChange: (e) => props.onChange(e.target.value),
      });
    }

    function Studio() {
      const [lang, setLangState] = React.useState(loadLang);
      const [projects, setProjects] = React.useState(loadProjects);
      const [currentId, setCurrentId] = React.useState(() => (projects[0] ? projects[0].id : null));
      const [toast, setToast] = React.useState(null);

      const t = STRINGS[lang];
      const project = projects.find((p) => p.id === currentId) || null;

      React.useEffect(() => {
        if (!toast) return undefined;
        const id = setTimeout(() => setToast(null), 1600);
        return () => clearTimeout(id);
      }, [toast]);

      const setLang = (v) => { setLangState(v); try { localStorage.setItem(LANG_KEY, v); } catch (e) { /* ignore */ } };
      const mutate = (fn) => {
        setProjects((prev) => {
          const next = fn(prev);
          saveProjects(next);
          return next;
        });
      };
      const flash = () => setToast(t.copied);

      const newProject = () => mutate((prev) => {
        const p = { id: uid(), name: `${t.project} ${prev.length + 1}`, ratio: '16:9', duration: '30s', budget: '', shots: [] };
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
      const addShot = () => mutate((prev) => prev.map((p) => (p.id === currentId
        ? { ...p, shots: p.shots.concat({ id: uid(), scene: '', camera: '', prompt: '', imagePrompt: '', status: 0 }) }
        : p)));
      const patchShot = (shotId, patch) => mutate((prev) => prev.map((p) => (p.id === currentId
        ? { ...p, shots: p.shots.map((s) => (s.id === shotId ? { ...s, ...patch } : s)) }
        : p)));
      const deleteShot = (shotId) => mutate((prev) => prev.map((p) => (p.id === currentId
        ? { ...p, shots: p.shots.filter((s) => s.id !== shotId) }
        : p)));

      const doneCount = project ? project.shots.filter((s) => s.status === 3).length : 0;

      return h('div', { className: 'dsv-root' },
        h('style', null, CSS),
        h('div', { className: 'dsv-head' },
          h('div', null,
            h('h1', { className: 'dsv-title' }, t.title),
            h('p', { className: 'dsv-subtitle' }, t.subtitle)),
          h('button', { className: 'dsv-btn dsv-btn-ghost', onClick: () => setLang(lang === 'zh' ? 'en' : 'zh') }, t.lang)),
        h('div', { className: 'dsv-hint' }, t.hint),
        h('div', { className: 'dsv-card' },
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
            h(TextInput, { value: project.name, onChange: (v) => patchProject({ name: v }) }),
            h('span', { className: 'dsv-label' }, t.ratio),
            h(TextInput, { value: project.ratio, onChange: (v) => patchProject({ ratio: v }) }),
            h('span', { className: 'dsv-label' }, t.duration),
            h(TextInput, { value: project.duration, onChange: (v) => patchProject({ duration: v }) }),
            h('span', { className: 'dsv-label' }, t.budget),
            h(TextInput, { value: project.budget, onChange: (v) => patchProject({ budget: v }) })),
          project && h('div', { className: 'dsv-row' },
            h('button', {
              className: 'dsv-btn', onClick: () => copyText(DIRECTOR_BRIEF, flash),
            }, t.copyDirector),
            h('button', {
              className: 'dsv-btn', onClick: () => copyText(toMarkdown(project, t), flash),
            }, t.exportMd),
            h('span', { className: 'dsv-label' }, t.stats(doneCount, project.shots.length)))),
        project && h('div', { className: 'dsv-card' },
          h('div', { className: 'dsv-row' },
            h('strong', null, t.shots),
            h('button', { className: 'dsv-btn', onClick: addShot }, `+ ${t.addShot}`),
            project.shots.length > 0 && h('button', {
              className: 'dsv-btn',
              onClick: () => copyText(project.shots.map((s, i) => `#${i + 1} ${s.prompt}`).join('\n\n'), flash),
            }, t.copyAll)),
          project.shots.length === 0
            ? h('div', { className: 'dsv-empty' }, t.emptyShots)
            : h('table', { className: 'dsv-table' },
              h('thead', null, h('tr', null,
                h('th', null, t.colNo),
                h('th', null, t.colScene),
                h('th', null, t.colCamera),
                h('th', null, t.colImagePrompt),
                h('th', null, t.colPrompt),
                h('th', null, t.colStatus),
                h('th', null, t.colActions))),
              h('tbody', null, project.shots.map((s, i) => h('tr', { key: s.id },
                h('td', { className: 'dsv-no' }, String(i + 1)),
                h('td', null, h('textarea', { value: s.scene, onChange: (e) => patchShot(s.id, { scene: e.target.value }) })),
                h('td', null, h('textarea', { value: s.camera, onChange: (e) => patchShot(s.id, { camera: e.target.value }) })),
                h('td', null, h('textarea', { value: s.imagePrompt, onChange: (e) => patchShot(s.id, { imagePrompt: e.target.value }) })),
                h('td', null, h('textarea', { value: s.prompt, onChange: (e) => patchShot(s.id, { prompt: e.target.value }) })),
                h('td', null, h('button', {
                  className: `dsv-badge s${s.status}`,
                  title: t.colStatus,
                  onClick: () => patchShot(s.id, { status: (s.status + 1) % 4 }),
                }, t[STATUS_KEYS[s.status]])),
                h('td', null, h('div', { className: 'dsv-row' },
                  h('button', { className: 'dsv-btn dsv-btn-ghost', onClick: () => copyText(s.prompt, flash) }, t.copyPrompt),
                  h('button', {
                    className: 'dsv-icon-btn', title: t.deleteShot, 'aria-label': t.deleteShot,
                    onClick: () => deleteShot(s.id),
                  }, '✕')))))))),
        toast && h('div', { className: 'dsv-toast', role: 'status' }, toast),
      );
    }

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
