# 计划追踪 · Plantracker

学生课表 + 计划复盘工具。纯本地运行、完全离线，数据只存在设备上（localStorage / WebView），不做任何上传。

本仓库只用于**公开版的静态分发**（GitHub Pages）。个人版（含内置课表、同步码、研究生时间轴）不在此仓库。

## 访问地址

| 用途 | 地址 |
|---|---|
| 落地页 | https://coolflower1984.github.io/plantracker/ |
| 网页版 | https://coolflower1984.github.io/plantracker/web.html |
| Android APK | https://coolflower1984.github.io/plantracker/plantracker-open-v2.3.7.apk |
| iOS（PWA） | https://coolflower1984.github.io/plantracker/ios.html |
| 版本信息 | https://coolflower1984.github.io/plantracker/version.json |

## 目录

| 文件 | 说明 |
|---|---|
| `index.html` | 下载落地页（公开版） |
| `web.html` | 网页版主程序，单文件应用 |
| `ios.html` | iOS PWA 版（Safari 添加到主屏幕） |
| `ios-project.zip` | iOS Xcode 工程打包 |
| `plantracker-open-v2.3.7.apk` | Android 安装包（公开版，versionCode 26） |
| `version.json` | 版本信息，App 启动时读取以判断是否有新版 |
| `sw.js` / `manifest.webmanifest` / `icon-*.png` | PWA 资源 |

## 当前版本 v2.3.7

- 周总览支持长按拖动任务块换日期、改时间（时长不变），可拖到已被占用的时段
- 同一时段多个安排显示 `busy`，点开可长按拖出来重排
- 计划支持自选颜色，今日时间轴 / 计划卡片 / 周总览同步变色
- 日期框换成月历，双击日期直接跳转
- 课程按所属教学周显示，不只是全局"当前周"
- 全部计划顶部新增「今日计划」一键翻到今天
- 周总览今天那一列：两侧各一条 2px 浅蓝细线，无通栏色块

## 更新流程

1. 替换 `plantracker-open-vX.Y.Z.apk` 与 `web.html`、`ios.html`
2. 修改 `version.json` 的 `versionCode`、`versionName`、`apkUrl`、`notes`
3. 提交推送到 `main`，Pages 会在 1～2 分钟内自动重新发布

客户端读取 `version.json` 时采用双源：优先 GitHub Pages，失败自动回退到 jsDelivr
（`https://cdn.jsdelivr.net/gh/coolflower1984/plantracker@main/version.json`）。

## 数据与隐私

所有课表、计划、复盘数据均保存在本机浏览器存储中，仓库内不含任何用户数据。
