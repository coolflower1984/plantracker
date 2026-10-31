# 计划追踪 · Plantracker

学生课表 + 计划复盘工具。纯本地运行、完全离线，数据只存在设备上（localStorage / WebView），不做任何上传。

本仓库只用于**公开版的静态分发**（GitHub Pages）。个人版（含内置课表、同步码、研究生时间轴）不在此仓库。

## 访问地址

| 用途 | 地址 |
|---|---|
| 落地页 | https://coolflower1984.github.io/plantracker/ |
| 网页版 | https://coolflower1984.github.io/plantracker/web.html |
| Android APK | https://coolflower1984.github.io/plantracker/plantracker-open-v2.4.2.apk |
| iOS（PWA） | https://coolflower1984.github.io/plantracker/ios.html |
| 版本信息 | https://coolflower1984.github.io/plantracker/version.json |

## 目录

| 文件 | 说明 |
|---|---|
| `index.html` | 下载落地页（公开版） |
| `web.html` | 网页版主程序，单文件应用 |
| `ios.html` | iOS PWA 版（Safari 添加到主屏幕） |
| `ios-project.zip` | iOS Xcode 工程打包 |
| `plantracker-open-v2.4.2.apk` | Android 安装包（公开版，versionCode 29） |
| `version.json` | 版本信息，App 启动时读取以判断是否有新版 |
| `sw.js` / `manifest.webmanifest` / `icon-*.png` | PWA 资源 |

## 当前版本 v2.4.2

- 公开版的检查更新改从 GitHub Pages 读取，失败回退 jsDelivr，不再依赖开发机的临时地址
- 下载链接换成固定地址，修掉「检查更新后点下载跳到 404」
- 上一版 `plantracker-open-v2.4.1.apk` 暂留，供仍在缓存旧清单的客户端下载

## 更新流程

1. 替换 `plantracker-open-vX.Y.Z.apk` 与 `web.html`、`ios.html`
2. 修改 `version.json` 的 `versionCode`、`versionName`、`apkUrl`、`notes`
3. 提交推送到 `main`，Pages 会在 1～2 分钟内自动重新发布

客户端读取 `version.json` 时采用双源：优先 GitHub Pages，失败自动回退到 jsDelivr
（`https://cdn.jsdelivr.net/gh/coolflower1984/plantracker@main/version.json`）。

> **注意**：jsDelivr 对 `@main` 有约 12 小时的缓存，推完代码它仍可能返回上一版，
> 导致回退线路误报「已是最新」。每次发版后必须手动清缓存，query 参数无效：
>
> ```
> curl https://purge.jsdelivr.net/gh/coolflower1984/plantracker@main/version.json
> curl https://purge.jsdelivr.net/gh/coolflower1984/plantracker@main/version-public.json
> ```
>
> 返回 `"status": "finished"` 即生效，随后复查两个地址的 versionName 是否为当前版本。

## 数据与隐私

所有课表、计划、复盘数据均保存在本机浏览器存储中，仓库内不含任何用户数据。
