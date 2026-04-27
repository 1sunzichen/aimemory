# Anyverse 服务部署与运维注册表

## 1. DataDaq Backend (数据采集后端)
- **服务器 IP**: `10.17.1.23`
- **SSH 用户**: `wujie`
- **项目根目录**: `/home/wujie/work/datafetcher`
- **服务管理**: 
  - 系统服务: `datafetch.service`
  - 进程管理: `supervisord` (配置: `./deploy/server-supervisor/server_supervisor.conf`)
- **端口布局**:
  - 前端/Nginx: `5173`
  - 后端 API: `7771`
- **关键日志路径**:
  - 后端 Stdout: `/home/wujie/work/datafetcher/logs/supervisor/data_fetcher_stdout.log`
  - Nginx Access: `/home/wujie/work/datafetcher/logs/nginx/access.log`
  - Nginx Error: `/home/wujie/work/datafetcher/logs/nginx/error.log`
- **常用操作**:
  - 重启: `sudo systemctl restart datafetch.service`
  - 实时日志: `tail -f /home/wujie/work/datafetcher/logs/supervisor/data_fetcher_stdout.log`

## 2. Anyverse Web Server (配置管理前端)
- **部署机器**: `10.17.0.22` (wujie), `10.17.17.31` (ubuntu)
- **访问端口**: `8080` (直接访问)
- **网络模式**: `--network host`
- **镜像**: `docker.anyverse.work/library/web_server:latest`
- **常用操作**:
  - 查看日志: `docker logs web_server`
  - 更新部署: 重新运行脚本或执行 `docker pull` + `docker restart`

## 3. 网络环境备忘
- **Harbor 仓库**: `docker.anyverse.work` (需配置 insecure-registries)
- **Clash 直连规则**: `10.0.0.0/8` 需设为 `DIRECT`。

---
维护者: 基座模型组
