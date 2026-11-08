# dsh-video sync server（参考实现）

dsh-video 同步协议的参考服务端。零依赖，Node 18+ 即可运行；也可以按协议自己实现任何语言的端点。

English: see the protocol summary at the bottom / [SYNC.md](./SYNC.md).

## 运行

```sh
SYNC_TOKEN=我的令牌 node server/server.mjs            # 默认端口 8787
SYNC_TOKEN=我的令牌 PORT=9000 DATA_DIR=./data node server/server.mjs
```

- `SYNC_TOKEN`（必填）：共享访问令牌，填进插件的「访问令牌」。
- `PORT`：监听端口，默认 8787。
- `DATA_DIR`：数据目录，默认 `server/data/`（一个 JSON 文件，记得自己备份）。

## 插件侧配置

1. 制片台 → 云同步（可选）→ 同步端点填 `https://你的域名`（或内网 `http://内网IP:8787`）。
2. 访问令牌填 `SYNC_TOKEN` 的值。默认只在内存里，本设备记住请自行权衡。
3. **推送** 全量上传本地项目；**拉取并合并** 按 `id + updatedAt` 合并，被覆盖的一方自动保留为冲突快照。

## 协议（任何语言可实现）

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET /health` | | 返回 `{ok:true, count}`，用于连通性检查 |
| `GET /projects` | Bearer 认证 | 返回 `{projects:[...]}` |
| `PUT /projects` | Bearer 认证，body `{projects:[...]}` | 全量覆盖存储，返回 `{ok:true, count}` |

鉴权：`Authorization: Bearer <SYNC_TOKEN>`。所有响应带 CORS 头（`*`），供浏览器直连。

## 安全提示

- 务必走 HTTPS（内网 http 自担风险）；令牌泄露等于项目数据泄露。
- 服务端是"最后写入获胜"的全量存储，冲突合并发生在插件端；多人共用同一令牌会互相覆盖，建议一人一令牌或自行扩展成多租户。
