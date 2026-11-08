// dsh-video sync server — reference implementation of the dsh-video sync protocol.
// Zero dependencies (Node 18+). Self-host it; the plugin talks to any compliant endpoint.
//
//   SYNC_TOKEN=my-secret node server/server.mjs        # listens on :8787
//   SYNC_TOKEN=... PORT=9000 DATA_DIR=./data node server/server.mjs
//
// Protocol (all JSON, Bearer auth):
//   GET  /projects          -> { projects: [...] }
//   PUT  /projects          <- { projects: [...] }  -> { ok: true, count }
//   GET  /health            -> { ok: true }
//
// Storage: one JSON file (last write wins per PUT). The plugin merges by
// project id + updatedAt on pull, so per-project granularity lives client-side.

import http from 'node:http';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const TOKEN = process.env.SYNC_TOKEN;
const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '127.0.0.1';
const DATA_DIR = process.env.DATA_DIR || join(dirname(fileURLToPath(import.meta.url)), 'data');
const DATA_FILE = join(DATA_DIR, 'projects.json');

if (!TOKEN) {
  console.error('SYNC_TOKEN is required (the shared access token for this server).');
  process.exit(1);
}

function readProjects() {
  try {
    if (!existsSync(DATA_FILE)) return [];
    const parsed = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function writeProjects(projects) {
  mkdirSync(DATA_DIR, { recursive: true });
  const tmp = DATA_FILE + '.tmp';
  writeFileSync(tmp, JSON.stringify(projects, null, 2), 'utf8');
  writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf8');
}

function cors(res) {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-headers', 'authorization, content-type');
  res.setHeader('access-control-allow-methods', 'GET, PUT, OPTIONS');
}

const server = http.createServer((req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const auth = req.headers.authorization || '';
  if (auth !== 'Bearer ' + TOKEN) {
    res.writeHead(401, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'unauthorized' }));
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, count: readProjects().length }));
    return;
  }

  if (req.method === 'GET' && req.url === '/projects') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ projects: readProjects() }));
    return;
  }

  if (req.method === 'PUT' && req.url === '/projects') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 16 * 1024 * 1024) req.destroy();
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const projects = Array.isArray(parsed.projects) ? parsed.projects : null;
        if (!projects) throw new Error('projects array required');
        writeProjects(projects);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ ok: true, count: projects.length }));
      } catch (e) {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: String(e.message || e) }));
      }
    });
    return;
  }

  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, HOST, () => {
  console.log(`dsh-video sync server on http://${HOST}:${PORT} (data: ${DATA_FILE})`);
});
