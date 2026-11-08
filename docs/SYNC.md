# Cloud sync protocol (dsh-video)

dsh-video stays local-first. Everything lives in the browser until you press
**Push**. When you do, the plugin speaks this tiny protocol with any compliant
endpoint — self-hosted, or a hosted SaaS of your choice.

## Wire format

All requests are JSON with `Authorization: Bearer <token>`.

| Method | Path | Request | Response |
| --- | --- | --- | --- |
| `GET` | `/health` | — | `{"ok":true,"count":N}` |
| `GET` | `/projects` | — | `{"projects":[Project…]}` |
| `PUT` | `/projects` | `{"projects":[Project…]}` | `{"ok":true,"count":N}` |

`Project` is the plugin's project object (see `client.js`), plus `updatedAt`
(ms epoch) stamped on every local save.

## Merge semantics

- **Push** is a full upload; the endpoint stores it as the latest generation.
- **Pull** fetches the stored generation and merges per project **id**:
  later `updatedAt` wins; the losing copy is preserved under
  `project.conflicts[]` (never deleted). Equal stamps keep the remote copy.
- Conflict snapshots are visible in exports (`conflicts` field) so nothing is
  silently lost.

## Secrets

- The access token is kept **in memory only** unless you explicitly enable
  "remember token on this device" (then it sits in `localStorage` — a
  deliberate, user-visible trade-off).
- `ARK_API_KEY` never enters the browser: video generation is submitted by the
  agent/host side, which keeps the key in the environment or DSH credential
  vault.

## Reference server

`server/server.mjs` is a zero-dependency Node implementation (see
[server/README.md](../server/README.md)). Deploy behind TLS for anything
reachable off-machine.
