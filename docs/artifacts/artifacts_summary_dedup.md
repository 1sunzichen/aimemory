# artifacts 文档去重总结

来源目录：
- `/Users/wujie22qx/.gemini/antigravity/brain/710e04a1-3c9e-4bc1-b62c-e11f91da76fb/artifacts`

已读取文件：
- `clash_proxy_modes_guide.md`
- `deployment_report.md`
- `service_registry.md`
- `network_explained.md`

---

## 1. 核心结论

1. Anyverse Web Server 的关键访问方式已经统一到“宿主机直接监听 + 内网直连”。
2. 访问异常主要有两大类根因：
   - Docker / Harbor 部署链路问题
   - 本机代理（Clash Verge）导致的内网流量绕路问题
3. 在已验证的可用方案里，`host network + Clash 内网直连规则` 是最稳定的组合。
4. 如果要用域名访问，有三种路线：
   - 直接 DNS 指向内网 IP，再带 `:8080`
   - DNS + Nginx 反代到 `127.0.0.1:8080`
   - 让容器内 Caddy 直接监听 80

---

## 2. Web Server 部署与访问要点

### 2.1 服务信息
- Web Server 部署机器曾记录为：
  - `10.17.0.22`
  - `10.17.17.31`
- 镜像：`docker.anyverse.work/library/web_server:latest`
- 常见访问端口：`8080`
- 另一个历史映射方案是：容器 `8080` 映射到宿主机 `8888`

### 2.2 当前最重要的网络结论
去重后最关键的信息是：
- 之前 bridge 模式下，外部访问宿主机映射端口时，可能经过 `docker-proxy/NAT` 后出现“空响应”或异常。
- 切换为 `--network host` 后，服务直接监听宿主机 `0.0.0.0:8080`，链路更简单，也更稳定。
- 但仅仅改成 host network 还不够；如果本机开了 Clash TUN/代理模式，仍然需要为 `10.0.0.0/8` 配置 DIRECT。

一句话版：
- “服务能通”依赖两件事同时成立：
  - 宿主机侧不要被 Docker bridge/NAT 干扰
  - 客户端侧不要把内网流量送进代理

---

## 3. Harbor 拉镜像问题总结

### 3.1 现象
`docker pull docker.anyverse.work/library/web_server:latest` 失败，报错表现为 Docker 默认尝试走 HTTPS 443，但 Harbor 实际只开了 HTTP 80。

### 3.2 根因
- Docker 默认按 HTTPS Registry 处理
- Harbor 实例在该环境下没有正常提供 443 TLS 服务
- 因此需要把 Harbor 配成 insecure registry

### 3.3 处理方式
在 Docker daemon 配置中加入：

```json
{
  "insecure-registries": ["docker.anyverse.work"]
}
```

然后重启 Docker，并执行 Harbor 登录。

### 3.4 风险提示
- 这是内网可接受但不理想的方案
- 长期应给 Harbor 补 TLS/443，而不是持续依赖明文 HTTP

---

## 4. Clash Verge / 代理相关结论

这是 4 份文档里重复最多、也是最值得保留的部分。

### 4.1 为什么浏览器/命令行访问内网会失败
如果本机开启了 Clash Verge，且没有正确设置内网直连：
- `10.17.x.x` 这类内网请求也会被送进代理
- 代理对内网目标通常无法正确转发
- 最终表现为：
  - 502 Bad Gateway
  - 空响应
  - 无法连接

### 4.2 必备直连规则
建议保留：

```yaml
prepend-rules:
  - DOMAIN,gitlab.anyverse.work,DIRECT
  - DOMAIN,docker.anyverse.work,DIRECT
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
```

### 4.3 Clash Verge 配置位置
macOS Clash Verge Merge 配置路径：

```text
~/Library/Application Support/io.github.clash-verge-rev.clash-verge-rev/profiles/Merge.yaml
```

### 4.4 TUN 模式 vs 系统代理模式
去重后的区别：

1. TUN 模式
- 拦截所有应用流量
- 内网是否直连取决于 Clash 规则
- 不配 DIRECT 规则时，内网也会被代理

2. 系统代理模式
- 只有遵循系统代理的应用才会走 Clash
- 是否绕过代理，取决于系统“忽略代理列表”
- 可在 macOS 里把 `10.*`、`*.anyverse.work`、`localhost` 等加入 bypass

### 4.5 推荐判断
- 需要全局接管流量时：用 TUN，但必须补 DIRECT 规则
- 只做常规 Web 开发时：系统代理模式更轻、更稳

---

## 5. 访问验证方法

### 5.1 验证是否绕过代理直连
```bash
curl -I --noproxy '*' http://10.17.0.22:8080
```

### 5.2 查看 Clash 当前规则
```bash
curl -s --unix-socket /tmp/verge/verge-mihomo.sock http://localhost/rules
```

### 5.3 临时 SSH 隧道方案
当代理问题暂时没改好时，可以用：

```bash
ssh -f -N -L 8888:localhost:8888 wujie@10.17.0.22
```

然后访问：
- `http://localhost:8888`

这个方案适合临时验证，不适合长期对外提供服务。

---

## 6. 域名映射与标准化访问方案

### 方案 A：DNS 直指内网 IP，保留 8080
例如：
- `web.anyverse.work -> 10.17.0.22`
- 访问：`http://web.anyverse.work:8080`

优点：
- 最简单
- 不需要额外反代层

缺点：
- URL 带端口，不够标准

### 方案 B：DNS + Nginx 反代到 8080
例如 Nginx：

```nginx
server {
    listen 80;
    server_name web.anyverse.work;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

优点：
- 用户访问标准 URL，不带端口
- 适合后面继续加 HTTPS

### 方案 C：让 Caddy 直接监听 80
优点：
- 少一层 Nginx
- 配置更直接

限制：
- 80 端口可能冲突
- 绑定低位端口需要额外权限或能力设置

### 综合建议
- 机器上已有 Nginx：优先方案 B
- 没有 Nginx，且只想快速跑通：可考虑方案 C
- 仅用于内网临时使用：方案 A 成本最低

---

## 7. 服务注册表中保留的信息

### 7.1 Anyverse Web Server
- 部署机器：`10.17.0.22`、`10.17.17.31`
- 访问端口：`8080`
- 网络模式：`--network host`
- 镜像：`docker.anyverse.work/library/web_server:latest`
- 常用命令：
  - 查看日志：`docker logs web_server`
  - 更新部署：重新运行启动脚本，或 `docker pull` + 重启

### 7.2 其他基础设施备忘
- Harbor：`docker.anyverse.work`
- Harbor 拉取前通常需要 Docker 配置 `insecure-registries`
- 代理环境下，`10.0.0.0/8` 应设为 DIRECT

---

## 8. 去重后的最终操作建议

如果目标是“让 Anyverse Web Server 稳定可访问”，推荐顺序如下：

1. 确保 Harbor 可拉镜像
   - Docker 配置 `insecure-registries`
   - `docker login`

2. 确保服务以稳定网络方式启动
   - 优先 `--network host`
   - 避免外部访问依赖 bridge + NAT 端口转发

3. 确保客户端不把内网流量送进代理
   - Clash Verge 增加 `10.0.0.0/8,DIRECT`
   - 或系统代理设置里加入 bypass

4. 再决定访问方式
   - 临时：`IP:8080`
   - 稍正式：`域名:8080`
   - 正式：Nginx/Caddy 接管 80（后续可升级到 HTTPS）

---

## 9. 一句话版摘要

这批 artifacts 的核心其实只有一条主线：
Anyverse Web Server 的可访问性，不只是“容器有没有启动”，而是同时受 Docker 网络模式、Harbor 拉取方式、以及本机 Clash 代理直连规则三者影响；其中最稳的组合是：Harbor 配好 insecure registry、服务使用 host network、客户端给 10.x 内网配置 DIRECT。
