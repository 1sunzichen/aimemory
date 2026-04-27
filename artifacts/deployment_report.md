# Web Server 部署到 10.17.0.22 — 问题与解决报告

## 部署结果

✅ **服务已成功部署在 10.17.0.22 上**，Docker 容器 `web_server` 正常运行，Caddy 在容器内 `:8080` 端口服务静态文件，映射到宿主机 `:8888`。

---

## 问题一：Harbor 镜像拉取失败

### 现象

```
Error response from daemon: failed to resolve reference "docker.anyverse.work/library/web_server:latest":
Head "https://docker.anyverse.work/v2/library/web_server/manifests/latest":
dial tcp 10.17.1.25:443: connect: connection refused
```

### 根因

| 项目 | 状态 |
|---|---|
| Harbor 服务器 `docker.anyverse.work` (10.17.1.25) 的 **443 端口 (HTTPS)** | ❌ 不可达 |
| Harbor 服务器的 **80 端口 (HTTP)** | ✅ 可达 |

Docker 默认通过 **HTTPS (443)** 拉取镜像，但你们的 Harbor 实例**只开放了 HTTP (80)**。Docker 遇到非 HTTPS 的 Registry 时会直接拒绝拉取。

### 解决方案

在 22 机器的 `/etc/docker/daemon.json` 中添加 `insecure-registries` 配置，告诉 Docker 允许通过 HTTP 访问该 Registry：

```diff
 {
   "log-driver": "json-file",
   "log-opts": { "max-size": "10m", "max-file": "3" },
-  "default-address-pools": [{"base":"10.0.0.0/8","size":24}]
+  "default-address-pools": [{"base":"10.0.0.0/8","size":24}],
+  "insecure-registries": ["docker.anyverse.work"]
 }
```

然后重启 Docker：
```bash
sudo systemctl restart docker
```

之后还需要登录 Harbor：
```bash
docker login docker.anyverse.work -u 'robot$library+ci_bot' -p '<密码>'
```

> [!IMPORTANT]
> 这是 22 机器特有的问题。如果其他机器也需要拉取 Harbor 镜像，同样需要做这两步配置。

> [!WARNING]
> `insecure-registries` 意味着镜像传输走的是明文 HTTP，不加密。在内网环境下可以接受，但建议后续给 Harbor 配置 TLS 证书以启用 HTTPS (443)。

---

## 问题二：本机浏览器无法访问 `http://10.17.0.22:8888`

### 现象

浏览器访问 `http://10.17.0.22:8888` 显示无法正常运作。

### 根因

你的 Mac 上配置了 HTTP 代理：

```
http_proxy=http://127.0.0.1:7897
https_proxy=http://127.0.0.1:7897
no_proxy=（未设置）
```

这是 Clash/ClashX 类代理工具的默认监听端口。由于 `no_proxy` 未设置，**所有 HTTP 流量**（包括内网 `10.17.x.x`）都被代理拦截。代理无法正确转发到内网 IP，返回 `502 Bad Gateway`。

> [!NOTE]
> 服务本身是正常的 — 在 22 机器上 `curl localhost:8888` 返回 200 OK。

### 解决方案（二选一）

#### 方案 A：在代理软件中配置直连规则（推荐）

在你的 Clash/ClashX 配置文件中，添加内网 IP 段的直连规则：

```yaml
rules:
  # 内网地址直连，不走代理
  - IP-CIDR,10.0.0.0/8,DIRECT
  - IP-CIDR,172.16.0.0/12,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT
  # ... 其他规则
```

或者在系统网络设置中配置「忽略这些主机与域的代理设置」，添加：`10.17.*`

#### 方案 B：SSH 隧道转发（临时方案）

```bash
ssh -f -N -L 8888:localhost:8888 wujie@10.17.0.22
```

然后通过 `http://localhost:8888` 访问。这会绕过所有代理，但需要保持 SSH 隧道运行。

---

## 操作时间线

| 时间 | 操作 |
|---|---|
| 14:12 | 克隆 `project/grid` 分支到 `~/anyverse`（8081 文件） |
| 14:13 | 首次运行 `start_webserver.sh` → Harbor 443 拒绝连接 |
| 14:16 | 诊断发现 Harbor 80 可达、443 不可达 |
| 14:16 | 修改 `daemon.json` 添加 `insecure-registries` + 重启 Docker |
| 14:17 | Docker login Harbor 成功 |
| 14:17 | 重新运行脚本 → 镜像拉取成功，容器启动，Caddy 正常服务 |
| 14:18 | 发现本机浏览器 502 → 定位到代理问题 |
| 14:20 | SSH 隧道作为临时方案验证 200 OK |

---

维护者: 基座模型组
